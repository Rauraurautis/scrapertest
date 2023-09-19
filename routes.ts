import { Express, Request, Response } from "express"
import { scrapeToriAxios } from "./util/scrapers/axiostoricraper"
import player from "play-sound"
import { scrapeJusaMovies } from "./util/scrapers/jusascraper"
import { sendPushNotif } from "./util/notifSender"

interface Item {
    item: string
    link: string
    image: string
}

let topFive: Item[] = []


scrapeToriAxios().then(data => {
    if (data) topFive = data
}).catch(err => console.error(err))


setInterval(() => {
    
    scrapeToriAxios().then(data => {
        if (data) {
            if (data[0].item !== topFive[0].item) {
                topFive = data
            }
        }
    })
   
}, 20000)

export const routes = (app: Express) => {
    app.get("/annetaan", (req, res) => {
        return res.json(topFive)
    })

    app.get("/jusa", async (req, res) => {
        const movies = await scrapeJusaMovies()
        return res.json(movies)
    })
}