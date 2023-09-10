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

const encuestasFiltradasPorFechayULider = async (fromDate, toDate, U_LIDER) => {
  try {
    const encuestasFiltradas = await encuesta.find({
      Fecha: { $gte: fromDate, $lte: toDate },
      U_LIDER: U_LIDER,
    });
    return encuestasFiltradas;
  } catch (error) {
    console.error("Error en la consulta:", error);
    throw new Error("Error al obtener las encuestas.");
  }
};

const guardarEncuesta = async (item) => {
  try {
    // Verifica si la encuesta ya existe en la base de datos
    const existeEncuesta = await encuesta.findOne({
      _recordId: item._recordId,
    });

    if (!existeEncuesta) {
      // Si no existe, crea una nueva encuesta en la base de datos
      await encuesta.create(item);
      console.log(`Encuesta con _recordId ${item._recordId} guardada.`);
      return true; // Retorna true si la encuesta se guarda con éxito
    } else {
      console.log(
        `Encuesta con _recordId ${item._recordId} ya existe, no se guardará.`
      );
      return false; // Retorna false si la encuesta ya existe
    }
  } catch (error) {
    console.error("Error al guardar la encuesta:", error);
    throw error;
  }
};

module.exports = {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
  encuestasFiltradasPorFecha,
  encuestasFiltradasPorFechayU,
  encuestasFiltradasPorFechayULider,
  guardarEncuesta,
};
