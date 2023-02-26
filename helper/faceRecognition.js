require('dotenv').config();
const displaySize = { width: 200, height: 200 };

const { canvas } = require("../commons/env");
const { faceDetectionOptions } = require("../commons/faceDetection");
const faceapi = require("@vladmandic/face-api");

exports.CompareDecriptor = async (dec1, dec2) => {
  const faceMatcher = new faceapi.FaceMatcher(dec1);

  const resizedDetections = faceapi.resizeResults(dec2, displaySize);
  const results = resizedDetections.map((d) => {
    return faceMatcher.findBestMatch(d.descriptor);
  });

  var data = {
    score: `0%`,
    recognize: false,
  };

  results.forEach((result, i) => {
    if (result.distance < process.env.RECOGNITION_THRESHOLD && result.label != "unknown") {
      data = {
        score: `${((1 - result.distance) * 100).toFixed(2)}%`,
        recognize: true,
      };
    }
  });

  return data;
};

exports.FaceRecognition = async (image1, image2) => {
  const referenceImage = await canvas.loadImage(image1);
  const queryImage = await canvas.loadImage(image2);

  const resultsRef = await faceapi
    .detectSingleFace(referenceImage, faceDetectionOptions)
    .withFaceLandmarks(true)
    .withFaceDescriptor();

  const resultsQuery = await faceapi
    .detectAllFaces(queryImage)
    .withFaceLandmarks(true)
    .withFaceDescriptors();

  let result = await this.CompareDecriptor(resultsRef, resultsQuery);

  return result;
};
