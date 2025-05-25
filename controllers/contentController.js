const db = require("../config/connection");
const Content = require("../models/contentModel");
const response = require("../config/response");

exports.getAllContent = async (req, res) => {
  const { search, genre, sortBy, order, type } = req.query;

  let sql = `
    SELECT c.*, g.nama_genre
    FROM content c
    JOIN genre g ON c.genre_id = g.id
    WHERE 1 = 1
  `;
  const params = [];

  if (search) {
    sql += ` AND (c.judul LIKE ? OR c.deskripsi LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`);
  }

  if (genre) {
    const normalizedGenre = genre.toLowerCase().replace(/[^a-z0-9]/gi, "");
    sql += ` AND LOWER(REPLACE(g.nama_genre, '-', '')) = ?`;
    params.push(normalizedGenre);
  }

  if (type) {
    sql += ` AND LOWER(c.tipe) = ?`;
    params.push(type.toLowerCase());
  }

  const allowedSortFields = ["judul", "tanggal_rilis", "rating"];
  if (sortBy && allowedSortFields.includes(sortBy)) {
    const direction = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
    sql += ` ORDER BY ${sortBy} ${direction}`;
  }

  try {
    const [result] = await db.promise().query(sql, params);
    response(200, result, "Filtered content", res);
  } catch (err) {
    console.error(err);
    response(500, err, "Error retrieving content", res);
  }
};

exports.getContentById = (req, res) => {
  const id = req.params.id;
  Content.getById(id, (err, result) => {
    if (err) return response(500, err, "Gagal mengambil data", res);
    if (result.length === 0)
      return response(404, null, "Konten tidak ditemukan", res);
    response(200, result[0], "Berhasil mengambil detail konten", res);
  });
};

exports.createContent = (req, res) => {
  Content.create(req.body, (err, result) => {
    if (err) return response(500, err, "Gagal menambahkan konten", res);
    response(
      201,
      { id: result.insertId, ...req.body },
      "Konten berhasil ditambahkan",
      res
    );
  });
};

exports.updateContent = (req, res) => {
  const id = req.params.id;
  Content.update(id, req.body, (err, result) => {
    if (err) return response(500, err, "Gagal memperbarui konten", res);
    if (result.affectedRows === 0)
      return response(404, null, "Konten tidak ditemukan", res);
    response(200, null, "Konten berhasil diperbarui", res);
  });
};

exports.deleteContent = (req, res) => {
  const id = req.params.id;
  Content.delete(id, (err, result) => {
    if (err) return response(500, err, "Gagal menghapus konten", res);
    if (result.affectedRows === 0)
      return response(404, null, "Konten tidak ditemukan", res);
    response(200, null, "Konten berhasil dihapus", res);
  });
};
