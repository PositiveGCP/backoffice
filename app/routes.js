//Requerimientos
var express = require('express');
var path    = require('path');

//Router
var router = express.Router();

//Exportar
module.exports = router;

//Home
router.get('/',function (req, res) {
  res.render('pages/home');
});

//Altas
router.get('/personas',function (req, res) {
  res.render('pages/person');
});
