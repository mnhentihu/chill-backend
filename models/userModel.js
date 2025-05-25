const db = require("../config/connection");

const User = {
  //create user
  create: (data, callback) => {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const { fullname, name, email, password } = data;
    const sql =
      "INSERT INTO users (fullname, name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [fullname, name, email, password, createdAt, updatedAt],
      callback
    );
  },

  // get all users
  findAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },

  // get user by id
  findById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  },

  // update user by id
  updateById: (id, data, callback) => {
    const allowedFields = ["name", "email", "fullname", "password"];
    const fields = [];
    const values = [];

    allowedFields.forEach((field) => {
      if (data[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(data[field]);
      }
    });

    if (fields.length === 0) return callback("No fields to update");

    values.push(id);
    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    db.query(sql, values, callback);
  },

  // delete user by id
  deleteById: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  },
};

module.exports = User;
