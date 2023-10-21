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
exports.routes = void 0;
const axiostoricraper_1 = require("./util/scrapers/axiostoricraper");
const jusascraper_1 = require("./util/scrapers/jusascraper");
const TokenController_1 = require("./controllers/TokenController");
const TokenSchema_1 = require("./schema/TokenSchema");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const database_1 = require("firebase/database");
const firebase_1 = require("./util/firebase");
const events_1 = __importDefault(require("events"));
const uuid_1 = require("uuid");
const eventEmitter = new events_1.default();
let toriItems = [];
const userRef = (0, database_1.ref)(firebase_1.database, "users/");
(0, axiostoricraper_1.scrapeToriAxios)().then(data => {
    if (data)
        toriItems = data;
}).catch(err => console.error(err));
setInterval(() => {
    (0, axiostoricraper_1.scrapeToriAxios)().then(data => {
        if (data) {
            data = data;
            if (data[0].item !== toriItems[0].item) {
                toriItems = data;
                eventEmitter.emit("sendData");
                /*
                                const message = {
                                    notification: {
                                        title: 'New item on tori.fi annetaan',
                                        body: 'Go check out the tori.fi!',
                                    },
                                    token: "",
                
                                };
                                
                                const dataArray: TokenInput[] = []
                                get(userRef).then(data => data.forEach(result => { dataArray.push(result.val()) })).then(res => {
                                    dataArray.forEach(token => {
                                        admin
                                            .messaging()
                                            .send({...message, token: token.token})
                                            .then((response) => {
                                                console.log('Successfully sent message:', response);
                                            })
                                            .catch((error) => {
                                                console.log('Error sending message:', error);
                                            });
                                    })
                                }) */
            }
        }
    });
}, 7500);
const routes = (app) => {
    app.get("/healthcheck", (req, res) => {
        return res.cookie("test", (0, uuid_1.v4)(), { httpOnly: true, secure: true, sameSite: "none" }).json({ status: "OK" });
    });
    app.get("/cookies", (req, res) => {
        const cookies = req.cookies;
        const test = req.cookies["test"];
        console.log(cookies);
        console.log(test);
        res.json({ status: "OK", cookie: test });
    });
    app.get("/annetaan", (req, res) => {
        return res.json(toriItems);
    });
    app.get("/jusa", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const movies = yield (0, jusascraper_1.scrapeJusaMovies)();
        return res.json(movies);
    }));
    app.post("/db", (0, validateResource_1.default)(TokenSchema_1.createTokenSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token, userAgent } = req.body;
            const newToken = yield (0, TokenController_1.writeToDb)(token, userAgent, req.ip);
            return res.json(newToken);
        }
        catch (error) {
            console.error(error);
        }
    }));
    app.get("/db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield (0, database_1.get)(userRef);
        const dataArray = [];
        results.forEach(result => { dataArray.push(result.val()); });
        return res.json(dataArray[0]);
    }));
    const prepStream = (res) => {
        if (!res)
            return;
        res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader("X-Accel-Buffering", "no");
        res.flushHeaders();
        res.on("close", () => {
            res.end();
        });
    };
    const writeSSEMessage = (data, res) => {
        res.write("event: message\n");
        res.write(`data: { "value": ${data} }`);
        res.write("\n\n");
    };
    app.get("/subscribeAnnetaan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        prepStream(res);
        writeSSEMessage(JSON.stringify(toriItems), res);
        /*
        let interval = setInterval(() => {
            writeSSEMessage(JSON.stringify(toriItems), res)
        }, 2500) */
        const listener = () => {
            writeSSEMessage(JSON.stringify(toriItems), res);
        };
        eventEmitter.on("sendData", listener);
        res.on("close", () => {
            // clearInterval(interval)
            eventEmitter.removeListener("sendData", listener);
            res.end();
        });
    }));
};
exports.routes = routes;
