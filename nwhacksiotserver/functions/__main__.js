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
    console.log("newCounter before: " + newCounter);

    const key1 = '157ba96148d473186e101910b708b01';
    const key2 = 'ec8085b928134a11919817626ba6404b';

    request.post({
      url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
      headers: {
        'Ocp-Apim-Subscription-Key':  key2,
      },
      body: {
        url: "https://upload.wikimedia.org/wikipedia/commons/2/21/EverestfromKalarPatarcrop.JPG"
      },
      json: true
    }, (err,httpResponse,body) => {
      if (err) {
        return callback(err);
      }

      if(body.length == 0) {
        if (newCounter >= 9) {
          return lib.messagebird.tel['@0.0.10'].sms({
            originator: '14509905506',
            recipient: '17787062154',
            body: 'unknown moving object detected! View on this link:'
          }, (err, result) => {
            //reset counter to 0
            newCounter = 0;
            console.log('newCounter after: ' + newCounter);
            return lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
              return callback(null, "I'm not recognizing any faces");
            });
          });
        } else {
          newCounter++;
          console.log('newCounter after: ' + newCounter);
          return lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
            return callback(null, "I'm not recognizing any faces");
          });
        }
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
            if (newCounter >= 0)
              newCounter -= 10;
            else
              newCounter++;            
            console.log("newCounter after: " + newCounter);
            
            lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
              return callback(null, "that's someone i know!");
            });
        }
        else {
          if (newCounter >= 9) {
            lib.messagebird.tel['@0.0.10'].sms({
              originator: '14509905506',
              recipient: '17787062154',
              body: 'unknown moving object detected! View on this link:'
            }, (err, result) => {
              //reset counter to 0
              newCounter = 0;
              console.log('newCounter after: ' + newCounter);
              lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
                return callback(null, "i don't recognize him/her");
              });
            });
          }
          else {
            newCounter++;
            console.log('newCounter after: ' + newCounter);
            lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
              return callback(null, "i don't recognize him/her");
            });
          }
        }
      });
    });
  });
};
