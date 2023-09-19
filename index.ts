import express from "express"
import { routes } from "./routes"
import cors from "cors"
import { config } from "dotenv";

config()
const app = express()



app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
    console.log(process.env.TEST)
    routes(app)
})