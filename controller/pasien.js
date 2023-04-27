const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const PasienRepository = require("../repository/pasien");
const { GetFaceDescriptor, GetFaceDescriptors, ToLabeledFaceDescriptors } = require("../helper/faceDetection");
const { CompareDecriptor } = require("../helper/faceRecognition");
const { checkSupportedImages } = require("../commons/helpers");

exports.GetByNik = async (req, res, next) => {
  let params = req.params;
  let result = await ensurePasienFound(params.nik);
  if (result.pasien == null) {
    response(res, null, ResponseCode.NotFound, `Pasien with NIK ${params.nik} is not found at locally or other servers`);
    return;
  }

  response(res, result.pasien, 200, result.message);
};

exports.Update = async (req, res, next) => {
  var queryImage = await req.file;
  if (queryImage == null) {
    response(res, null, ResponseCode.BadRequest, "parameter 'Image' is required");
    return;
  }

  if (!checkSupportedImages(queryImage)) {
    response(res, null, ResponseCode.BadRequest, "Unsupported image type")
    return;
  }

  let faceDecriptor = await GetFaceDescriptor(queryImage.buffer);
  if (faceDecriptor == undefined) {
    response(res, null, ResponseCode.BadRequest, "Face not detected")
    return;
  }

  let params = req.params;
  let result = await PasienRepository.updatePasien(params.nik, faceDecriptor);

  response(res, result);
};

exports.Recognize = async (req, res, next) => {
  var queryImage = await req.file;
  if (queryImage == null) {
    response(res, null, ResponseCode.BadRequest, "parameter 'Image' is required");
    return;
  }

  if (!checkSupportedImages(queryImage)) {
    response(res, null, ResponseCode.BadRequest, "Unsupported image type")
    return;
  }

  let params = req.params;
  let result = await ensurePasienFound(params.nik);
  if (result.pasien == null) {
    response(res, null, ResponseCode.NotFound, `Pasien with NIK ${params.nik} is not found at locally or other servers`);
    return;
  }

  let foto = typeof (result.pasien.foto) == 'string' ? JSON.parse(result.pasien.foto) : result.pasien.foto
  let source = await ToLabeledFaceDescriptors(foto, params.nik);

  let faceDecriptor = await GetFaceDescriptors(queryImage.buffer);

  let compareResult = await CompareDecriptor(source, faceDecriptor)

  response(res, compareResult);
};

async function ensurePasienFound(nik) {
  let message = "-";
  let pasien = await PasienRepository.getPasienAsync(nik);
  let result = pasien;

  if (result == null) {
    let pasienOtherServers = await PasienRepository.getFromPusatData(nik);
    if (pasienOtherServers != null) {
      result = pasienOtherServers;
    }
    message = "Patient data found at another server (Data Center)";
  } else {
    message = "Patient data found at local server";
  }

  return {
    message: message,
    pasien: result
  };
}