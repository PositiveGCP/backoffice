var express         = require('express');
var expressLayouts  = require('express-ejs-layouts');
var bodyParser      = require('body-parser'); // Para poder leer JSON mediante request.
var mailer          = require('nodemailer'); // Envio de correo electrónico

var app = express();
var port = 8080;

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

app.get('*', function(req, res){
  res.redirect('/404');
});

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

//Servidor
app.listen(port, function () {
  console.log("Inicializado");
  console.log("Escuchando en puerto 8080");
});
