'use strict'

const conexion = require('../../../conexiones/oracledbCombex');
var Respuesta = require('../../models/general/respuesta.model');
var jwt = require("../../services/jwt");
var respFormat = require("../../services/respFormat");

function getMenuUser(req, res, next) {
    try {
    conexion.queryObject({ ruta: 'v1/src/querys/webpage/sel_menu.sql', bindParams : {userbd: req.user.login.userbd}, credentials: req.user.login })
        .then(function (result) {
            let validarResp = respFormat.createResp({ status_code: 1, data: result.rows });
            let respuesta = new Respuesta(validarResp);
            return res.status(validarResp.estado_http).send(respuesta);
        })
        .catch(function (err) {
            return next(err);
        });
    } catch (error) {
        return next(error);
    }
}

function getFavs(req, res, next) {
    try {
    conexion.queryObject({ ruta: 'v1/src/querys/webpage/sel_favs.sql', bindParams : {userbd: req.user.login.userbd}, credentials: req.user.login })
        .then(function (result) {
            let validarResp = respFormat.createResp({ status_code: 1, data: result.rows });
            let respuesta = new Respuesta(validarResp);
            return res.status(validarResp.estado_http).send(respuesta);
        })
        .catch(function (err) {
            return next(err);
        });
    } catch (error) {
        return next(error);
    }
}

function getImagenesBanner(req, res, next) {
    try {
    conexion.queryObject({ ruta: 'v1/src/querys/webpage/sel_imgs_banner_app.sql', credentials: req.user.login })
        .then(function (result) {
            let validarResp = respFormat.createResp({ status_code: 1, data: result.rows });
            let respuesta = new Respuesta(validarResp);
            return res.status(validarResp.estado_http).send(respuesta);
        })
        .catch(function (err) {
            return next(err);
        });
    } catch (error) {
        return next(error);
    }
}

async function loginEmp(req, res, next) {
    try {
        var Login = require('../../models/webpage/user.model');
        let loginModel = new Login(req.body);
        let result = await conexion.comprobateUser(loginModel);
        let validarResp;
        if (result === true) {
            conexion.queryObject({ ruta: 'v1/src/querys/general/sel_info_token.sql', bindParams: { userbd: loginModel.userbd }, credentials: loginModel })
                .then(function (result) {
                    if (result.rows == 0) {

                        validarResp = respFormat.createResp({ status_code: 37 });
                        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
                    } else {
                        let validarResp = respFormat.createResp({ status_code: 1, data: { userData:result.rows[0],accessToken: jwt.createTokenEmp({ ...result.rows[0], ...loginModel }) } });
                        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
                    };
                    //return res.status(200).send(respuesta);
                })
                .catch(function (err) {
                    return next(err);
                });
        } else {
            validarResp = respFormat.createResp({ status_code: 50 });
            return res.status(validarResp.estado_http).send(new Respuesta(validarResp));
        };

    } catch (error) {
        return next(error);
    }
}


async function pruebaService(req, res, next) {
    try {
        let validarResp = respFormat.createResp({ status_code: 1 });
        return res.status(validarResp.estado_http).send(new Respuesta(validarResp));

    } catch (error) {
       
        return next(error);
    };

}

module.exports = {
    getMenuUser,
    loginEmp,
    pruebaService,
    getImagenesBanner,
    getFavs,
}
