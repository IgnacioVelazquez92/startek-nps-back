const {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
  encuestasFiltradasPorFecha,
  encuestasFiltradasPorFechayU,
} = require("../services/nps.services");

const { parse } = require("date-fns");

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
    const { desde, hasta } = req.body;

    console.log(desde, hasta);

    // Parsear las fechas desde las cadenas al formato de objeto Date
    const fromDate = parse(desde, "dd/MM/yyyy", new Date());
    const toDate = parse(hasta, "dd/MM/yyyy", new Date());

    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ error: 'Se requieren ambas fechas: "desde" y "hasta".' });
    }

    const encuestas = await encuestasFiltradasPorFecha(fromDate, toDate);
    if (!encuestas) {
      return res.status(404).json({ msg: "no se hallaron encuestas" });
    }

    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener las encuestas." });
  }
};

const getNpsByDateAndU = async (req, res) => {
  try {
    const { desde, hasta, usuarioU } = req.body;

    // Parsear las fechas desde las cadenas al formato de objeto Date
    const fromDate = new Date(desde);
    const toDate = new Date(hasta);

    console.log(fromDate, toDate, usuarioU);

    if (!fromDate || !toDate || !usuarioU) {
      return res.status(400).json({ error: "Se requieren los datos" });
    }

    const encuestas = await encuestasFiltradasPorFechayU(
      fromDate,
      toDate,
      usuarioU
    );

    if (encuestas.length === 0) {
      return res.status(404).json({ msg: "No se hallaron encuestas" });
    }

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
  getNpsByDateAndU,
};
