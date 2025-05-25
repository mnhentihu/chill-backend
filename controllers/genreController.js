const Genre = require("../models/genreModel");
const response = require("../config/response");

exports.getAllGenres = (req, res) => {
  Genre.getAll((err, result) => {
    if (err) return response(500, err, "Gagal mengambil data genre", res);
    response(200, result, "Berhasil mengambil data genre", res);
  });
};
