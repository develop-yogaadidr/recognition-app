require('dotenv').config();
const modelUrl = `${process.env.SERVER_URL}/models/`;

const { bufferToBase64 } = require("../commons/helpers");
const TeachableMachine = require("@sashido/teachablemachine-node");

exports.ObjectRecognition = async (image) => {
  var tmModel = new TeachableMachine({
    modelUrl: modelUrl,
  });

  var result = await tmModel.classify({
    imageUrl: bufferToBase64(image),
  });

  return result;
};
