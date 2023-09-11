"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toriscraper_1 = require("./util/scrapers/toriscraper");
const play_sound_1 = __importDefault(require("play-sound"));
const playNotification = () => {
    (0, play_sound_1.default)().play("./notification.mp3", (err) => {
        if (err)
            throw err;
    });
};
const getToriItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, toriscraper_1.scrapeTori)();
    return items;
});
let topThree = [];
getToriItems().then(res => {
    topThree = res;
    console.log(topThree);
});
setInterval(() => {
    (0, toriscraper_1.scrapeTori)().then(res => {
        for (let i = 0; i < res.length; i++) {
            if (topThree[i] !== res[i]) {
                console.log(res);
                topThree = res;
                playNotification();
                break;
            }
        }
    });
}, 10000);
