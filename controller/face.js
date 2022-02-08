const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const { FaceRecognition } = require("../helper/faceRecognition");

exports.Face = async (req, res, next) => {
  var requestImage = await req.files;
  if (requestImage.length != 2) {
    response(res, null, ResponseCode.BadRequest);
    return;
  }

  var result = await FaceRecognition(requestImage[0].buffer, requestImage[1].buffer);
  // var result = "";
  response(res, result);
};

