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

const encuestasFiltradasPorFecha = async (fromDate, toDate) => {
  try {
    const encuestasFiltradas = await encuesta.find({
      Fecha: { $gte: fromDate, $lte: toDate },
    });
    return encuestasFiltradas;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw new Error("Error al obtener las encuestas.");
  }
};

const encuestasFiltradasPorFechayU = async (fromDate, toDate, usuarioU) => {
  try {
    const encuestasFiltradas = await encuesta.find({
      Fecha: { $gte: fromDate, $lte: toDate },
      UsuarioU: usuarioU,
    });
    return encuestasFiltradas;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw new Error("Error al obtener las encuestas.");
  }
};

module.exports = {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
  encuestasFiltradasPorFecha,
  encuestasFiltradasPorFechayU,
};
