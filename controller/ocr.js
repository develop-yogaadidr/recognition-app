const { response } = require("../commons/response");
const { OpticalCharacterRecognition } = require("../helper/opticalCharacterRecognition");

exports.Ocr = async (req, res, next) => {
  var queryImage = await req.file;
  if(queryImage == null){
    response(res, null, ResponseCode.BadRequest);
    return;
  }

  var result = await OpticalCharacterRecognition(queryImage);

  response(res, result);
};
