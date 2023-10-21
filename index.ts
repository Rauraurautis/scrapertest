import express from "express"
import { routes } from "./routes"
import cors from "cors"
import { config } from "dotenv";
import cookieParser from "cookie-parser"
config()
const app = express()



app.use(cors({
    origin: ['https://scraper-react-app.onrender.com', "http://localhost:3000"],
    credentials: true,
}));
app.use(express.static("public"))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
    routes(app)
})