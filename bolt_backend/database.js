const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  } else {
    db.run(
      "CREATE TABLE IF NOT EXISTS employees( \
            employee_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            last_name NVARCHAR(20)  NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            address NVARCHAR(100),\
            country_code INTEGER\
        )",
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT, password TEXT, salt TEXT)",
      (err) => {
        if (err) {
          console.error("Error creating table: " + err.message);
        }
      }
    );
  }
});

module.exports = db;
