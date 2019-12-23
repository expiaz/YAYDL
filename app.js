/*
call with <playlistid> [<folder name>] [<limit>]

*/

const fs = require('fs');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl')
const sanitize = require('sanitize-filename')
const path = require('path')
const ffmpeg = require('ffmpeg')
const Multiprogress = require("multi-progress");

function filenamify(name) {
    return sanitize(name).replace(/[^\w]/g, '_')
}

const [
    node,
    app,
    plId,
    folder = '',
    limit = 0
] = process.argv

if (plId) {
    ytpl(plId, { limit })
        .then(({ title, items }) => {
            !fs.existsSync('./ytdl') && fs.mkdirSync('./ytdl')

            const plFolder = path.resolve(`./ytdl/${filenamify(folder || title)}`)
            !fs.existsSync(plFolder) && fs.mkdirSync(plFolder)

            const maxTitleSize = items.map(e => e.title)
                .sort((a, b) => a.length - b.length)
                .pop().length
            const multi = new Multiprogress();
            
            items.forEach(({ id, title }) => {
                const padding = ' '.repeat(maxTitleSize - title.length)
                const fileName = `${plFolder}/${filenamify(title)}`

                if (! fs.existsSync(fileName + '.mp3')) {
                    let bar = void 0
                    ytdl(id, {filter: 'audioonly'})
                        .on('progress', (chunkLength, downloaded, total) => {
                            if (!bar) {
                                bar = multi.newBar(
                                    title + padding + ' [:bar] :percent :etas',
                                    {
                                        complete: '=',
                                        incomplete: ' ',
                                        width: 20,
                                        total
                                    }
                                )
                            }
                            bar.tick(chunkLength);
                            //console.log(Math.floor((downloaded / total) * 100))
                        })
                        .pipe(
                            fs.createWriteStream(fileName + '.mp4')
                        ).on('finish', () => {
                            new ffmpeg(fileName + '.mp4')
                                .then(video => video.fnExtractSoundToMP3(fileName + '.mp3'))
                                .then(() => {
                                    fs.unlink(fileName + '.mp4', err => {
                                        if(err) throw err
                                    })
                                    // bar finish
                                })
                        })
                }
            })
        })
}