const db = require("../config/connection");
const response = require("../config/response");

// Get all users
exports.getAllUsers = (req, res) => {
  db.query("SELECT id, fullname, name, email FROM users", (err, result) => {
    if (err) {
      console.error(err);
      return response(500, err, "Failed to fetch users", res);
    }
    response(200, result, "Users retrieved successfully", res);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;
  db.query(
    "SELECT id, fullname, name, email FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return response(500, err, "Failed to fetch user", res);
      }
      if (result.length === 0) {
        return response(404, null, "User not found", res);
      }
      response(200, result[0], "User retrieved successfully", res);
    }
  );
};

// Update user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const allowedFields = ["fullname", "name", "email", "password"];
  const fields = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  values.push(userId);
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  db.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete user" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  });
};
