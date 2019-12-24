# Yet another youtube to MP3

# Prerequisites
* [ffmpeg](https://www.ffmpeg.org/)
* [youtube-dl](https://github.com/ytdl-org/youtube-dl)

# Setup
1. Install `ffmpeg`
```bash
# call whichever package manager your distro is using
brew install ffmpeg
```
2. Install `youtbe-dl`
```bash
# you'll maybe need to download the sources
brew install youtube-dl
```
3. Use `youtube-dl`
```bash
youtube-dl \
	--no-overwrites \
	--no-post-overwrites \
	--embed-thumbnail \
	--ignore-errors \
	--extract-audio \
	--audio-format mp3 \
	--format bestaudio \
	--add-metadata \
    --output "~Music/%(playlist)s/%(title)s.%(ext)s" \
	<playlist url>
```
4. Enjoy !