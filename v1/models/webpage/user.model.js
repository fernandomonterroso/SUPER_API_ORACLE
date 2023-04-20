//import { Model } from "objectmodel";

var { Model } = require("objectmodel");

Model.prototype.errorCollector = function(errors){
	//console.log(errors);
    let errores={required:""};
	errors.forEach(error =>{
        errores.required = errores.required+error.path+" is required, "; 
    });
    throw JSON.stringify(errores);
};

var SchemaUserLogin = Model({
    userbd: String,
    password: String,
});

module.exports = SchemaUserLogin;