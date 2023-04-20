var { Model,Any } = require("objectmodel");

var SchemaRespuesta = Model({
    success: Boolean,
    status_code: Number,
    message: String,
    data:Any
}).defaultTo({
    data:[]
});

module.exports = SchemaRespuesta;