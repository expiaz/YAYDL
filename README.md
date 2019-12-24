# Yet another youtube to MP3
*(but this one is shitty)*

# Prerequisites
* [Git](https://git-scm.com/)
* [Node](https://nodejs.org/)
* [ffmpeg](https://www.ffmpeg.org/)

# Setup
1. `git clone https://github.com/expiaz/YAYDL.git ytdl`
2. `cd ytdl && npm install`
3. `node app.js <playlistID> [<playlistFolder>|playlist name <numberOfMusicsToDL>|all]`
4. Enjoy !

# Example
Downloading the first 30 songs from [this](https://www.youtube.com/playlist?list=PLWGs1GkjF6qoa4gowzyUrLjaNQt_FsQib) playlist
```bash
node app.js PLWGs1GkjF6qoa4gowzyUrLjaNQt_FsQib oldButGold 30
```

It will skip previously downloaded songs in `oldButGold`, so you can update playlists (by downloading in the same folder)

# Alternative

Using [youtube-dl](https://github.com/ytdl-org/youtube-dl) directly
```bash
youtube-dl -i -x --audio-format mp3 <playlistURL> -o <outputDirectory>
```