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
};
