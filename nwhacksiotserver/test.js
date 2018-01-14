const fs = require('fs');
const request = require('request');

let file = fs.readFileSync('sample.jpg');

form = {
  data: file,
  name: 'yaay'
};

request.post(
  { url: 'https://michaelenglo.lib.id/nwhacksiotserver@dev/', form: form },
  function optionalCallback(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }
    console.log('Upload successful!  Server responded with:', body);
  }
);