var express = require('express');
var router = express.Router();

const faceController = require("../controller/face");
const objectControlelr = require("../controller/object");
const ocrControlelr = require("../controller/ocr");

router.get('/', function(req, res, next){
  res.json({"result":"None"});
});
router.post("/object",upload.single('image'), objectControlelr.Object)
router.post("/ocr",upload.single('image'), ocrControlelr.Ocr)
router.post('/face',upload.array('images', 2), faceController.Face);

module.exports = router;