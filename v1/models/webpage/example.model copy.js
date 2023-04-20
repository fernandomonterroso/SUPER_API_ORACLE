//import { Model } from "objectmodel";

var { Model } = require("objectmodel");

Model.prototype.errorCollector = function(errors){
	//console.log(errors);
    let errores=[];
	errors.forEach(error =>{
        errores.push({
            "path": error.path,
            "message": error.path+" is required"
        }) 
    });
    throw errores;
};

var SchemaUserLogin = Model({
    user: String,
    password: String,
});

module.exports = SchemaUserLogin;