---
# Push-With-Firebase
A simple web app that allows users to enable or disable push notification, which was implemented with Firebase Cloud Messaging.

## Firebase Project Info
- **Project ID** : friendlychat-34059
- **Sender ID** : 800635767370
- **Server Key** : AAAAummcSko:APA91bHppIKcGEMQnLT8RvZC_q1eVrVz2T2IJMIczC4Vh2k-nJquUs0u5_5_UVfiYPVLEJZGUp2jWJsDav8S4ZYifvphaVH0FAJzufKX6-unlvQhKzBM6Ia94BLpSz7_aZGkT7fsqEJg

## Hosted Site
[https://friendlychat-34059.firebaseapp.com/](https://friendlychat-34059.firebaseapp.com/)

## Tutorial
1. Download [code stub](https://github.com/googlechrome/push-notifications/archive/master.zip)
2. Unzip the zip file and move to the project directory
3. Move to app directory. `cd app`
4. Initialize Firebase Project with this command below and select DB & Hosting

```
firebase init
```

5. Add this code in `main.js` to see if the browser supports Service Worker

```js
// main.js
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);

      swRegistration = swReg;
      initialiseUI();
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

6. Add a log in `sw.js` if the service worker has been properly registered.
7. Implement `initialiseUI()` to initialize UI based on user's subscription.

```js
// main.js
function initialiseUI() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

8. Implement `updateBtn()` to update the Push Enable Button based on user's subscription

```js
// main.js
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

9. Add this code to enable the click event on Push Enable Button

```js
// main.js
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unSubscribeUser();
    } else {
      subscribeUser();
    }
  });

  ...
}
```

#### Subscription Implementation
> Let's implement features to enable push on the website.

10. Implement `subscribeUser()` to subscribe with the registered service worker

```js
// main.js
function subscribeUser() {
  swRegistration.pushManager.subscribe({
    // 푸시 수신 시 알람 표시 속성
    userVisibleOnly: true
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);
    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

11. Check the subscription as a callback parameter

![subscription](https://github.com/joshua1988/DevCampWAP/blob/master/4_progressive-web-apps/push-with-firebase/images/screenshots/subscription.png?raw=true)

12. Add `updateSubscriptionOnServer()` in `subscribeUser()`'s success callback to send the key to Server

```js
// main.js
function subscribeUser() {
  ...
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);
    isSubscribed = true;

    updateSubscriptionOnServer(subscription);
    updateBtn();
  })
  ...
}
```

13. Implement the `updateSubscriptionOnServer()` and display the subscription info on the screen

```js
// main.js
function updateSubscriptionOnServer(subscription, unsubscribed) {
  var subscriptionJson = document.querySelector('.js-subscription-json');
  var subscriptionDetails = document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

14. Run the application and click the button. You will see the prompt as below.

![push alarm](https://github.com/joshua1988/DevCampWAP/blob/master/4_progressive-web-apps/push-with-firebase/images/screenshots/05-push-codelab.png)


#### Sending the browser key to Firebase
> Now we need to send this subscription information to the server so that we can send the specific device a push message.

15. Add the `sendDeviceKeytoFirebase()` to `updateSubscriptionOnServer()` to send the browser key to Firebase

```js
// main.js
function updateSubscriptionOnServer(subscription) {
  ...
  if (subscription) {
    ...
    sendDeviceKeytoFirebase(subscription.endpoint.split('send/')[1]);
  }
  ...
}
```

16. Implement `sendDeviceKeytoFirebase()` to send this info to Firebase DB

```js
// firebase-db.js
var db = firebase.database();

function sendDeviceKeytoFirebase(key) {
  return db.ref('users/browserKey-' + getID()).set({
    key: key,
    time: getCurrentTime()
  }).then(function () {
    console.log("The key has been sent to Firebase DB");
  }).catch(function () {
    console.error('Sending a key to server has been failed');
  });
}

function getID() {
  var date = new Date();
  return date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
}

function getCurrentTime() {
  return new Date().toLocaleString();
}
```

17.  Check the Firebase Database if the data has been stored properly in the table.

![firebase-db](https://github.com/joshua1988/DevCampWAP/blob/master/4_progressive-web-apps/push-with-firebase/images/screenshots/firebase-db.png?raw=true)

#### Notification Implementation
> Let's code the last part of this tutorial, which is Push Notification

18. Add this code below in `sw.js` to pop up the notification when push arrives

```js
// sw.js
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');

  var title = 'Push Codelab';
  var options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  var notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});
```

20. Also add this code to monitor click event on the notification

```js
// sw.js
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();
  event.waitUntil(
    clients.openWindow('http://www.fastcampus.co.kr/dev_camp_wap/')
  );
});
```

21. Let's see if this push function works through 'Application' panel in Dev Tools. Click the notification too

![09-push-codelab](https://github.com/joshua1988/DevCampWAP/blob/master/4_progressive-web-apps/push-with-firebase/images/screenshots/09-push-codelab.png?raw=true)

22. Send a push to the browser using the Curl command that contains Server Key & Browser Key (end point).

#### Removing the unsubscribed User key in Firebase
23. Implement `unSubscribeUser()` to delete the subscription info in Firebase DB

```js
function unSubscribeUser() {
  swRegistration.pushManager.getSubscription().then(function(subscription) {
    subscription.unsubscribe().then(function(successful) {
      console.log('User is unsubscribed : ', successful);
      console.log('Unsubscribed subscription : ', subscription);

      updateSubscriptionOnServer(subscription, successful);
      isSubscribed = false;

      updateBtn();
    }).catch(function(e) {
      console.log('Failed to unsubscribe the user: ', e);
      updateBtn();
    })
  });
}
```

24. (optional) Implement `removeDeviceKeyInFirebase()` in `firebase-db.js` to delete the disabled browser for push subscription. refer to this [API](https://firebase.google.com/docs/database/web/read-and-write#delete_data)
