"use strict";

$('#passwd-input').keydown( function(e) {
    if (e.which == 13) {
        e.preventDefault();
        loginProcess(); // Función de inicio de sesión
    }
}); // #passwd-input.keydown

$('#login-request').click(function() {
  loginProcess(); //  Función de inicio de sesión
}); // #login-request.click

function loginProcess () {

  var param1  = stringCheck($('#email-input').val()),
      param2  = stringCheck($('#passwd-input').val(), true);

  if ( ( param1 != $('#email-input').val() )||( param2 != $('#passwd-input').val() ) ){
    envMode == "development" ? crearAlerta( param1 + " . " + param2, "black" ) : crearAlerta( "Intente de nuevo", "black" );
    $('#email-input').val("");
    $('#passwd-input').val("");
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

}

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

//Recuperación de contraseña
$("#recovery-request").click( function(){
  var email   = stringCheck($('#email-input-recovery').val());

  if ( email != $('#email-input-recovery').val() ){
    envMode == "development" ? crearAlerta( param1 + " . " + param2, "black" ) : crearAlerta( "Intente de nuevo", "black" ); //Verifica que se envía y muestra errores.
    $('#email-input-recovery').val(""); //Limpiar string
    return;
  }

  auth.sendPasswordResetEmail( email )
  .then(function() {
    //Cuando si se envío
    $('#email-input-recovery').val(''); //Limpiar input
    $('#password-recover').modal('close'); //Cerrar modal
    crearAlerta("Se envío. Verifique su correo", "green");
  }, function(error) {
    envMode == "development" ? crearAlerta( error.message, "red" ) : crearAlerta( "No se envío", "red" );
  });

});

auth.onAuthStateChanged(function(user) {
  if (user) {
    crearAlerta( "Bienvenido", "blue" );
    // window.location.href = "/home/tokenID=" + user.refreshToken; //En caso de usar token
    window.location.href = "/home";
  }
});
