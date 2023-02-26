const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const { FaceRecognition } = require("../helper/faceRecognition");
const { Initialize } = require("../repository/database");

exports.Initialize = async (req, res, next) => {
    let result = await Initialize()
    // var result = "";
    response(res, result);
};

