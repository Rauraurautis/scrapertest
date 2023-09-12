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
const scrapeToriAxios = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get("https://www.tori.fi/uusimaa?q=&cg=0&w=1&st=g&ca=18&l=0&md=th");
        const $ = (0, cheerio_1.load)(data);
        const items = $(".li-title").map((_, s) => {
            const $s = $(s);
            return $s.text().replace(/[���)]/i, "ä");
        }).toArray();
        const allItems = items.map((item, i) => ({
            [Number(i + 1)]: item
        }));
        return allItems.slice(0, amount);
    }
    catch (err) {
        console.error(err);
    }
});
exports.scrapeToriAxios = scrapeToriAxios;
