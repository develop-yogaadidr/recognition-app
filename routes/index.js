var express = require('express');
var router = express.Router();

const user = require("../repository/pasien")
const pasienController = require("../controller/pasien");
const faceController = require("../controller/face");
const objectControlelr = require("../controller/object");
const ocrControlelr = require("../controller/ocr");

router.get('/', async function(req, res, next){
  var result = await user.getAllPasienAsync();
  var result2 = await user.getPasienAsync(1);
  res.json({"result":result,"result2": result2});
});

router.get("/pasien", pasienController.GetAll);
router.get("/pasien/:nik", pasienController.GetByNik);
router.post("/pasien/:nik", upload.single('image'), pasienController.Update);
router.post("/pasien/:nik/recognize", upload.single('image'), pasienController.Recognize);

router.post("/object", upload.single('image'), objectControlelr.Object)
router.post("/ocr", upload.single('image'), ocrControlelr.Ocr)
router.post('/face', upload.array('images', 2), faceController.Face);

module.exports = router;