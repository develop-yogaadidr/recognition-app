const { canvas } = require("../commons/env");
const { faceDetectionOptions } = require("../commons/faceDetection");

exports.GetFaceDescriptor = async (image) => {
  const referenceImage = await canvas.loadImage(image);

  const resultFaceDescriptor = await faceapi
    .detectSingleFace(referenceImage, faceDetectionOptions)
    .withFaceLandmarks(true)
    .withFaceDescriptor();

  return resultFaceDescriptor;
};

exports.GetFaceDescriptors = async (image) => {
  const referenceImage = await canvas.loadImage(image);

  const resultFaceDescriptors = await faceapi
    .detectAllFaces(referenceImage, faceDetectionOptions)
    .withFaceLandmarks(true)
    .withFaceDescriptors();

  return resultFaceDescriptors;
};

exports.ToLabeledFaceDescriptors = async (param, label = "Unknown") => {
  var data = Object.keys(param.descriptor).map((key) => [param.descriptor[key]]);
  var result = new Float32Array(data)
  param.descriptor = result;

  return param;
}