const { checkSupportedImages } = require("../commons/helpers");
const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const { FaceRecognition } = require("../helper/faceRecognition");

exports.Face = async (req, res, next) => {
  var queryImage = await req.files;
  if (requestImage.length != 2) {
    response(res, null, ResponseCode.BadRequest, "parameter 'Images' is required");
    return;
  }

  if(!checkSupportedImages(queryImage)){
    response(res, null, ResponseCode.BadRequest, "Unsupported image type")
    return;
  }

  var result = await FaceRecognition(queryImage[0].buffer, queryImage[1].buffer);
  // var result = "";
  response(res, result);
};

