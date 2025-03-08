---
title: Sync IPTV.json via github
date: 2025-03-06 15:01:35 +0300
image: 
tags:
  - flussonic
  - github
---
We are operating several flussonic servers in a cluster, unfortunatly those do not auto sync the IPTV user database. To solve this, I wrote some sync script.

#### Initial setup


```bash
# Create the Git repository directory
mkdir -p /opt/flussonic-config
cd /opt/flussonic-config

# Initialize a new Git repository
git init

# Copy the current iptv.json file
cp /etc/flussonic/iptv.json ./

# Add and commit the file
git add iptv.json
git commit -m "Initial IPTV configuration"

# Rename the branch to 'main'
git branch -m main

# Add GitHub as remote using SSH URL with correct repository
git remote add origin git@github.com:XXXXX/flussonic-config.git

# Test SSH connectivity to GitHub
ssh -T git@github.com

# Push initial config (first time only, on one server)
git push -u origin main
```

###### Create the Watcher Script
```bash
cat > /usr/local/bin/watch-flussonic-iptv.sh << 'EOF'
#!/bin/bash

FLUSSONIC_JSON="/etc/flussonic/iptv.json"
GIT_REPO="/opt/flussonic-config"
LOG_FILE="/var/log/flussonic-git-sync.log"
GIT_SSH_COMMAND="ssh -i /root/.ssh/id_ed25519 -o IdentitiesOnly=yes"  # UPDATED PATH
LAST_CONTENT_HASH=""

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

# Initial setup checks
if [ ! -f "$GIT_REPO/.git/config" ]; then
  log "ERROR: Git repository not found at $GIT_REPO"
  exit 1
fi

cd $GIT_REPO

# Calculate initial content hash
LAST_CONTENT_HASH=$(md5sum "$FLUSSONIC_JSON" | awk '{print $1}')
log "Starting Flussonic IPTV JSON file watcher (initial hash: $LAST_CONTENT_HASH)"

while true; do
  inotifywait -q -e modify $FLUSSONIC_JSON
  
  # Calculate new content hash
  CURRENT_HASH=$(md5sum "$FLUSSONIC_JSON" | awk '{print $1}')
  
  # Only process if content actually changed
  if [ "$CURRENT_HASH" != "$LAST_CONTENT_HASH" ]; then
    log "IPTV JSON file content changed (hash: $CURRENT_HASH)"
    LAST_CONTENT_HASH=$CURRENT_HASH
    
    # Wait a moment for file operations to complete
    sleep 1
    
    # Copy the modified JSON to the git repo
    cp $FLUSSONIC_JSON $GIT_REPO/iptv.json
    
    # Commit and push the changes
    cd $GIT_REPO
    if git diff --quiet; then
      log "No changes detected after copy (possibly same content)"
    else
      HOSTNAME=$(hostname)
      git add iptv.json
      git commit -m "Auto-update from $HOSTNAME (web interface change)"
      
      # Try to push with SSH authentication with better error logging
      export GIT_SSH_COMMAND
      log "Using SSH command: $GIT_SSH_COMMAND"
      
      if git push origin main; then
        log "Changes pushed to GitHub successfully"
      else
        PUSH_ERROR=$(git push origin main 2>&1)
        log "Push error details: $PUSH_ERROR"
        log "Attempting pull before push again"
        
        PULL_OUTPUT=$(git pull --rebase origin main 2>&1)
        log "Pull output: $PULL_OUTPUT"
        
        if git push origin main; then
          log "Changes pushed after rebase"
        else
          PUSH_ERROR2=$(git push origin main 2>&1)
          log "ERROR: Still failed to push changes"
          log "Final push error: $PUSH_ERROR2" 
          log "Repository status: $(git status)"
        fi
      fi
    fi
  else
    log "File modified but content unchanged, ignoring"
  fi
done
EOF

chmod +x /usr/local/bin/watch-flussonic-iptv.sh
```

###### Create the Sync Script
```bash
cat > /usr/local/bin/sync-flussonic-iptv.sh << 'EOF'
#!/bin/bash

LOG_FILE="/var/log/flussonic-git-sync.log"
GIT_SSH_COMMAND="ssh -i ~/.ssh/github_flussonic -o IdentitiesOnly=yes"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> $LOG_FILE
}

# Go to the git repository
cd /opt/flussonic-config

# Save the current commit hash
BEFORE=$(git rev-parse HEAD)

# Pull the latest changes with SSH authentication
log "Checking for IPTV config updates from GitHub"
export GIT_SSH_COMMAND
if ! git pull origin main; then
  log "ERROR: Git pull failed"
  exit 1
fi

# Get the new commit hash
AFTER=$(git rev-parse HEAD)

# If the commit hash changed, update the config
if [ "$BEFORE" != "$AFTER" ]; then
  log "IPTV configuration changed, updating..."
  
  # Make a backup of the current config
  BACKUP_FILE="/etc/flussonic/iptv.json.backup.$(date +%Y%m%d%H%M%S)"
  cp /etc/flussonic/iptv.json $BACKUP_FILE
  log "Backup created: $BACKUP_FILE"
  
  # Copy the new config
  cp /opt/flussonic-config/iptv.json /etc/flussonic/iptv.json
  
  # Reload Flussonic service to apply changes
  log "Reloading Flussonic service"
  if systemctl reload flussonic; then
    log "Flussonic reloaded successfully"
  else
    log "ERROR: Failed to reload Flussonic, attempting restart"
    systemctl restart flussonic
  fi
else
  log "No configuration changes detected"
fi
EOF

chmod +x /usr/local/bin/sync-flussonic-iptv.sh
```
######  Install Required Tools
```bash
# Install inotify-tools for file monitoring
apt-get update
apt-get install -y inotify-tools
```
###### Create Systemd Service for the Watcher
```bash
cat > /etc/systemd/system/flussonic-iptv-watcher.service << 'EOF'
[Unit]
Description=Flussonic IPTV JSON Git Watcher
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/watch-flussonic-iptv.sh
Restart=always
RestartSec=10
User=root
Environment="GIT_SSH_COMMAND=ssh -i /root/.ssh/github_flussonic -o IdentitiesOnly=yes"

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reload
systemctl enable flussonic-iptv-watcher
systemctl start flussonic-iptv-watcher
```
##### Set Up Cron Job for Regular Pulls
```bash
# Check for updates every 5 minutes
(crontab -l 2>/dev/null; echo "*/5 * * * * GIT_SSH_COMMAND='ssh -i /root/.ssh/github_flussonic -o IdentitiesOnly=yes' /usr/local/bin/sync-flussonic-iptv.sh >> /var/log/flussonic-git-sync.log 2>&1") | crontab -
```
** adapt the path to your SSH key & you need to add the public key to the Github repo.
