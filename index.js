"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)());
app.listen(3005, () => {
    console.log("Listening to port 3005");
    (0, routes_1.routes)(app);
});
