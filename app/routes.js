//Requerimientos
var express = require('express');
var path = require('path');

//Router
var router = express.Router();

//Exportar
module.exports = router;

// Panel de autenticación
router.get('/login', function(request, response) {
    response.render('pages/login', {
        pageTitle: 'Inicio de sesión GCP',
        title: 'Login',
        style: 'login',
        layout: 'master-noHome'
    });
});

//Home -> redirige a login
router.get('/', function(request, response) {
    response.redirect('/login');
});

// Pagina de registro
router.get('/register', function(request, response) {
    response.render('pages/register', {
        pageTitle: 'Registro',
        title: 'Registro GCP',
        style: 'register',
        layout: 'master-noHome'
    });
});

router.get('/home', function(request, response) {
    response.render('pages/home', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/personas', function(request, response) {
    response.render('pages/personas', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/usuarios', function(request, response) {
    response.render('pages/usuarios', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/transacciones', function(request, response) {
    response.render('pages/resultados', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/partners', function(request, response) {
    response.render('pages/partners', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/entidades', function(request, response) {
    response.render('pages/entidades', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/cuentas', function(request, response) {
    response.render('pages/cuentas', {
        pageTitle: "GCP BackOffice",
        renderPath: "GCP" + request.path,
        layout: 'master-home'
    });
});

router.get('/encuestas', function(request, response) {
    //response.render('pages/encuestas', {
    //    pageTitle: "GCP BackOffice",
    //    renderPath: "GCP" + request.path,
    //    layout: 'master-home'
    //});
    response.redirect('/404');
});

/* Guía de RP */
router.get('/guides/resproc', function(request, response) {
    response.sendFile('public/guides/RP.pdf', {
        'root': './'
    });
});

/* Guía de RP */
router.get('/app', function(request, response) {
    response.sendFile('public/app/app.zip', {
        'root': './'
    });
});

// Errores y no encontrados
router.get('/404', function(request, response) {
    response.render('404', {
        pageTitle: "Error",
        layout: '404'
    });
});
