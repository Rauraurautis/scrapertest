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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const TokenController_1 = require("./controllers/TokenController");
const TokenSchema_1 = require("./schema/TokenSchema");
const validateResource_1 = __importDefault(require("./middleware/validateResource"));
const database_1 = require("firebase/database");
const firebase_1 = require("./util/firebase");
let topFive = [];
const serviceAccountData = require("./serviceAccount.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountData)
});
const registrationToken = 'ewaDVynnrbcc1mzQDmzRTx:APA91bEqDVs3VR815eNx-HxWgbuHq_KPIrMpL5xyWmhQ6IytZzy9Bsl48YBiwchz3S0SIgMuWyD3pp2a00d5uDYiKrpb2gh8Yye27xkkXacP-EiQtjoQloUIvgViouacXbp_Z5nftk5W';
const userRef = (0, database_1.ref)(firebase_1.database, "users/");
(0, axiostoricraper_1.scrapeToriAxios)().then(data => {
    if (data)
        topFive = data;
}).catch(err => console.error(err));
setInterval(() => {
    (0, axiostoricraper_1.scrapeToriAxios)().then(data => {
        if (data) {
            if (data[0].item !== topFive[0].item) {
                topFive = data;
                const message = {
                    notification: {
                        title: 'New item on tori.fi annetaan',
                        body: 'Go check out the tori.fi!',
                    },
                    token: "",
                };
                const dataArray = [];
                (0, database_1.get)(userRef).then(data => data.forEach(result => { dataArray.push(result.val()); })).then(res => {
                    dataArray.forEach(token => {
                        firebase_admin_1.default
                            .messaging()
                            .send(Object.assign(Object.assign({}, message), { token: token.token }))
                            .then((response) => {
                            console.log('Successfully sent message:', response);
                        })
                            .catch((error) => {
                            console.log('Error sending message:', error);
                        });
                    });
                });
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
};
exports.routes = routes;
