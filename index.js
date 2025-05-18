const express = require("express");
const app = express();
const port = 3000;

// connect to database
const database = require("./database.js");

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add a user
app.post("/users", (req, res) => {
  const { fullname, name, email, password } = req.body;
  database.query(
    "INSERT INTO users (fullname, name, email, password) VALUES (?, ?, ?, ?)",
    [fullname, name, email, password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting data into database");
      } else {
        res.status(201).json({
          message: "User added successfully",
          data: { id: result.insertId, name, email, fullname },
        });
      }
    }
  );
});

// get all users
app.get("/users", (req, res) => {
  database.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

// get user by id
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  database.query(
    "SELECT * FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        if (result.length === 0) {
          res.status(404).send("User not found");
        } else {
          res.json(result[0]);
        }
      }
    }
  );
});

// update user by id
app.patch("/users/:id", (req, res) => {
  const userId = req.params.id;
  const allowedFields = ["name", "email", "fullname", "password"];
  const fields = [];
  const values = [];

  // Loop untuk menyusun query secara dinamis
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  });

  // Jika tidak ada field yang dikirim
  if (fields.length === 0) {
    return res.status(400).send("No valid fields provided for update");
  }

  // Tambahkan userId sebagai parameter terakhir
  values.push(userId);

  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;

  database.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating data in database");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found");
    }

    res.json({ message: "User updated successfully" });
  });
});

// delete user by id
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  database.query("DELETE FROM users WHERE id = ?", [userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting data from database");
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
