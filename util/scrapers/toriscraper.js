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
exports.scrapeTori = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapeTori() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: "new" });
        const browserPage = yield browser.newPage();
        const cookies = [{
                name: "euconsent-v2", value: "CPx73UAPx73UAAGABCENDUCgAP_AAEPAAApAF7gBxCpUQCFAAGBoQIAAAIAUwEAAACAAAAAAAwIBAACAIAQCEAEAAACABAAAAAAAIAABAABAAAAAAAAAAAAAABEAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAACEAAAiBgkB2ABQAFgAVAAuABkADgAHgAQAAkABkADSAIgAigBMACeAHMAQgApQBogDZAH6AQgAiIBIgCdgF1AMUAfYBMgC8wGCAEBIAIAfgoAQABQARQBogEICAAQDODoCgACwAKgAZAA4ACAAGQANAAiABMACeAHMAPwApQBogDZAH6ARYAxQB9gF5kIAoACwAMgBMAFKAYolAIAAWABkADgARAAmADZAMUAvMpARAAWABUADIAHAAQABEACYAE8AOYAfgBSgDRAGyAP0AiwB9gF5lQAIBIg.YAAAAAAAAAAA",
                domain: ".tori.fi"
            }, {
                name: "consentUUID", value: "3abc700a-ed8b-41fc-92d4-c3ed9a439310_23", domain: ".tori.fi"
            }];
        yield browserPage.setCookie(...cookies);
        yield browserPage.goto('https://www.tori.fi/uusimaa?q=&cg=0&w=1&st=g&ca=18&l=0&md=th');
        yield new Promise(r => setTimeout(r, 1000));
        const items = yield browserPage.evaluate(() => {
            var _a;
            console.log("sd");
            const foundItems = [];
            const cards = document.querySelectorAll(".item_row_flex");
            for (let card of cards) {
                const desc = card.querySelector(".desc_flex");
                const descText = desc === null || desc === void 0 ? void 0 : desc.querySelector(".ad-details-left");
                const descTitle = (_a = descText === null || descText === void 0 ? void 0 : descText.querySelector(".li-title")) === null || _a === void 0 ? void 0 : _a.innerHTML;
                if (descTitle)
                    foundItems.push(descTitle);
            }
            return foundItems;
        });
        yield browserPage.close();
        yield browser.close();
        return items.slice(0, 3);
    });
}
exports.scrapeTori = scrapeTori;
