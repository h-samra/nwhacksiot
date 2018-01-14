const lib = require('lib')({token: process.env.TOKEN});
const request = require('request');
/**
* A basic Hello World function
* @param {buffer} data
* @returns {any}
*/
module.exports = (data = null, context, callback) => {

  lib.utils.storage.get('COUNTER', (err, value) => {

    if (err) {
      return callback(err);
    }

    let newCounter = value || 0;
    newCounter++;

    const key1 = '157ba96148d473186e101910b708b01';
    const key2 = 'ec8085b928134a11919817626ba6404b';

    request.post({
      url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
      headers: {
        'Ocp-Apim-Subscription-Key':  key2,
      },
      body: {
        url: "https://s3.ca-central-1.amazonaws.com/nwhacksiot/friends/donald-trump/9.jpg"
      },
      json: true
    }, (err,httpResponse,body) => {
      if (err) {
        return callback(err);
      }

      if(body.length == 0) {
        return callback(null, "I'm not recognizing any faces. do something");
      }
      request.post({
        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify',
        headers: {
          'Ocp-Apim-Subscription-Key': key2,
        },
        body: {
          personGroupId: "1",
          faceIds: [httpResponse.body[0].faceId],
          confidenceThreshold: 0.7,
        },
        json: true,
      }, (err, httpResponse, body) => {
        if(err) {
          return callback(err);
        }

        if (httpResponse.body[0].candidates.length != 0) {
          return callback(null, "that's someone i know!");
        }
        else {
          return callback(null, "i don't recognize him/her"); 
        }

        callback(null, JSON.stringify(httpResponse));
      });
    });

    // lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
      //callback(null, httpResponse);
    // });
  });
};
