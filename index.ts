import { scrapeToriAxios } from "./util/scrapers/axiostoricraper"
import player from "play-sound"

const playNotification = () => {
    player().play("./notification.mp3", (err: any) => {
        if (err) throw err
    })
}
/*
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

*/

let topFive: { [x: number]: string }[] = []

scrapeToriAxios(5).then(data => {
    if (data) topFive = data
}).catch(err => console.error(err))

setInterval(() => {
    scrapeToriAxios(5).then(data => {
        if (data) {
            if (data[0]["1"] != topFive[0]["1"]) {
                console.log(data)
                topFive = data
                playNotification()
            }
        }
    })
}, 20000)

