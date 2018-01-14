const lib = require('lib')({token: process.env.TOKEN});
const aws = require('aws-sdk');
const request = require('request');

aws.config.region = 'ca-central-1';
const cfg = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

const s3 = new aws.S3(cfg);

/**
* A basic Hello World function
* @param {buffer} data
* @returns {any}
*/
module.exports = (data = null, context, callback) => {

  data = data || new Buffer('');

  lib.utils.storage.get('COUNTER', (err, value) => {

    if (err) {
      return callback(err);
    }

    let newCounter = value || 0;
    // console.log("newCounter before: " + newCounter);

    s3.putObject({
      Body: data,
      Bucket: "nwhacksiot",
      ACL: 'public-read',
      Key: "pic" + newCounter + ".jpg",
    }, (err, data) => {

      if (err) {
        return callback(err);
      }

      const key2 = process.env.AZURE_KEY_ID;

      request.post({
        url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false',
        headers: {
          'Ocp-Apim-Subscription-Key':  key2,
        },
        body: {
          url: 'https://s3.ca-central-1.amazonaws.com/nwhacksiot/' + newCounter + '.jpg'
        },
        json: true
      }, (err,httpResponse,body) => {
        if (err) {
          return callback(err);
        }
        //console.log(body);
        if(!body.length) {
          if (newCounter >= 9) {
            return lib.messagebird.tel['@0.0.10'].sms({
              originator: '14509905506',
              recipient: '17787062154',
              body: 'unknown moving object detected! View on this link:'
            }, (err, result) => {
              //reset counter to 0
              newCounter = 0;
              //console.log('newCounter after: ' + newCounter);
              return lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
                return callback(null, "I'm not recognizing any faces");
              });
            });
          } else {
            newCounter++;
            //console.log('newCounter after: ' + newCounter);
            return lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
              return callback(null, "I'm not recognizing any faces");
            });
          }
        }
        console.log(body);
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
          if (body[0].candidates.length != 0) {
              if (newCounter >= 0)
                newCounter -= 10;
              else
                newCounter++;            
              //console.log("newCounter after: " + newCounter);
              
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
                //console.log('newCounter after: ' + newCounter);
                lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
                  return callback(null, "i don't recognize him/her");
                });
              });
            }
            else {
              newCounter++;
              //console.log('newCounter after: ' + newCounter);
              lib.utils.storage.set('COUNTER', newCounter, (err, value) => {
                return callback(null, "i don't recognize him/her");
              });
            }
          }
        });
      });
    });
  });
};
