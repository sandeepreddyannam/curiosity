/*
1. load/register service worker
2. request permission handler
3. show toast/build toast
4.
*/

const applicationServerPublicKey = 'BOcXNqYxu0neInMBWOOSwioHlNA6xHjEbFLc7oBwiESP27CTq8HS56DxsKpKHxOGTo4tV1RmuchhXqF-C6WV8Is';
const privateKey = 'fccJ-lUs8ht45_BU8Ze9P5GjFHPh7cGEDzw1uYMqCIM';

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
};

console.log('in webpush');

function checkServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then((registration) => {
            console.log('service worker registered successfully', registration);
        }).catch(err => {
            console.log('service worker registration failed', err);
        })
    }
}

function checkPermission (event) {
    console.log('ev', event);
    window.alert(`Your Permission state is ${Notification.permission}`);
}

function showPrompt() {
    Notification && Notification.requestPermission().then(state => {
        window.alert(`permission has been ${state} `)
    });
}

function subscribe() {
    // checkServiceWorker();

    navigator.serviceWorker.ready.then(swReg => {
        swReg.pushManager.subscribe({
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
            userVisibleOnly: true
        }).then(subscriptionObj => {
            const res = saveSubsciption(subscriptionObj);
            console.log('success', res);
        }).catch(err => {
            console.log('errored subscription', err);
        })
    })
}

function saveSubsciption(subObj) {
    const SERVER_URL = 'http://localhost:4000/save-subscription'
    fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subObj),
    }).then(response => response.json());
}
