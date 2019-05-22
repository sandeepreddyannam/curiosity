console.log('in sw loaded 2', self);
// It does auto install, if you want to cache any thing you need to attach listeners like 'install' and 'activate'.

self.addEventListener('install', (event) => {
    console.log('**** installing sw ****', event);
});

self.addEventListener('activate', event => {
    console.log('***** activate/updating service worker ****', event);
});

self.addEventListener('push', event => {
    console.log('event pushed', event)
    const options = {
        body: event.data.text()
    }
    self.registration.showNotification('Hello client', options)
});

// add click