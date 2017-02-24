"use strict";

auth.onAuthStateChanged(function(user) {
  if (user) {
    crearAlerta( "Bienvenido <strong>" + user.email + "</strong>", "blue" );
    findInDB( user.uid );
  }
  else {
    window.location.href = "/login";
  }
});

/*******************************************************
 * findInDB: Función que busca la info de la persona   *
 * dentro de la base de datos                          *
 *                                                     *
 * @params:                                            *
 *  + uid: El identificador de usuario que es obtenido *
 *         desde la sesión.                            *
 * @return: Ninguno debido a que es asíncrona          *
 *******************************************************/

function findInDB ( id ) {

  const users = db.ref( 'Usuarios' ).orderByKey().equalTo( id );

  var llave, info, empresa;

  if ( users != null ){

    users.on( "child_added", function( snapshot ){

      llave = snapshot.key;
      info = snapshot.val();

      db.ref( 'Cuenta' ).child( info.Empresa ).on('value',function(snapshot){

        empresa = snapshot.val();
        defineAmbiente( info, empresa );
      });
    });

  }
  else{
    auth.signOut(); // Cerrar sesión -> es una cuenta inexistente
    window.location.href = "/login";
  }
}


/*******************************************************
 * defineAmbiente: Coloca la información dentro de un  *
 * objeto que se manipula durante la aplicacición.     *
 *                                                     *
 * @params:                                            *
 *  + usuario: Objeto obtenido por Firebase con la     *
 *             informaicón de la persona.              *
 *  + empresa: Objeto que tiene la información de la   *
 *             empresa a la que pertecene.             *
 *                                                     *
 * @return: Ninguno debido a que es asíncrona          *
 *******************************************************/

function defineAmbiente ( usuario, empresa ) {
  currentUser = {
    name        : usuario.Nombre,
    flast_na    : usuario.ApPat,
    slast_na    : usuario.ApMat,
    prof_pic    : usuario.Foto,
    //Información de la empresa
    email       : usuario.email,
    company     : empresa.NComercial,
    type        : usuario.Tipo,
  };

  // console.log( currentUser );

  /* Rellenar información de barra lateral */

  var renderInfo = {
    currentUser: [],
    dataPermissions: []
  },
      dataPermissions = {};

  if ( currentUser.type === "superuser" ) {
    dataPermissions = {
      "operaciones": ["personas", "incidentes"],
      "informacion": ["resultados", "pendientes", "dictamen", "tableros"],
      "maestros": ["cuentas","entidades","partners","encuestas","usuarios","funciones"],
      "finanzas": ["sistemas","tickets","pagos"]
    };
  }

  renderInfo['currentUser'] = currentUser;
  renderInfo['dataPermissions'] = dataPermissions;

  // console.log(renderInfo);
  // console.log( JSON.stringify(renderInfo) );

  var loadStatus = dust.render('home-sidebar', renderInfo, function( err, output ) {
    if ( err ) {
      $('#rendered-sidebar').html("Ocurrió un trágico error");
    } //if
    else{
      $('#rendered-sidebar').html("");
      $('#rendered-sidebar').html(output);
      $('.collapsible').collapsible();
      $(".active-sidebar").sideNav({
        menuWidth: 280,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      }); // Barra lateral
    } //else
  });
}


$('#kickout').click(function(e){
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "/login";
  });
});
