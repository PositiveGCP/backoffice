var express         = require('express');
var expressLayouts  = require('express-ejs-layouts');
var bodyParser      = require('body-parser'); // Para poder leer JSON mediante request.
var mailer          = require('nodemailer'); // Envio de correo electrónico
var fs              = require('fs');


var app = express();
var port = 3000;

app.set('view engine','ejs');
app.use( expressLayouts );
app.use( bodyParser.json() );

// Configuración de correo electrónico
var transporter = mailer.createTransport({
    host: 'smtp.google.com',
    secureConnection: false,
    service: 'gmail',
    auth: {
      user: '',
      password: ''
    }
});

// Mensaje y a quien
var mailOptions = {
    from: '"Positive C 👻" <dante.bazaldua@positivecompliance.com>', // sender address
    to: 'nte111da@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

//Referencia
var router = require('./app/routes');
app.use('/',router);

// Montar /home para cualquier request.
app.use('/home', express.static(__dirname + '/public'));

// Use of statics
app.use(express.static(__dirname + '/public')); //Carpeta de funcionamiento


// Registro-envio de correo
app.post('/register-send-mail',function (request, response) {
  console.log( "Tu solicitud fue: " + request.body.nombre );
  response.send("Se envió la solicitud de: " + request.body.email );
  // Enviar el correo:
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //       return console.log(error);
  //   }
  //   console.log('Message %s sent: %s', info.messageId, info.response);
  // });
});

app.get('/users/type=:type',function(request, response){

  fs.readFile('app/users.json','utf8',function( err, data ){
      if (err) {
        console.log( err );
        response.redirect('/404');
      }
      var x = repartirInfo( JSON.parse(data), request.params.type );
      if ( x == null ) {
        response.redirect('/404');
      }
      else{
        response.json( x );
      }
  });

});

function repartirInfo( data, mode ){

  var perm  = {};

  perm['Operaciones'] = data['Operaciones'];
  perm['Información'] = data['Información'];
  perm['Maestros']    = data['Maestros'];

  switch ( mode ) {
    case "superuser":
    case "company":
      perm['Finanzas']  = data['Finanzas'];
      break;
    case "normal":
      break;
    default:
      perm = null;
  }

  return perm;
}

app.get('*', function(req, res){
  res.redirect('/404');
});

//Servidor
app.listen(port, function () {
  console.log("Inicializado Backoffice");
  console.log("Escuchando en puerto 3000");
});
