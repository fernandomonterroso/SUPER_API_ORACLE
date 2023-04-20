const app = require("./app");
const config = require('./config.js');

app.set('port', process.env.PORT || 2001);
app.listen(app.get('port'), ()=>{
    console.log(`NODE_ENV=${config.NODE_ENV}`);
    console.log(`El servidor esta corriendo en http://localhost:${app.get('port')}`);
});