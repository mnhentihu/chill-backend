const db = require("../config/connection");

const Genre = {
  getAll: (callback) => {
    db.query("SELECT * FROM genre", callback);
  },
};

module.exports = Genre;
