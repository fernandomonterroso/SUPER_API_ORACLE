'use strict'
const respuestas = require('../src/jsons/respuestas.json');
var Respuesta = require('../models/general/respuesta.model');
exports.createResp = function (modelResp) {
    
    var busqueda = respuestas.data.find(x=> x.status_code === modelResp.status_code);

    return { success: busqueda.success, status_code: busqueda.status_code, message: busqueda.message, data: modelResp.data,estado_http:busqueda.estado_http };
}