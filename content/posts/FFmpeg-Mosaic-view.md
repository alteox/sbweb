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
-filter_complex "color=c=black:s=640x360:r=10 [base];\
[0:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v0];\
[1:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v1];\
[2:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v2];\
[3:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v3];\
[4:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v4];\
[5:v]scale=w=200:h=110:force_original_aspect_ratio=decrease,pad=200:110:(ow-iw)/2:(oh-ih)/2,fps=10[v5];\
[base][v0]overlay=shortest=1:x=5:y=5[tmp1];\
[tmp1][v1]overlay=shortest=1:x=215:y=5[tmp2];\
[tmp2][v2]overlay=shortest=1:x=425:y=5[tmp3];\
[tmp3][v3]overlay=shortest=1:x=5:y=125[tmp4];\
[tmp4][v4]overlay=shortest=1:x=215:y=125[tmp5];\
[tmp5][v5]overlay=shortest=1:x=425:y=125" \
-c:v h264_rkmpp \
-b:v 400k \
-maxrate 400k \
-bufsize 400k \
-g 10 \
-r 10 \
-fps_mode cfr \
-an \
-threads 4 \
-f mpegts \
udp://224.0.0.1:9999?fifo_size=5000000\&overrun_nonfatal=1
```