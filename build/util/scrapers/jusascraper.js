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
exports.scrapeJusaChristmasMovies = exports.scrapeJusaMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const scrapeJusaMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get("https://letterboxd.com/jusa/list/rolli-1/share/jZqpon5C9BeqalWd/detail/", { headers: { "Content-Type": "text/html; charset=iso-8859-1 " } });
    const $ = (0, cheerio_1.load)(data);
    const movieData = $(".name.prettify").map((_, s) => {
        const $s = $(s);
        return $s.text();
    }).toArray();
    console.log(movieData);
    const movies = movieData.map((movie, i) => {
        var _a;
        const parts = movie.split(" ");
        const year = (_a = parts.pop()) !== null && _a !== void 0 ? _a : "NO YEAR";
        const name = parts.join(" ");
        return { option: name };
    }).filter(movie => movie.option.length > 0);
    return movies;
});
exports.scrapeJusaMovies = scrapeJusaMovies;
const scrapeJusaChristmasMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios_1.default.get("https://letterboxd.com/jusa/list/joulurolli/share/wxXR95VJTVyHvbu6/detail/", { headers: { "Content-Type": "text/html; charset=iso-8859-1 " } });
    const $ = (0, cheerio_1.load)(data);
    const movieData = $(".headline-2.prettify").map((_, s) => {
        const $s = $(s);
        return $s.text();
    }).toArray();
    const movies = movieData.map((movie, i) => {
        var _a;
        const parts = movie.split(" ");
        const year = (_a = parts.pop()) !== null && _a !== void 0 ? _a : "NO YEAR";
        const name = parts.join(" ");
        return { option: name };
    });
    return movies;
});
exports.scrapeJusaChristmasMovies = scrapeJusaChristmasMovies;
