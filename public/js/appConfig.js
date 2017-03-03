"use strict";

// Afecta a toda la aplicación en cuanto a tener una versión en desarrollo y otra en producción
const envMode = "production";

// Initialize Firebase
var appConfig = {
  apiKey: "AIzaSyAT7spVMFGob7q6Q1UJCaMi6RvGoMBgcAc",
  authDomain: "prototipo1-8e37a.firebaseapp.com",
  databaseURL: "https://prototipo1-8e37a.firebaseio.com",
  storageBucket: "prototipo1-8e37a.appspot.com",
  messagingSenderId: "856846236373"
};

const pstv  = firebase.initializeApp( appConfig );
const sApp  = firebase.initializeApp( appConfig, "Secondary");

const db    = pstv.database();
const auth  = firebase.auth();
const storageRef = firebase.storage().ref();

$(document).ready(function(){
  $('select').material_select();
  $('.materialboxed').materialbox();
  $('.modal').modal();
  $(".button-collapse").sideNav(); // Barra lateral
  $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrainWidth: false, // Does not change width of dropdown to that of the activator
     hover: false, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true, // Displays dropdown below the button
     stopPropagation: false // Stops event propagation
   }
 );
});

function cerrarSesion(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/login";
  });
}

/*******************************************
 * stringCheck: Verifica si un texto tiene *
 * la consistencia para poder hacer un     *
 * request.                                *
 * Las opciones son configurables:         *
 * + stringCheck( string, <verificar_path>)*
 * + Pero si se quiere dejar valores por   *
 * defecto simplemente mandar el string.   *
 * @param: string, texto a verificar.      *
 * @return: El error ocurrido.             *
 * - notString: Debido a que está vacío o  *
 *              es nulo.                   *
 * - pathFormat: Es una dirección por tanto*
 *               puede ocasionar problemas *
 *               en la consulta.           *
 *  + Tener especial cuidado en fechas.    *
 * - spaceFormat: El texto está conformado *
 *                por puros espacios.      *
 * - clearText: El texto ingresado.        *
 *******************************************/

function stringCheck( string, path ){
  var opt  = path == true ? path : false;
  var spaces = 0, paths = 0, empty = 0;
  var regPath = /(\/\w+)+/g;

  var temp = string;

  if ( string == "" )
    empty = 1;
  if ( string.indexOf(' ') >= 0 )
    spaces = 1;
  if ( temp.match(regPath) != null )
    paths = 1;

  if ( opt == false ) {
    if ( empty == 1 )
      return "notString";
    if ( spaces == 1 )
      return "spaceFormat";
    if ( paths == 1)
      return "pathFormat";
  } // if
  else{
    if ( empty == 1 )
      return "notString";
    if ( spaces == 1 )
      return "spaceFormat";
  } // else

  return string;
}

/*******************************************
 * crearAlerta: Crea una alerta tipo"toast"*
 * @param:                                 *
 *  + alert: Texto a incluir en la alerta  *
 *  + color: Color que se desplegará.      *
 * @return: Ninguno                        *
 *******************************************/

function crearAlerta( alert, color ) {
  var alerta = $('<span>'+alert+'</span>');
  Materialize.toast( alerta, 3000, color);
}

//
// function insertaTemp(){
//   const users = db.ref( 'Usuarios').child('nZUXtLMyrVRk58U5KSPkAtz8t9m2').set({
//     ApMat : "Huerta",
//     ApPat : "Bazaldua",
//     Empresa : "-K_oamG1TExZkGP5Ed8g",
//     Foto : "https://firebasestorage.googleapis.com/v0/b/prototipo1-8e37a.appspot.com/o/images%2Fusuarios%2Fh.png?alt=media&token=0a0bbaa3-63fc-48c3-b373-ea17f376e70d",
//     Genero : "male",
//     Nombre : "Dante",
//     Tipo : "superuser",
//     email : "dante.bazaldua@positivecompliance.com",
//     pass : "3xt1c10n"
//   });
//   return;
// }
