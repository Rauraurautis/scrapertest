"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiostoricraper_1 = require("./util/scrapers/axiostoricraper");
const play_sound_1 = __importDefault(require("play-sound"));
const playNotification = () => {
    (0, play_sound_1.default)().play("./notification.mp3", (err) => {
        if (err)
            throw err;
    });
};
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
let topFive = [];
(0, axiostoricraper_1.scrapeToriAxios)(5).then(data => {
    if (data)
        topFive = data;
}).catch(err => console.error(err));
setInterval(() => {
    (0, axiostoricraper_1.scrapeToriAxios)(5).then(data => {
        if (data) {
            if (data[0]["1"] != topFive[0]["1"]) {
                console.log(data);
                topFive = data;
                playNotification();
            }
        }
    });
}, 20000);
