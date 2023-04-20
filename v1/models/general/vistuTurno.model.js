//import { Model } from "objectmodel";

var { Model } = require("objectmodel");




var modelVistuTurno = Model({
    TURNO_ID: Number,
    TURNO_CANTIDAD: Number,
    TURNO_DESC: String,
    TURNO_INICIO: String,
    TURNO_FIN: String,
    COMID: date,
    TURNO_DAYINI: Number,
    TURNO_DAYFIN: Number,
}).defaultTo({
});

module.exports = modelVistuTurno;