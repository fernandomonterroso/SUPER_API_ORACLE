'use strict'

var express = require("express");
var validacionSatController = require("../../controllers/sat/validacionSatController");
var md_auth = require('../../../middleware/aunthenticated');
var api = express.Router();
//RUTAS
api.get('/getMenuUser', [md_auth.ensureAuth],validacionSatController.getMenuUser);
api.get('/getFavs', [md_auth.ensureAuth],validacionSatController.getFavs);
api.get('/getImagenesBanner', [md_auth.ensureAuth],validacionSatController.getImagenesBanner);
api.post('/loginEmp' ,validacionSatController.loginEmp);
api.get('/pruebaService', [md_auth.ensureAuth],validacionSatController.pruebaService);

//EXPORTACION DE RUTAS
module.exports = api;