import express from "express"
import { routes } from "./routes"
import cors from "cors"
import { config } from "dotenv";

config()
const app = express()




app.use(cors())
app.use(express.static("public"))

app.listen(3005, () => {
    console.log("Listening to port 3005")
    routes(app)
})