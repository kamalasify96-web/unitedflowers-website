#!/bin/zsh
# Re-encode the Higgsfield "Sunflower Drop" animation for scroll scrubbing.
# Source: mark-raw.mp4 (flux_3_video, start/end frames rendered from the brand mark).
# The model hard-cuts to full gold at 6.46s, so we keep 0–6.40s; the website
# draws the final gold fill itself (VideoHero.tsx).
# -g 1 makes every frame a keyframe, so seeking to any scroll position is instant.
set -e
cd "${0:A:h}"
FF=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())")
OUT=../public/video
mkdir -p $OUT
$FF -y -loglevel error -i mark-raw.mp4 -t 6.40 -an -vf "crop=1920:1080:0:4,scale=1600:-2" -c:v libx264 -preset slow -crf 22 -g 1 -pix_fmt yuv420p -movflags +faststart $OUT/hero-drop-1600.mp4
$FF -y -loglevel error -i mark-raw.mp4 -vframes 1 -vf "crop=1920:1080:0:4,scale=1600:-2" -c:v libwebp -quality 85 $OUT/hero-drop-poster.webp
ls -la $OUT

# Phones: iOS Safari can't scrub <video> by scroll, so we also export a
# 20fps image sequence (128 frames, portrait-ish crop centred on the mark)
# that VideoHero.tsx draws to a canvas.
rm -rf $OUT/seq && mkdir -p $OUT/seq
$FF -y -loglevel error -i mark-raw.mp4 -t 6.40 -vf "fps=20,crop=1200:1080:720:4,scale=720:-2" -c:v libwebp -quality 68 -compression_level 6 $OUT/seq/f%03d.webp
