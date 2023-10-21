import { Express, Request, Response } from "express"
import { scrapeToriAxios } from "./util/scrapers/axiostoricraper"
import { scrapeJusaMovies } from "./util/scrapers/jusascraper"
import admin from "firebase-admin"
import { writeToDb } from "./controllers/TokenController"
import { CreateTokenInput, createTokenSchema } from "./schema/TokenSchema"
import validate from "./middleware/validateResource"
import { get, onValue, ref } from "firebase/database"
import { database } from "./util/firebase"
import EventEmitter from "events"
import { v4 as uuidv4 } from "uuid"

const eventEmitter = new EventEmitter()

interface Item {
    item: string
    link: string
    image: string
}

export type TokenInput = {
    token: string
    userAgent: string
}

let toriItems: Item[] = []




const userRef = ref(database, "users/")

scrapeToriAxios().then(data => {
    if (data) toriItems = data
}).catch(err => console.error(err))


setInterval(() => {
    scrapeToriAxios().then(data => {
        if (data) {
            data = data
            if (data[0].item !== toriItems[0].item) {
                toriItems = data
                eventEmitter.emit("sendData")
                /*
                                const message = {
                                    notification: {
                                        title: 'New item on tori.fi annetaan',
                                        body: 'Go check out the tori.fi!',
                                    },
                                    token: "",
                
                                };
                                
                                const dataArray: TokenInput[] = []
                                get(userRef).then(data => data.forEach(result => { dataArray.push(result.val()) })).then(res => {
                                    dataArray.forEach(token => {
                                        admin
                                            .messaging()
                                            .send({...message, token: token.token})
                                            .then((response) => {
                                                console.log('Successfully sent message:', response);
                                            })
                                            .catch((error) => {
                                                console.log('Error sending message:', error);
                                            });
                                    })
                                }) */
            }
        }
    })

}, 7500)








export const routes = (app: Express) => {
    app.get("/healthcheck", (req, res) => {
        return res.cookie("test", uuidv4(), { httpOnly: true, secure: true, sameSite: "none"}).json({ status: "OK" })
    })

    app.get("/cookies", (req: Request, res: Response) => {
        const cookies = req.cookies
        const test = req.cookies["test"]
        console.log(cookies)
        console.log(test)
        res.json({ status: "OK", cookie: test })
    })

    app.get("/annetaan", (req, res) => {
        return res.json(toriItems)
    })

    app.get("/jusa", async (req, res) => {
        const movies = await scrapeJusaMovies()
        return res.json(movies)
    })

    app.post("/db", validate(createTokenSchema), async (req: Request<{}, {}, CreateTokenInput["body"]>, res: Response) => {
        try {
            const { token, userAgent } = req.body
            const newToken = await writeToDb(token, userAgent, req.ip)
            return res.json(newToken)
        } catch (error) {
            console.error(error)
        }
    })

    app.get("/db", async (req: Request, res: Response) => {
        const results = await get(userRef)
        const dataArray: any[] = []
        results.forEach(result => { dataArray.push(result.val()) })

        return res.json(dataArray[0])
    })

    const prepStream = (res: Response) => {
        if (!res) return
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader("X-Accel-Buffering", "no")
        res.flushHeaders()
        res.on("close", () => {
            res.end()
        })
    }

    const writeSSEMessage = (data: string, res: Response) => {
        res.write("event: message\n")
        res.write(`data: { "value": ${data} }`)
        res.write("\n\n")
    }

    app.get("/subscribeAnnetaan", async (req: Request, res: Response) => {
        prepStream(res)

        writeSSEMessage(JSON.stringify(toriItems), res)
        /*
        let interval = setInterval(() => {
            writeSSEMessage(JSON.stringify(toriItems), res)
        }, 2500) */

        const listener = () => {
            writeSSEMessage(JSON.stringify(toriItems), res)
        }

        eventEmitter.on("sendData", listener)
        res.on("close", () => {
            // clearInterval(interval)
            eventEmitter.removeListener("sendData", listener)
            res.end()
        })
    })
}