'use strict'

var express = require("express");
var generalController = require("../../controllers/general/generalController");

var api = express.Router();
//RUTAS
api.post('/example' ,generalController.listarTarea);
api.get('/listTurnoVistu' ,generalController.listTurnoVistu);
api.post('/listTurnoVistuById',generalController.getTurnoVistuById);

//EXPORTACION DE RUTAS
module.exports = api;