const { response } = require("../commons/response");
const { ResponseCode } = require("../commons/responseCode");
const PasienRepository = require("../repository/pasien");
const { GetFaceDescriptor, GetFaceDescriptors, ToLabeledFaceDescriptors } = require("../helper/faceDetection");
const { CompareDecriptor } = require("../helper/faceRecognition");

exports.GetByNik = async (req, res, next) => {
  let params = req.params;
  let result = await PasienRepository.getPasienAsync(params.nik);

  response(res, result);
};

exports.GetFromOtherServer = async(req, res, next) =>{
  let params = req.params;
  let result = await ensurePasienFound(params.nik);

  response(res, result);
}

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
  let pasien = await ensurePasienFound(params.nik);
  if(pasien == null){
    response(res, null, ResponseCode.NotFound);
    return;
  }

  let source = await ToLabeledFaceDescriptors(pasien.foto, params.nik);

  let faceDecriptor = await GetFaceDescriptors(queryImage.buffer);

  let result = await CompareDecriptor(source, faceDecriptor)

  response(res, result);
};

async function ensurePasienFound(nik){
  let pasien = await PasienRepository.getPasienAsync(nik);
  let result = pasien;

  if(result == null){
    let pasienOtherServers = await PasienRepository.getFromOtherServers(nik);
    if(pasienOtherServers != null){
      result = pasienOtherServers;
    }
  }

  return result;
}