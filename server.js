var express         = require('express');
var expressLayouts  = require('express-ejs-layouts');

var app = express();
var port = 8080;

app.set('view engine','ejs');
app.use( expressLayouts );

//Referencia
var router = require('./app/routes');
app.use('/',router);

// Montar /home para cualquier request.
app.use('/home', express.static(__dirname + '/public'));

// Use of statics
app.use(express.static(__dirname + '/public')); //Carpeta de funcionamiento

app.get('*', function(req, res){
  res.send('what???');
});

//Servidor
app.listen(port, function () {
  console.log("Inicializado");
  console.log("Escuchando en puerto 8080");
});
