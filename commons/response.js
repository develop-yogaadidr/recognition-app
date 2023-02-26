var { ResponseCode } = require("./responseCode")

exports.response = (res, data = null, code = ResponseCode.Success, message = null) => {
    var result = {
        "status": code == ResponseCode.Success ? "Success" : "Failed",
    }

    if(data != null){
        result["data"] = data
    }

    if(message != null){
        result["message"] = message;
    }

    res.json(result, code);
}