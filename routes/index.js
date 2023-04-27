var express = require('express');
require('dotenv').config();
var router = express.Router();

// const user = require("../repository/pasien")
const pasienController = require("../controller/pasien");
const faceController = require("../controller/face");
const objectControlelr = require("../controller/object");
const ocrControlelr = require("../controller/ocr");
const serverController = require("../controller/server");
// const databaseController = require("../controller/database");

router.get('/', async function(req, res, next){
  let information = {
    Version: process.env.APP_VERSION ?? "0.0",
    Name: process.env.APP_NAME ?? "Recognition Apps",
    ServerUrl: process.env.SERVER_URL ?? "http://localhost"
  }
  res.json(information);
});

router.get("/pasien/:nik", pasienController.GetByNik);
router.post("/pasien/:nik/update", upload.single('image'), pasienController.Update); //update image
router.post("/pasien/:nik/recognize", upload.single('image'), pasienController.Recognize);

router.get("/servers", serverController.GetAll);
router.post("/servers", serverController.Insert);
router.post("/servers/:id", serverController.Update);
router.delete("/servers/:id", serverController.Delete);

router.post("/object", upload.single('image'), objectControlelr.Object)
router.post("/ocr", upload.single('image'), ocrControlelr.Ocr)
router.post('/face', upload.array('images', 2), faceController.Face);

// router.post('/database/initialize', databaseController.Initialize);

module.exports = router;