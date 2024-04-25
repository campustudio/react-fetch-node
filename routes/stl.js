let express = require("express");
var chalk = require("chalk");
let router = express.Router(); // eslint-disable-line
const fs = require("fs");
const path = require("path");
// console.log('__dirname: ', __dirname);
const testFolder = path.join(__dirname, "../public/stls");
// console.log('testFolder: ', testFolder);
let bodyParser = require("body-parser");
let parser = bodyParser.json({ extended: false });
const globby = require("globby");
let splitResult = [];

router.post("/todo", function (req, res, next) {
  console.log("into stl todo");
  console.log("parser: ", parser);
  console.log("req.body: ", req.body);
  res.render("main", { title: "Get Stl todo" });
});

/**
 * calculate distance logic
 */
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "",
  port: "",
  user: "",
  password: "",
  database: "",
});
const csv = require("csv-parser");
const csvFile =
  process.cwd() + "/public/df_entry_exit_file_11401_2024-01-03.csv";
const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
const getDistanceFromLatLonInMeter = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meter
  return R * c * 1000;
};
const biggerThanCount = (scanAndReceiverLocationDistanceArr, value) =>
  scanAndReceiverLocationDistanceArr.filter(
    (e) => e.driverReceiverDistanceWhenScan > value
  ).length;
const smallerThanCount = (scanAndReceiverLocationDistanceArr, value) =>
  scanAndReceiverLocationDistanceArr.filter(
    (e) => e.driverReceiverDistanceWhenScan <= value
  ).length;

router.post("/distance", function (req, res, next) {
  // console.log("req.body: ", req.body);
  const csvTrackingNumbersScanLatLonArr = [];
  // const csvTrackingNumbers = [
  //   "202312310125979",
  //   "202312310125990",
  //   "202312310126064",
  // ];
  const csvTrackingNumbers = [];
  const csvTrackingNumbersScanLatLonMapper = {};

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on("data", (row) => {
      if (row.status === "SCAN_BOX") {
        const order_id = row.order_id;
        const lat_b = row.lat_b;
        const lon_b = row.lon_b;
        csvTrackingNumbersScanLatLonArr.push({ order_id, lat_b, lon_b });
        csvTrackingNumbers.push(order_id);
        csvTrackingNumbersScanLatLonMapper[order_id] = [lat_b, lon_b];
      }
    })
    .on("end", () => {
      console.info(
        chalk
          .keyword("red")
          .italic(
            "=======csv file data is from GPS Report for 11401 on 2024-01-03 df_entry_exit_file_11401_2024-01-03.csv=========="
          )
      );
      console.log(
        "*********CSV file processing finished csvTrackingNumbersScanLatLonArr length",
        csvTrackingNumbersScanLatLonArr.length
      );
      // console.log(
      //   "*********csvTrackingNumbers.length",
      //   csvTrackingNumbers.length
      // );

      connection.connect();
      connection.query(
        `SELECT ORGANIZATION_ID, DELIVERY_LIST_ID, TRACKING_NO, RECEIVER_LATITUDE, RECEIVER_LONGITUDE FROM RTIDI_USER_INS.PARCEL_STATE WHERE ORGANIZATION_ID = '11401' AND CALCULATED_DELIVERY_DATE like '2024-01-03' AND TRACKING_NO IN (${csvTrackingNumbers.join()})`,
        (err, rows, fields) => {
          if (err) throw err;

          const trackingNumberGPSArr = JSON.parse(JSON.stringify(rows));
          // console.log("The trackingNumberGPSArr is: ", trackingNumberGPSArr);
          console.log(
            ">>>>>>>>>>The csvTrackingNumbersScanLatLonArr corresponding receiver GPS location from DB length is: ",
            trackingNumberGPSArr.length
          );

          const scanAndReceiverLocationDistanceArr = [];
          let totalDistance = 0;
          trackingNumberGPSArr.forEach((t1) => {
            const mappedItem =
              csvTrackingNumbersScanLatLonMapper[t1.TRACKING_NO];
            if (mappedItem.length === 2) {
              const tempDistance = getDistanceFromLatLonInMeter(
                mappedItem[0],
                mappedItem[1],
                t1.RECEIVER_LATITUDE,
                t1.RECEIVER_LONGITUDE
              );
              scanAndReceiverLocationDistanceArr.push({
                ORGANIZATION_ID: t1.ORGANIZATION_ID,
                DELIVERY_LIST_ID: t1.DELIVERY_LIST_ID,
                TRACKING_NO: t1.TRACKING_NO,
                RECEIVER_LATITUDE: t1.RECEIVER_LATITUDE,
                RECEIVER_LONGITUDE: t1.RECEIVER_LONGITUDE,
                lat_b: mappedItem[0],
                lat_b: mappedItem[1],
                driverReceiverDistanceWhenScan: tempDistance,
              });
              totalDistance += tempDistance;
            }
          });
          // console.log("scanAndReceiverLocationDistanceArr is: ", scanAndReceiverLocationDistanceArr);
          // console.log(
          //   ">>>>>>>>>>scanAndReceiverLocationDistanceArr length is: ",
          //   scanAndReceiverLocationDistanceArr.length
          // );
          console.log("=======totalDistance is: ", totalDistance);
          console.log(
            "=======average Distance is: ",
            totalDistance / scanAndReceiverLocationDistanceArr.length
          );

          // show summary log
          [10000000, 50000, 5000, 3000, 1001, 1000, 500, 200, 100, 50].forEach(
            (e) => {
              const count =
                e > 1000
                  ? biggerThanCount(scanAndReceiverLocationDistanceArr, e)
                  : smallerThanCount(scanAndReceiverLocationDistanceArr, e);
              const ratio =
                (count / scanAndReceiverLocationDistanceArr.length).toFixed(2) *
                  100 +
                "%";

              console.info(
                chalk
                  .keyword("red")
                  .italic(
                    `distance ${
                      e > 1000 ? `> ${e}` : `<= ${e}`
                    } meters count and ratio are: `
                  ),
                count,
                " | ",
                ratio
              );
            }
          );
        }
      );
      connection.end();
    });

  res.send({
    code: 0,
    title: "Get distance",
  });
});

