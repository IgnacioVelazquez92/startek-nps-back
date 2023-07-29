const { Router } = require("express");
const {
  getNpsByEmail,
  getNpsByU,
  getAll,
  getNpsByDate,
} = require("../controllers/nps.controller");

const route = Router();

route.get("/get-by-email/:email", getNpsByEmail);
route.get("/get-by-user/:usuarioU", getNpsByU);
route.get("/get-by-user/:usuarioU", getNpsByU);
route.get("/get-by-date/:usuarioU", getNpsByDate);
route.get("/get-all", getAll);

module.exports = route;
