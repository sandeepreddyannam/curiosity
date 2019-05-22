const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

/* server running on localhost: 4000 */

const webpush = require('web-push');

app.use(cors());
app.use(bodyParser.json());

const port = 4000;
var subscriptionObj = null;

app.get('/', (req, res) => res.send('Web Push Node Server'));

const vapidKeys = {
	publicKey: 'BOcXNqYxu0neInMBWOOSwioHlNA6xHjEbFLc7oBwiESP27CTq8HS56DxsKpKHxOGTo4tV1RmuchhXqF-C6WV8Is',
	privateKey: 'fccJ-lUs8ht45_BU8Ze9P5GjFHPh7cGEDzw1uYMqCIM',
}

function saveSubscription (obj) {
	subscriptionObj = obj;
	console.log('subscription saved', subscriptionObj)
}


//setting our generated VAPID keys
webpush.setVapidDetails(
	'mailto:myuserid@email.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
	webpush.sendNotification(subscription, dataToSend)
};

//route to test send notification
app.get('/send-notification', (req, res) => {
	var subscription = subscriptionObj; //get subscription from your databse here.
	const message = 'Hello Sandeep';
	sendNotification(subscription, message);
	res.json({ message: 'message sent' });
})

// Save it in global object for now.
app.post('/save-subscription', (req, res) => {
	saveSubscription(req.body);
	res.json({ message: 'success' })
})

app.listen(port, () => console.log(`Web push server listening on port ${port}!`));