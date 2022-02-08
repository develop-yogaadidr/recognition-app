const lang = "eng";

const tesseract = require("tesseract.js");

exports.OpticalCharacterRecognition = async (image) => {
  var result = await tesseract.recognize(image.buffer, lang, {
    logger: (m) => console.log(m),
  });

  return result.data.text;
};
