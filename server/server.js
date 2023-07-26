const express = require("express");
const app = express();

const npsRoute = require("../Routes/nps.routes");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv/config");
require("../dataBase/dbConnection");
const PORT = process.env.PORT;
// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/", npsRoute);
// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
