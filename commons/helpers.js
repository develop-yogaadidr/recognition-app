exports.bufferToBase64 = (image) => {
  const base64Result =
    "data:image/png;base64," + image.buffer.toString("base64");

  return base64Result;
};
