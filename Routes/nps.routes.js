const { Router } = require("express");
const {
  getNpsByEmail,
  getNpsByU,
  getAll,
  getNpsByDateAndU,
  getNpsByDate,
  getNpsByDateAndULeader,
  saveEncuesta,
} = require("../controllers/nps.controller");

const route = Router();
const multer = require("multer");

// Configura multer para manejar la carga de archivos excel
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Ruta para cargar un archivo excel y guardar encuestas
route.post("/base-encuestas", upload.single("excelFile"), saveEncuesta);

//Rutas para nps
route.get("/get-by-email/:email", getNpsByEmail);
route.get("/get-by-user/:usuarioU", getNpsByU);
route.post("/get-by-date", getNpsByDate);
route.post("/get-by-date-user", getNpsByDateAndU);
route.post("/get-by-lider", getNpsByDateAndULeader);
route.get("/get-all", getAll);

module.exports = route;
