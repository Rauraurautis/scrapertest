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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const axiostoricraper_1 = require("./util/scrapers/axiostoricraper");
const jusascraper_1 = require("./util/scrapers/jusascraper");
let topFive = [];
(0, axiostoricraper_1.scrapeToriAxios)().then(data => {
    if (data)
        topFive = data;
}).catch(err => console.error(err));
setInterval(() => {
    (0, axiostoricraper_1.scrapeToriAxios)().then(data => {
        if (data) {
            if (data[0].item !== topFive[0].item) {
                topFive = data;
            }
        }
    });
}, 20000);
const routes = (app) => {
    app.get("/annetaan", (req, res) => {
        return res.json(topFive);
    });
    app.get("/jusa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield (0, jusascraper_1.scrapeJusaMovies)();
        return res.json(movies);
    }));
};
exports.routes = routes;
