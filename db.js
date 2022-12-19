const monk = require("monk");

const db = monk(process.env.MONGO_URI);

if (db) {
  console.log("connected to DB ");
} else {
  console.log("falied to connect to DB");
}

module.exports = db;
