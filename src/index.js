const Axios = require('axios');
const { createWriteStream } = require('fs');
const { Agent } = require('https');
const { resolve } = require('path');

let numberOfPhoto = 0, countOfImagesOnTheServer = 150;

// async function declaration
async function downloadImage(number) {
  // making a request to the server to get the image
   await Axios({
    url: 'https://*****.live/img/' + number, //+'.jpg',
    method: 'GET',
    responseType: 'stream',
    // disable SSL certificate verification
    httpsAgent: new Agent({
      rejectUnauthorized: false
    })
  }).then(result => {
    // saving images to "downloaded-content" folder
    result.data.pipe(createWriteStream(resolve(__dirname, 'downloaded-content', number + '.jpg')));
  }).catch(error => {
    // checking if a response from server is received
    if(error.response) {
      // if the script was unable to download or get access the file but received response from server
      console.error('maybe file [n=%s] is not found? http code: %s 🙃 🤭 🤭 🤭 🤭', number, error.response.status);
    } else {
      // else response from server is not received
      console.error('maybe this resource does not exists?');
    };
  });
};

// loop this N times until all photos are downloaded
while (++numberOfPhoto <= countOfImagesOnTheServer) {
  downloadImage(numberOfPhoto);
};
