//Requerimientos
var express = require('express');
var path    = require('path');
// var auth = require('express-authentication'),
// var basic = require('express-authentication-basic');

//Router
var router = express.Router();

//Exportar
module.exports = router;

//LOGIN?

// var login = basic(function (challenge, callback) {
//   if (challenge.username === 'admin' && challenge.password === 'secret') {
//     callback(null, true, { user: });//Nombre usuario
//   } else {
//     callback(null, false, { error: 'Contraseña erronea' });//Donde?
//   }
// });

//Passportjs Firebase?

//Home
router.get('/'/*,authentication.required()*/,function (req, res) {
  res.render('pages/home');
});

//Personas (alta y consulta)
router.get('/personas',function (req, res) {
  res.render('pages/person');
});

// //Alta desde csv Aparte??
// router.get('/personas/masive',function (req, res) {
//   res.render('pages/person');
// });

// //Personas (alta y consulta)
// router.get('/usuarios',function (req, res) {
//   res.render('pages/person');
// });

// //Alta desde csv Aparte??
// router.get('/usuarios/masive',function (req, res) {
//   res.render('pages/user');
// });

// //Cuentas (alta y consulta) superuser
// router.get('/usuarios',function (req, res) {
//   res.render('pages/person');
// });
