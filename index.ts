import { scrapeTori } from "./util/scrapers/toriscraper"
var player = require('play-sound')()

const playNotification = () => {
    player.play("./notification.mp3", (err: any) => {
        if (err) throw err
    })
}

const getToriItems = async () => {
    const items = await scrapeTori()
    return items
}

let topThree: String[] = []

getToriItems().then(res => {
    topThree = res
    console.log(topThree)
})

setInterval(() => {
    scrapeTori().then(res => {
        for (let i = 0; i < res.length; i++) {
            if (topThree[i] !== res[i]) {
                console.log(res)
                topThree = res
                playNotification()
                break
            }
        }
    })
}, 10000)





export { }