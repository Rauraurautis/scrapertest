import express from "express"
import { routes } from "./routes"
import cors from "cors"
const app = express()

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
app.use(cors())


app.listen(3005, () => {
    console.log("Listening to port 3005")
    routes(app)
})