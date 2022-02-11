var express = require('express');
var router = express.Router();

const user = require("../repository/pasien")
const faceController = require("../controller/face");
const objectControlelr = require("../controller/object");
const ocrControlelr = require("../controller/ocr");

router.get('/', async function(req, res, next){
  var result = await user.getAllPasienAsync();
  res.json({"result":result});
});
router.post("/object",upload.single('image'), objectControlelr.Object)
router.post("/ocr",upload.single('image'), ocrControlelr.Ocr)
router.post('/face',upload.array('images', 2), faceController.Face);

module.exports = router;