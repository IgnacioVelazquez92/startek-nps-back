const mongoose = require("mongoose");
const { Schema } = mongoose;

const encuestaSchema = new Schema({
  _recordId: String,
  Fecha: Date,
  Fecha_Resp: Date,
  Email: String,
  NPS_GROUP: String,
  NPS_Calification: Number,
  Opinion: String,
  Cordialidad: String,
  Claridad: String,
  Conocimiento: String,
  Resolucion: String,
  Tab_1: String,
  Tab_2: String,
  Tab_3: String,
  Tab_4: String,
  VQ: String,
  ANI: Number,
  PCRC: String,
  PCRC1: String,
  PCRC2: String,
  PCRC3: String,
  UsuarioU: String,
  SITIO: String,
  VAG: String,
  RAC: String,
  LIDER: String,
  SUP: String,
  U_LIDER: String,
});

// Define el modelo basado en el esquema
const encuesta = mongoose.model("encuesta", encuestaSchema);

module.exports = encuesta;
