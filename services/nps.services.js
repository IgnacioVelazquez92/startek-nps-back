const encuesta = require("../models/nps.model");

const ObtenerPorEmail = async (email) => {
  console.log(email);
  return await encuesta.find({
    Email: email,
  });
};

const ObtenerPorU = async (UsuarioU) => {
  return await encuesta.find({ UsuarioU: UsuarioU });
};

const obtenerTodo = async () => {
  try {
    const documentos = await encuesta.find({});
    return documentos;
  } catch (error) {
    console.error("Error al obtener los documentos:", error);
    throw error;
  }
};

module.exports = {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
};
