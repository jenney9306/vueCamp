/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

/* eslint-env browser, es6 */

var pushButton = document.querySelector('.js-push-btn');
var isSubscribed = false;
var swRegistration = null;

function initialiseUI() {
  // 4.푸시 버튼에 기능(푸시가 등록됐을때, 안됐을때의 로직 ) 추가 
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      unSubscribeUser();
    } else {
      subscribeUser();
    }
  });

  //2. 브라우저에 푸시 등록여부 확인 
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  })
  .catch(function(error){
    console.log(error);
  });
}


// main.js
//3. 페이지 버튼 활성화 관련 함수 
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

//5.푸시서버에 해당 브라우저를 등록하는 함수 
function subscribeUser() {
  swRegistration.pushManager.subscribe({
    // 푸시 수신 시 알람 표시 속성
    userVisibleOnly: true
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);
    isSubscribed = true;

    //updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}