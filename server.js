const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const helmet = require("helmet");
const volleyball = require("volleyball");
const cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(volleyball);

// routes
app.use("/api/v1/auth", require("./Routes/auth"));
app.use("/api/v1/notes", require("./Routes/notes"));

// connection
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
