const {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
} = require("../services/nps.services");

const getNpsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const resp = await ObtenerPorEmail(email);

    if (!resp) {
      res
        .status(404)
        .json({ msg: `No se encontró encuestas del email: ${email}` });
      return;
    }

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getNpsByU = async (req, res) => {
  try {
    const { usuarioU } = req.params;
    const resp = await ObtenerPorU(usuarioU);

    if (!resp) {
      res.status(404).json({ msg: `No se encontró encuestas de: ${usuarioU}` });
      return;
    }

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getNpsByDate = async (req, res) => {
  try {
    const { desde, hasta } = req.query;

    // Convierte las cadenas de fecha en objetos Date
    const fechaDesde = new Date(desde);
    const fechaHasta = new Date(hasta);

    // Si las fechas no son válidas, devuelve un error
    if (isNaN(fechaDesde) || isNaN(fechaHasta)) {
      return res
        .status(400)
        .json({ error: "Las fechas ingresadas no son válidas." });
    }

    // Agrega 1 día a la fechaHasta para que el rango incluya las encuestas del último día seleccionado
    fechaHasta.setDate(fechaHasta.getDate() + 1);

    // Consulta las encuestas dentro del rango de fechas
    const encuestas = await Encuesta.find({
      Fecha: {
        $gte: fechaDesde,
        $lt: fechaHasta,
      },
    });

    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener las encuestas." });
  }
};

const getAll = async (req, res) => {
  try {
    const resp = await obtenerTodo();

    if (!resp) {
      res.status(404).json({ msg: `No se encontró encuestas` });
      return;
    }

    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getNpsByEmail,
  getNpsByU,
  getAll,
  getNpsByDate,
};
