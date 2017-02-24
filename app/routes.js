//Requerimientos
var express = require('express');
var path    = require('path');

//Router
var router = express.Router();

//Exportar
module.exports = router;

// Panel de autenticación
router.get('/login',function( request, response ){
  // console.log( request.route.path );
  response.render('pages/login',{
    pageTitle: 'Inicio de sesión GCP',
    title: 'Login',
    layout: 'master'
  });
});

//Home
router.get('/',function (request, response) {
  response.render('pages/login',{
    pageTitle: 'Inicio de sesión GCP',
    title: 'Login',
    layout: 'master'
  });
});

// router.get('/home/tokenID=:token',function (request, response) {
//   console.log( request.params.token );
//   response.render('pages/home',{
//     pageTitle: "GCP",
//     layout: 'master'
//   });
// });

router.get('/home',function (request, response) {
  response.render('pages/home',{
    pageTitle: "GCP BackOffice",
    layout: 'master-home'
  });
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
