exports.bufferToBase64 = (image) => {
  const base64Result =
    `data:${image.mimetype};base64, ${image.buffer.toString("base64")}`;

  return base64Result;
};