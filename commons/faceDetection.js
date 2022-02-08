faceDetectionNet = faceapi.nets.tinyFaceDetector

// SsdMobilenetv1Options
const minConfidence = 0.5

// TinyFaceDetectorOptions
const inputSize = 32
const scoreThreshold = minConfidence

function getFaceDetectorOptions() {
  new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
  // return net === faceapi.nets.ssdMobilenetv1
  //   ? new faceapi.SsdMobilenetv1Options({ minConfidence })
  //   : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

exports.faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)