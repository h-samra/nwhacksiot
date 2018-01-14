const fs = require('fs');
const request = require('request');
const lib = require('lib');

let file = fs.readFileSync('sample.jpg');

form = {
  data: file,
  name: 'yaay'
};

lib.michaelenglo.nwhacksiotserver['@dev']({
  data: file
}, (err,  result) => {
  console.log(err, result.toString());
});

// request.post(
//   { url: 'https://michaelenglo.lib.id/nwhacksiotserver@dev/', form: form },
//   function optionalCallback(err, httpResponse, body) {
//     if (err) {
//       return console.error('upload failed:', err);
//     }
//     console.log('Upload successful!  Server responded with:', body);
//   }
// );