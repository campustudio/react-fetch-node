let express = require('express');
let router = express.Router(); // eslint-disable-line
const fs = require('fs');
const path = require('path');
// console.log('__dirname: ', __dirname);
const testFolder = path.join(__dirname, '../public/stls');
// console.log('testFolder: ', testFolder);
let bodyParser = require('body-parser');
let parser = bodyParser.json({extended: false});
const globby = require('globby');
let splitResult = [];

router.post('/todo', function(req, res, next) {
  console.log('into stl todo');
  console.log('parser: ', parser);
  console.log('req.body: ', req.body);
  res.render('main', {title: 'Get Stl todo'});
});

router.post('/stls', function(req, res, next) {
  console.log('req.body: ', req.body);
  let resFiles = [];
  const { body = {} } = req;
  const {
    limit = 12,
    page = 1,
  } = body;
  // fs.readdir(testFolder, (err, files) => {
  //   files.forEach((file) => {
  //     console.log('file: ', file);
  //     resFiles.push(file);
  //   })
  //   console.log('process: ', process.cwd());
  //   res.send({
  //     code: 0,
  //     title: 'Get Stls',
  //     resFiles,
  //   });
  // })
  
  const listAllFilesAndDirs = dir => globby.sync(`${dir}/**/*`);
  const sendResult = (splitResult, page, limit) => {
    console.log('splitResult.length: ', splitResult.length);
    let finalResult = splitResult.slice((page - 1)*limit, limit*page);
    let total = splitResult.length;
    console.log('total: ', total);
    let pageCount = (total % limit === 0) ? parseInt(total / limit) : parseInt(total / limit) + 1;
    console.log('pageCount: ', pageCount);
    if (page > pageCount) {
      finalResult = [];
    }
    res.send({
      code: 0,
      title: 'Get Stls',
      resFiles: finalResult,
      pageCount,
      // resFiles: splitResult,
    });
  }

  if (page === 1) {
    (async () => {
      const result = await listAllFilesAndDirs(process.cwd() + '/public/GLC');
      // console.log('result ', result);
      result.forEach((e) => {
        if (e.slice(-3) === 'stl') {
          splitResult.push('./' + e.split('public/')[1])
        }
      })
      console.log('splitResult ', splitResult);// 1 0 2 10 3 20
      console.log('splitResult.length ', splitResult.length);
      sendResult(splitResult, page, limit);
    })();
  } else {
    sendResult(splitResult, page, limit);
  }
});

router.get('/', function(req, res, next) {
  res.render('main', {title: 'Get Stls'});
});

module.exports = router;
