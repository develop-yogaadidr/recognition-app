const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const PasienRepository = require("../repository/pasien");
const { GetFaceDescriptor, GetFaceDescriptors, ToLabeledFaceDescriptors } = require("../helper/faceDetection");
const { CompareDecriptor } = require("../helper/faceRecognition");

exports.GetAll = async (req, res, next) => {
  let result = await PasienRepository.getAllPasienAsync();

  response(res, result);
};

exports.GetByNik = async (req, res, next) => {
  let params = req.params;
  let result = await PasienRepository.getPasienAsync(params.nik);

  response(res, result);
};

exports.Update = async (req, res, next) => {
  var queryImage = await req.file;
  if (queryImage == null) {
    response(res, null, ResponseCode.BadRequest);
    return;
  }

  let faceDecriptor = await GetFaceDescriptor(queryImage.buffer);
  let params = req.params;

  let query = {
    $set: {
      foto: faceDecriptor,
    },
  };
  let result = await PasienRepository.updatePasien(params.nik, query);

  response(res, result);
};

exports.Recognize = async (req, res, next) => {
  var queryImage = await req.file;
  if (queryImage == null) {
    response(res, null, ResponseCode.BadRequest);
    return;
  }

  let params = req.params;
  let pasien = await PasienRepository.getPasienAsync(params.nik);
  let source = await ToLabeledFaceDescriptors(pasien.foto, params.nik);

  let faceDecriptor = await GetFaceDescriptors(queryImage.buffer);

  let result = await CompareDecriptor(source, faceDecriptor)

  response(res, result);
};
