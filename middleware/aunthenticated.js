'user strict'

var jwt = require('jwt-simple');
var moment = require('moment');
//var Respuesta = require('../v1/models/general/respuesta.model');
const Respuesta = require('../v1/models/general/respuesta.model');
const respFormat = require("../v1/services/respFormat");
const conexion = require('../conexiones/oracledbCombex');
var secret = 'combex2023';

exports.ensureAuth = async function (req, res, next) {

    if (!req.headers.authorization) {
        let validarResp = respFormat.createResp({ status_code: 51 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(token, secret);
        if (payload.user_id == undefined) {
            let validarResp = respFormat.createResp({ status_code: 33 });
            return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
        } else {
            let result = await conexion.queryObject({ ruta: 'v1/src/querys/general/sel_access_method.sql', bindParams: { originalUrl: req.originalUrl, user_id: payload.user_id } });
            if (result.rows.length == 0) {
                let validarResp = respFormat.createResp({ status_code: 3 });
                return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
            }
        }
    } catch (error) {
        let validarResp = respFormat.createResp({ status_code: 41 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
    }

    req.user = payload;
    next();

}