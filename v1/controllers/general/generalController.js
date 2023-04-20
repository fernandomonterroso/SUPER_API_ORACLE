'use strict'

const conexion = require('../../../conexiones/oracledbCombex');


function listarTarea(req, res, next) {
    try {
        var Tarea = require('../../models/example.model');
        var tarea = new Tarea(req.body);
        return res.status(200).send(tarea);
    } catch (error) {
        return next(error);
    }
}

function listTurnoVistu(req, res, next) {
    conexion.queryObject({ ruta: 'v1/src/querys/general/sel_vistu_turno.sql', options: { autoCommit: true,timeout: 2000 } })
        .then(function (result) {
            return res.status(200).send({ data: result.rows });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getTurnoVistuById(req, res, next) {
    const parametros = {
        ruta: 'v1/src/querys/general/sel_vistu_turno_by_id.sql',
        bindParams: req.body,
        options: { autoCommit: true }
    };

    conexion.queryObject(parametros)
    .then(function (result) {
        return res.status(200).send({ data: result.rows });
    })
    .catch(function (err) {
        return next(err);
    });
}




module.exports = {
    listarTarea,
    listTurnoVistu,
    getTurnoVistuById
}