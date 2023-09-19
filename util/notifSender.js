"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotif = void 0;
const axios_1 = __importDefault(require("axios"));
// Define your Expo push notification token
const expoPushToken = 'ExponentPushToken[kt6U-9Ny2B2xjF2sYXR1MF]';
// Define your Expo Push Notification API endpoint
const expoPushEndpoint = 'https://exp.host/--/api/v2/push/send';
// Create the push notification data
const notification = {
    to: expoPushToken,
    sound: 'default',
    title: 'My Notification Title',
    body: 'This is the body of the notification.',
    data: {
        url: "https://google.com"
    }
};
const sendPushNotif = () => {
    setTimeout(() => axios_1.default.post(expoPushEndpoint, notification, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
        console.log('Push notification sent successfully:', response.data);
    })
        .catch(error => {
        console.error('Error sending push notification:', error);
    }), 5000);
};
exports.sendPushNotif = sendPushNotif;
