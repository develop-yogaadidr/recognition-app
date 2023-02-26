const { checkSupportedImages } = require("../commons/helpers");
const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const { ObjectRecognition } = require("../helper/objectRecognition");

exports.Object = async (req, res, next) => {
  var queryImage = await req.file;
  if(queryImage == null){
    response(res, null, ResponseCode.BadRequest, "parameter 'Image' is required");
    return;
  }

  if(!checkSupportedImages(queryImage)){
    response(res, null, ResponseCode.BadRequest, "Unsupported image type")
    return;
  }

  var result = await ObjectRecognition(queryImage);
  
  response(res, result);
};
