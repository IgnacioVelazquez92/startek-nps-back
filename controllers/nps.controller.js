const {
  ObtenerPorEmail,
  ObtenerPorU,
  obtenerTodo,
  encuestasFiltradasPorFecha,
  encuestasFiltradasPorFechayU,
  encuestasFiltradasPorFechayULider,
  guardarEncuesta,
} = require("../services/nps.services");

const { parse } = require("date-fns");

const xlsx = require("xlsx");

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

const getNpsByDateAndULeader = async (req, res) => {
  try {
    const { desde, hasta, U_LIDER } = req.body;

    // Parsear las fechas desde las cadenas al formato de objeto Date
    const fromDate = new Date(desde);
    const toDate = new Date(hasta);

    console.log(fromDate, toDate, U_LIDER);

    if (!fromDate || !toDate || !U_LIDER) {
      return res.status(400).json({ error: "Se requieren los datos" });
    }

    const encuestas = await encuestasFiltradasPorFechayULider(
      fromDate,
      toDate,
      U_LIDER
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

const saveEncuesta = async (req, res) => {
  let encuestasGuardadas = 0; // Variable para rastrear la cantidad de encuestas guardadas

  try {
    const fileBuffer = req.file.buffer;

    // Analiza el archivo Excel
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const excelSerialNumberToDate = (serialNumber) => {
      const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
      const epoch = Date.parse("1900-01-01"); // Excel's epoch
      const offset = (serialNumber - 1) * msPerDay; // Offset in milliseconds
      return new Date(epoch + offset);
    };

    // Itera sobre los datos para convertir las fechas a objetos Date y guardar las encuestas
    for (const item of data) {
      if (item.Fecha) {
        // Convierte el número de Excel en una fecha válida
        item.Fecha = excelSerialNumberToDate(item.Fecha);
      }
      if (item.Fecha_Resp) {
        // Convierte el número de Excel en una fecha válida
        item.Fecha_Resp = excelSerialNumberToDate(item.Fecha_Resp);
      }
      // Convierte los campos a mayúsculas antes de guardar
      if (item.Email) {
        item.Email = item.Email.toUpperCase();
      }
      if (item.UsuarioU) {
        item.UsuarioU = item.UsuarioU.toUpperCase();
      }
      if (item.U_LIDER) {
        item.U_LIDER = item.U_LIDER.toUpperCase();
      }

      // Utiliza el servicio para guardar la encuesta
      const encuestaGuardada = await guardarEncuesta(item);

      if (encuestaGuardada) {
        encuestasGuardadas++; // Incrementa el contador si la encuesta se guarda exitosamente
      }
    }
    res.status(200).json({
      message: "Archivo Excel cargado y procesado con éxito.",
      encuestasGuardadas, // Agrega la cantidad de encuestas guardadas en la respuesta
    });
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    res
      .status(500)
      .json({ error: "Error al cargar y procesar el archivo Excel." });
  }
};

module.exports = {
  getNpsByEmail,
  getNpsByU,
  getAll,
  getNpsByDate,
  getNpsByDateAndU,
  getNpsByDateAndULeader,
  saveEncuesta,
};
