var {createWriteStream} = require('fs');
var {resolve} = require('path');
var Axios = require('axios');
var https = require('https');

let count = 0, maxCount = 115;

async function downloadImage(number) {
   Axios({
    url: 'https://*****.live/assets/' + number + '.jpg',
    method: 'GET',
    responseType: 'stream',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(result => {
    result.data.pipe(createWriteStream(resolve(__dirname, 'downloaded-content', number + '.jpg')));
  }).catch(error => {
    console.error('maybe file [n=%s] is not found? http code: %s 🙃 🤭 🤭 🤭 🤭', number, error.response.status);
  });
};

while (++count <= maxCount) {
  downloadImage(count);
};