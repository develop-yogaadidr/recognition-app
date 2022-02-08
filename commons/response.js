var { ResponseCode } = require("./responseCode")

exports.response = (res, data, code = ResponseCode.Success) => {
    var result = {
        "status": code == ResponseCode.Success ? "Success" : "Failed",
        "code": code,
        "data": code == ResponseCode.Success ? data : generateErrorMessage(code)
    }

    res.json(result);
}

function generateErrorMessage(errorCode){
    switch(errorCode) {
        case ResponseCode.BadRequest:
            return "Bad Request"
        case ResponseCode.NotFound:
            return "Not Found"
        case ResponseCode.InternalServerError:
            return "Internal Server Error"
        default:
            return null
    }
}