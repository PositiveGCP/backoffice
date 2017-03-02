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
    renderPath: "GCP"+request.path,
    layout: 'master-home'
  });
});

router.get('/home/personas',function (request, response) {
  response.render('pages/personas',{
    pageTitle: "Personas",
    renderPath: "GCP"+request.path,
    layout: 'master-home'
  });
});

// Errores y no encontrados
router.get('/404',function (request, response) {
  response.render('404',{
    pageTitle: "Error",
    layout: '404'
  });
});
