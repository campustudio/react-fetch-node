let express = require('express');
let router = express.Router(); // eslint-disable-line
const fs = require('fs');
const path = require('path');
// console.log('__dirname: ', __dirname);
const testFolder = path.join(__dirname, '../public/ascii');
// console.log('testFolder: ', testFolder);

router.get('/stls', function(req, res, next) {
  let resFiles = [];
  fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
      console.log('file: ', file);
      resFiles.push(file);
    })
    res.send({
      title: 'Get Stls',
      resFiles: JSON.stringify(resFiles),
    });
  })
});

router.get('/', function(req, res, next) {
  res.send('respond with a stl');
});

module.exports = router;
