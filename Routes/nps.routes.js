const { Router } = require("express");
const {
  getNpsByEmail,
  getNpsByU,
  getAll,
  getNpsByDateAndU,
  getNpsByDate,
  getNpsByDateAndULeader,
} = require("../controllers/nps.controller");

const route = Router();
//Rutas para nps
route.get("/get-by-email/:email", getNpsByEmail);
route.get("/get-by-user/:usuarioU", getNpsByU);
route.get("/get-by-user/:usuarioU", getNpsByU);
route.post("/get-by-date", getNpsByDate);
route.post("/get-by-date-user", getNpsByDateAndU);
route.post("/get-by-lider", getNpsByDateAndULeader);
route.get("/get-all", getAll);

//Rutas de usuarios

module.exports = route;
