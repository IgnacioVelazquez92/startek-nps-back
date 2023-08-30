const { Router } = require("express");
const { login } = require("../controllers/login.controller");

const route = Router();

//Rutas de usuarios
route.post("/", login);

module.exports = route;
