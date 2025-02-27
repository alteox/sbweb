---
title: FFmpeg Mosaic view
date: 2024-11-06 15:01:35 +0300
image: 
tags:
  - ffmpeg
---
FFMpeg command do generate Video Mosaic on Rockchip ARM 

```
./ffmpeg \
-hwaccel rkmpp \
-c:v h264_rkmpp \
-i udp://224.0.0.1:90?fifo_size=5000000\&overrun_nonfatal=1 \
-c:v h264_rkmpp \
-i udp://224.0.0.1:432?fifo_size=5000000\&overrun_nonfatal=1 \
-c:v h264_rkmpp \
-i udp://224.0.0.1:94?fifo_size=5000000\&overrun_nonfatal=1 \
-c:v h264_rkmpp \
-i udp://224.0.0.1:90?fifo_size=5000000\&overrun_nonfatal=1 \
-c:v h264_rkmpp \
-i udp://224.0.0.1:432?fifo_size=5000000\&overrun_nonfatal=1 \
-c:v h264_rkmpp \
-i udp://224.0.0.1:94?fifo_size=5000000\&overrun_nonfatal=1 \
-filter_complex "color=c=black:s=1280x720:r=24 [base];\
[0:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave0];\
[1:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave1];\
[2:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave2];\
[3:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave3];\
[4:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave4];\
[5:a]compand,showwaves=size=416x100:colors=white:draw=full:mode=cline,format=yuv420p[wave5];\
[0:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v0];\
[1:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v1];\
[2:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v2];\
[3:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v3];\
[4:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v4];\
[5:v]scale=416:234:force_original_aspect_ratio=decrease,pad=416:234:(ow-iw)/2:(oh-ih)/2[v5];\
[v0][wave0]vstack[upper0];\
[v1][wave1]vstack[upper1];\
[v2][wave2]vstack[upper2];\
[v3][wave3]vstack[lower0];\
[v4][wave4]vstack[lower1];\
[v5][wave5]vstack[lower2];\
[base][upper0]overlay=shortest=1:x=8:y=8[tmp1];\
[tmp1][upper1]overlay=shortest=1:x=432:y=8[tmp2];\
[tmp2][upper2]overlay=shortest=1:x=856:y=8[tmp3];\
[tmp3][lower0]overlay=shortest=1:x=8:y=350[tmp4];\
[tmp4][lower1]overlay=shortest=1:x=432:y=350[tmp5];\
[tmp5][lower2]overlay=shortest=1:x=856:y=350" \
-c:v h264_rkmpp \
-b:v 2500k \
-maxrate 2500k \
-bufsize 2500k \
-g 24 \
-r 24 \
-an \
-threads 4 \
-f mpegts \
udp://224.0.0.1:9999?fifo_size=5000000\&overrun_nonfatal=1
```