/**
 * stls logic
 */
router.post("/stls", function (req, res, next) {
  console.log("req.body: ", req.body);
  let resFiles = [];
  const { body = {} } = req;
  const { limit = 12, page = 1 } = body;
  // fs.readdir(testFolder, (err, files) => {
  //   files.forEach((file) => {
  //     console.log('file: ', file);
  //     resFiles.push(file);
  //   })
  console.log("process: ", process.cwd());
  //   res.send({
  //     code: 0,
  //     title: 'Get Stls',
  //     resFiles,
  //   });
  // })

  const listAllFilesAndDirs = (dir) => globby.sync(`${dir}/**/*`);
  const sendResult = (splitResult, page, limit) => {
    console.log("splitResult.length: ", splitResult.length);
    let finalResult = splitResult.slice((page - 1) * limit, limit * page);
    let total = splitResult.length;
    console.log("total: ", total);
    let pageCount =
      total % limit === 0
        ? parseInt(total / limit)
        : parseInt(total / limit) + 1;
    console.log("pageCount: ", pageCount);
    if (page > pageCount) {
      finalResult = [];
    }
    res.send({
      code: 0,
      title: "Get Stls",
      resFiles: finalResult,
      // resFiles: splitResult,
      pageCount,
    });
  };

  if (page === 1) {
    (async () => {
      let result = await listAllFilesAndDirs(process.cwd() + "/public/GLC");
      // console.log('result ', result);
      // result = result.slice(0, 16);
      result.forEach((e) => {
        if (e.slice(-3) === "stl") {
          splitResult.push("./" + e.split("public/")[1]);
        }
      });
      // console.log('splitResult ', splitResult);// 1 0 2 10 3 20
      console.log("splitResult.length ", splitResult.length);
      sendResult(splitResult, page, limit);
    })();
  } else {
    sendResult(splitResult, page, limit);
  }
});

router.get("/", function (req, res, next) {
  res.render("main", { title: "Get Stls" });
});

module.exports = router;
