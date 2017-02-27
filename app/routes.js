//Requerimientos
var express     = require('express');
var path        = require('path');

//Router
var router      = express.Router();

//Exportar
module.exports = router;

// Panel de autenticación
router.get('/login',function( request, response ){
  response.render('pages/login',{
    pageTitle: 'Inicio de sesión GCP',
    title: 'Login',
    style: 'login',
    layout: 'master-noHome'
  });
});

//Home -> redirige a login
router.get('/',function (request, response) {
  response.redirect('/login');
});

// Pagina de registro
router.get('/register',function( request, response ){
  // console.log( request.route.path );
  response.render('pages/register',{
    pageTitle: 'Registro',
    title: 'Registro GCP',
    style: 'register',
    layout: 'master-noHome'
  });
});

router.get('/home',function (request, response) {
  response.render('pages/home',{
    pageTitle: "GCP BackOffice",
    layout: 'master-home'
  });
});
