exports.bufferToBase64 = (image) => {
  const base64Result =
    `data:${image.mimetype};base64, ${image.buffer.toString("base64")}`;

  return base64Result;
};

exports.checkSupportedImages = (image) => {
  let supportedImages = [
    "application/octet-stream",
    "image/png",
    "image/jpg",
    "image/jpeg"
  ]

  return supportedImages.filter(s => s == image.mimetype).length > 0
}