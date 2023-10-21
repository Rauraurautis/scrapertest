"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.app = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const firebaseConfig = {
    apiKey: "AIzaSyCeagjf9RjwMu_FpcmsfRVYi8LEuLXOBQs",
    authDomain: "messaging-fa432.firebaseapp.com",
    projectId: "messaging-fa432",
    storageBucket: "messaging-fa432.appspot.com",
    messagingSenderId: "91200235592",
    appId: "1:91200235592:web:36677e95375dcf8b25907d",
    databaseURL: "https://messaging-fa432-default-rtdb.europe-west1.firebasedatabase.app"
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.database = (0, database_1.getDatabase)(exports.app);
