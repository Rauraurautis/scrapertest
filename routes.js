"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const axiostoricraper_1 = require("./util/scrapers/axiostoricraper");
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
}, 30000);
const routes = (app) => {
    app.get("/annetaan", (req, res) => {
        return res.json(topFive);
    });
};
exports.routes = routes;
