import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCeagjf9RjwMu_FpcmsfRVYi8LEuLXOBQs",
    authDomain: "messaging-fa432.firebaseapp.com",
    projectId: "messaging-fa432",
    storageBucket: "messaging-fa432.appspot.com",
    messagingSenderId: "91200235592",
    appId: "1:91200235592:web:36677e95375dcf8b25907d",
    databaseURL: "https://messaging-fa432-default-rtdb.europe-west1.firebasedatabase.app"
};


export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app)

