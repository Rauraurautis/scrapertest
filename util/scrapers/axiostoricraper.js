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
exports.scrapeToriAxios = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const KODINKONEET = "https://www.tori.fi/uusimaa?q=&cg=3010&w=1&st=g&c=0&ca=18&l=0&md=th";
const KAIKKI = "https://www.tori.fi/koko_suomi?q=&cg=0&w=3";
const ANNETAAN_KOKOSUOMI = "https://www.tori.fi/koko_suomi?q=&cg=0&w=3&st=g&ca=18&l=0&md=th";
const scrapeToriAxios = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(KODINKONEET, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'text/html; charset=ISO-8859-1'
            },
        });
        const buffer = Buffer.from(data);
        const encoding = 'ISO-8859-1';
        const body = iconv_lite_1.default.decode(buffer, encoding);
        const $ = (0, cheerio_1.load)(body);
        const items = $(".li-title").map((_, s) => {
            const $s = $(s);
            return $s.text();
        }).toArray();
        const links = $(".item_row_flex").map((_, s) => {
            const $s = $(s);
            return $s.attr("href");
        }).toArray();
        const images = $(".item_image, .sprite_list_no_image").map((_, s) => {
            const $s = $(s);
            return $s.attr("src") || "https://scraper-4do1.onrender.com/noimg.png";
        }).toArray();
        const linkItems = items.map((item, i) => {
            return { item, link: links[i] || "No link", image: images[i] || "No image" };
        });
        return linkItems;
    }
    catch (err) {
        console.error(err);
    }
});
exports.scrapeToriAxios = scrapeToriAxios;
