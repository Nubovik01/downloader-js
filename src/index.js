var {createWriteStream} = require('fs');
var {resolve} = require('path');
var Axios = require('axios');
var https = require('https');

let count = 0, maxCount = 150;

async function downloadImage(number) {
  // making a request to the server to get the image
   await Axios({
    url: 'https://*****.live/img/' + number, //+'.jpg',
    method: 'GET',
    responseType: 'stream',
    // disable SSL certificate verification
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  }).then(result => {
    // saving images to "downloaded-content" folder
    result.data.pipe(createWriteStream(resolve(__dirname, 'downloaded-content', number + '.jpg')));
  }).catch(error => {
    // if the script was unable to download or get access the file
    console.error('maybe file [n=%s] is not found? http code: %s 🙃 🤭 🤭 🤭 🤭', number, error.response.status);
  });
};

while (++count <= maxCount) {
  downloadImage(count);
};