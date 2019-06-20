var request = require('request');

var serverKey =
  "key=" + "AAAAummcSko:APA91bHppIKcGEMQnLT8RvZC_q1eVrVz2T2IJMIczC4Vh2k-nJquUs0u5_5_UVfiYPVLEJZGUp2jWJsDav8S4ZYifvphaVH0FAJzufKX6-unlvQhKzBM6Ia94BLpSz7_aZGkT7fsqEJg";
var deviceKey =
  "f0MN13In39A:APA91bGA0_pDv35LcJ9hZwisnlAgNilvrVrL_t9zpq6aFYDbg53dVPJuKbf-H84_hEcnP5F8ltYYSIxf6QBgg9C9jD4i8TxbZvUyICK8SZL6wSPzi0D-B1fDwGv3ozmQROM6mzJX2xqwaknwOi_8-2YuyXd93bsxlg";
sendMessageToUser(serverKey, deviceKey);

function sendMessageToUser(serverKey, deviceKey, message) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': serverKey,
    },
    body: JSON.stringify(
      {
        "registration_ids": [
          deviceKey
        ]
      }
    )
  }, function(error, response, body) {
    console.log("Result Log - ", body);
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
    } else {
      console.log('Done!');
    }
  });
};
