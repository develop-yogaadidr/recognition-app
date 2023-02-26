const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const { FaceRecognition } = require("../helper/faceRecognition");

exports.Face = async (req, res, next) => {
  var queryImage = await req.files;
  if (queryImage == null || queryImage.length != 2) {
    response(res, null, ResponseCode.BadRequest, "parameter 'Images' is required");
    return;
  }

  var result = await FaceRecognition(queryImage[0].buffer, queryImage[1].buffer);
  response(res, result);
};

