var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var port = 8080;

app.set('view engine','ejs');
app.use(expressLayouts);

//Referencia
var router = require('./app/routes');
app.use('/',router);

app.use(express.static(__dirname + '/public'));

//Servidor
app.listen(port, function () {
  console.log("Inicializado");
});
