const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "mymovielist",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting to the database ", err);
    return;
  }
  console.log("connected to database successfully");
});

module.exports = connection;
