const db = require("../config/connection");

const Content = {
  getAll: (callback) => {
    db.query(
      `SELECT content.*, genre.nama_genre 
       FROM content 
       JOIN genre ON content.genre_id = genre.id`,
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      `SELECT content.*, genre.nama_genre 
       FROM content 
       JOIN genre ON content.genre_id = genre.id 
       WHERE content.id = ?`,
      [id],
      callback
    );
  },

  create: (data, callback) => {
    db.query(
      `INSERT INTO content (judul, tipe, deskripsi, genre_id, durasi_total, tanggal_rilis, rating) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.judul,
        data.tipe,
        data.deskripsi,
        data.genre_id,
        data.durasi_total,
        data.tanggal_rilis,
        data.rating,
      ],
      callback
    );
  },

  update: (id, data, callback) => {
    db.query(
      `UPDATE content 
       SET judul = ?, tipe = ?, deskripsi = ?, genre_id = ?, durasi_total = ?, tanggal_rilis = ?, rating = ? 
       WHERE id = ?`,
      [
        data.judul,
        data.tipe,
        data.deskripsi,
        data.genre_id,
        data.durasi_total,
        data.tanggal_rilis,
        data.rating,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(`DELETE FROM content WHERE id = ?`, [id], callback);
  },
};

module.exports = Content;
