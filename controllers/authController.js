const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/connection");
const response = require("../config/response");
const { v4: uuidv4 } = require("uuid");
const sendVerificationEmail = require("../config/mailer");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { fullname, name, email, password } = req.body;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const token = uuidv4();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      `INSERT INTO users (fullname, name, email, password, created_at, update_at, verification_token) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [fullname, name, email, hashedPassword, createdAt, updatedAt, token],
      async (err, result) => {
        if (err) return response(500, err, "Register failed", res);

        // Kirim email verifikasi
        await sendVerificationEmail(email, token);

        response(
          201,
          { id: result.insertId, name, email },
          "Register successful, silakan cek email Anda untuk verifikasi.",
          res
        );
      }
    );
  } catch (err) {
    response(500, err, "Internal error during registration", res);
  }
};

// Login user
exports.login = (req, res) => {
  const { name, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE name = ?",
    [name],
    async (err, result) => {
      if (err) return response(500, err, "Login failed", res);
      if (result.length === 0)
        return response(404, null, "User not found", res);

      const user = result[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match) return response(401, null, "Wrong password", res);

      const token = jwt.sign({ id: user.id, email: user.name }, JWT_SECRET, {
        expiresIn: "1h",
      });

      response(200, { token }, "Login successful", res);
    }
  );
};

// Verify email
exports.verifyEmail = (req, res) => {
  const token = req.query.token;

  if (!token) return response(400, null, "Token diperlukan", res);

  db.query(
    "SELECT * FROM users WHERE verification_token = ?",
    [token],
    (err, result) => {
      if (err) return response(500, err, "Verifikasi gagal", res);
      if (result.length === 0)
        return response(400, null, "Token tidak valid", res);

      db.query(
        "UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?",
        [result[0].id],
        (err) => {
          if (err)
            return response(500, err, "Gagal mengupdate verifikasi", res);
          response(200, null, "Email berhasil diverifikasi", res);
        }
      );
    }
  );
};
