'use strict'


var Respuesta = require('./v1/models/general/respuesta.model');

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan")
const cors = require("cors")
//app.set("port",3000)

//CARGAR RUTAS
var generalRoutes = require('./v1/routes/general/generalRoutes');
var validacionSatRoutes = require('./v1/routes/sat/validacionSatRoutes');

//MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({limit: '200mb', extended: false}));
app.use(bodyParser.json({limit: '200mb'}));
app.use(morgan('dev'))



//CABEZERAS
app.use((err,req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//RUTAS
app.use('/api/v1/general',generalRoutes);
app.use('/api/v1/sat/validaciones',validacionSatRoutes);

app.use((err, req, res, next) => {
	if(isJSON(err) && JSON.parse(err).required){
		let respuesta = new Respuesta({success:false,status_code:47,message:JSON.parse(err).required,data:[]});
		return res.status(500).send(respuesta);
	}else if(isJSON(err)){
		let respuesta = new Respuesta({success:false,status_code:47,message:err,data:[]});
		return res.status(500).send(respuesta);
	}else if(err.toString()){
		let respuesta = new Respuesta({success:false,status_code:49,message:"Error no controlado: "+err.toString(),data:[]});
		return res.status(500).send(respuesta);
	}else{
		let respuesta = new Respuesta({success:false,status_code:11,message:"Error no controlado: "+err,data:[]});
		return res.status(500).send(respuesta);
	}
	
  });

  function isJSON(elemento) {
	try {
	  JSON.parse(elemento);
	  return true;
	} catch (e) {
	  return false;
	}
  }
//EXPORTAR
module.exports = app;