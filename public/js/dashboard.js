"use strict";

auth.onAuthStateChanged( function( user ) {
  if (user) {
    var cargaDashboard  = new Promise( function( resolve, reject ){
      dameUsuario( user.uid, function( credential ){
        resolve( credential );
      });
    }); // cargaDashboard

    cargaDashboard
      .then( function( success ) {
        $('.while').remove();
        console.log( success );
        renderDashboard( success ); // Renderizar el dashboard
      })
      .catch( function( err ) {
        console.log( err );
      })
  }
  else {
    window.location.href = "/login";
  }
});

/*******************************************************
 * dameUsuario: Función callback que retorna un promise*
 * con el valor del tipo de usuario que es.            *
 *                                                     *
 * @params:                                            *
 *  + id: El id del usuario que se está autenticando.  *
 *                                                     *
 * @return: Promesa async                              *
 *******************************************************/

function dameUsuario( id, callback ){
  var user  = helperUsuario( id )
  callback( user );
}

/*******************************************************
 * helperUsuario: Coloca la información dentro de un   *
 * objeto que se manipula durante la aplicacición.     *
 *                                                     *
 * @params:                                            *
 *  + id: El id del usuario que se está autenticando.  *
 *                                                     *
 * @return: Promesa async                              *
 *******************************************************/

function helperUsuario( id ){

  var credential; // Almacenar el valor del tipo

  return new Promise( function(resolve, reject){

    const users = db.ref( 'Usuarios' ).orderByKey().equalTo( id ).limitToLast(1); // Referencia a la base de datos

    if ( users != null ){

      users.on( 'child_added', function( snapshot ){

        credential  = snapshot.val();

        db.ref( 'Cuenta' ).child( credential.Empresa ).on( 'value' , function( snapshot ){

          var empresa = snapshot.val();
          // Poner nombre de la empresa
          $('#cpName').html( empresa.NComercial );
          resolve( credential.Tipo );

        }); // db.ref

      });
    } // if
    else{

      credential = null;
      reject( credential );

    } // else
  });
}

function renderDashboard( type ){

  $.ajax({
      type: 'get',
      url: '/users/type='+type,
      success: function( data ){ 
        handleRsp( data )
      },
      error: function( req, xhr, err ){
        crearAlerta("Ocurrió un error","rounded black");
        return;
      }
  });

}

function handleRsp( data ){
  console.log( data );
  // Iterador para verificar la llave
  dust.helpers.iter = function(chunk, context, bodies, params) {
    var obj = context.resolve(params.obj);

    var iterable = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {

        var value   = obj[key];

        iterable.push({
          '$key': key,
          '$value': value,
          '$type': typeof value,
        });

      }
    }
    // console.log( "Termino de iterar" );
    return chunk.section(iterable, context, bodies);
  };

  var loadStatus = dust.render('home-dashboard', data, function( err, output ) {
    if ( err ) {
      console.log( err );
      $('.renderded_cards').html("Ocurrió un trágico error");
    } //if
    else{
      console.log( output );
      $('.renderded_cards').html("");
      $('.renderded_cards').html(output);
    } //else
  });
}
