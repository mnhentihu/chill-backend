const response = require("../config/response");

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return response(400, null, "No image uploaded", res);
  }

  const filePath = `/uploads/${req.file.filename}`;
  response(200, { filePath }, "Image uploaded successfully", res);
};
