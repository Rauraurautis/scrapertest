import express from "express"
import { routes } from "./routes"
import cors from "cors"
import { config } from "dotenv";
import cookieParser from "cookie-parser"
config()
const app = express()



app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://scraper-react-app.onrender.com/test');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(express.static("public"))
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`)
    routes(app)
})