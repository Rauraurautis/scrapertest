import axios from "axios";

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

export const sendPushNotif = () => {
    setTimeout(() => axios.post(expoPushEndpoint, notification, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            console.log('Push notification sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending push notification:', error);
        },), 5000)

}