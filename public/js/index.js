"use strict";

$('#login-request').click(function() {

  var param1  = stringCheck($('#email-input').val()),
      param2  = stringCheck($('#passwd-input').val(), true);

  if ( ( param1 != $('#email-input').val() )||( param2 != $('#passwd-input').val() ) ){
    envMode == "development" ? crearAlerta( param1 + " . " + param2, "black" ) : crearAlerta( "Intente de nuevo", "black" );
    $('#email-input').val();
    $('#passwd-input').val();
    return;
  }

  auth.signInWithEmailAndPassword( param1, param2 )
    .then( function ( success ) {
      console.log(success);
      crearAlerta( "¡Bienvenido!", "black" );
    })
    .catch( function(e) {
      errHandler( e, envMode ); // Dependiendo del ambiente de desarrollo muestra el error.
    }); // login-request.click

}); // #login-request.click

function errHandler ( error, mode ) {
  var message     = "",
      defaultmsg  = "Ocurrió un error, intente de nuevo.";

  var errDict =
    [ "auth/invalid-email",
      "auth/user-disabled",
      "auth/user-not-found",
      "auth/wrong-password"
    ]; // Diccionario de errores

  //Encontrar el error.
  var err     = errDict.indexOf( error.code );

  switch ( err )
  {
    case 0:
      message = "Formato de email inválido.";
      break;
    case 1:
      message = "Usuario desabilitado.";
    break;
    case 2:
      message = "El usuario no existe.";
      break;
    case 3:
      message = "El usuario o contraseña es incorrecta.";
      break;
    default:
      message = defaultmsg;
    break;
  } //switch

  mode === "development" ? message : message = defaultmsg ;
  crearAlerta( message, "red" );

} //errHandler

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


function crearAlerta( alert, color ) {
  var alerta = $('<span>'+alert+'</span>');
  Materialize.toast( alerta, 5000, color);
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    crearAlerta( "Bienvenido", "blue" );
    window.location.href = "/home";
    console.log("Usuario");
  }
  else {
    console.log("Sin usuario");
  }
});
