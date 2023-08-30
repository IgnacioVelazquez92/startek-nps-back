const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  legajo: String,
  legajoU: String,
  name: String,
  lastName: String,
  email: String,
  cellphone: Number,
  password: String,
});

// Define el modelo basado en el esquema
const user = mongoose.model("user", userSchema);

module.exports = user;
