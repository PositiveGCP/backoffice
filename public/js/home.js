"use strict";

auth.onAuthStateChanged( function( user ) {
  if (user) {
    $('#loadText').html("Distorcionando el espacio tiempo...");
    // Controlar como se renderizen los elementos
    var getCredential = new Promise( function( resolve, reject ) {
      Enviorment( user.uid, function( credential ){ // Dentro del paréntesis se pudo haber llamado el resultado del callback
        // Aquí las credenciales del usuario ya llegaron
        resolve( credential );
      });
    });

    // Promise de los datos de firebase
    getCredential
      .then( function( success ) {
        /* Controlar renderizado */
        var render  = new Promise( function( resolve, reject ){
          UsuarioActual( success, function( stateOfRender ){ // Función que renderiza barra lateral
            resolve( stateOfRender );
          });
        });

        // Atender la promesa 'render'
        render
          .then( function( success ){
            $('#loadText').html("Alineando planetas...");
            $('#preloader').delay(0).fadeOut('slow', function() {
              $(this).remove();
            }); // Eliminar el loader
          }) // then
          .catch( function( reject ){
            console.error( reject );
          }); // catch


      }) // then
      .catch( function( err ){
        console.error( err );
      }); // catch
  }
  else {
    window.location.href = "/login";
  }
});

/*******************************************************
 * Enviorment: Función asíncrona para la obtención de  *
 * datos de Firebase.                                  *
 *                                                     *
 * @params:                                            *
 *  + id: El identificador de usuario que es obtenido  *
 *         desde la sesión.                            *
 *  + callback: async                                  *
 * @return: Ninguno debido a que es asíncrona          *
 *******************************************************/

function Enviorment( id, callback ){ // Objeto ambiente
  var env   = findInDB( id );
  callback( env );
}

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

  return new Promise( function( resolve, reject ){

    const users = db.ref( 'Usuarios' ).orderByKey().equalTo( id ).limitToLast(1); // Referencia a la base de datos
    var secret = { // Credenciales del usuario
      'usuario': null,
      'empresa': null
    };
    var llave, info, empresa;

    if ( users != null ){

      users.on( 'child_added', function( snapshot ){

        llave = snapshot.key;
        info  = snapshot.val();

          db.ref( 'Cuenta' ).child( info.Empresa ).on( 'value' , function( snapshot ){

            empresa = snapshot.val();
            secret['usuario'] = info;
            secret['empresa'] = empresa;

            resolve( secret ); // Resolver la promesa

          }); // db.ref
      });
    } // if
    else{
      secret = null;
      crearAlerta("Ocurrió un grave error. Pregunte a administrador","black");
      auth.signOut(); // Cerrar sesión -> es una cuenta inexistente
      window.location.href = "/login";
    } // else

  }); // Promise
}

function UsuarioActual( credential, callback ){
  var ambiente = defineAmbiente( credential['usuario'], credential['empresa'] );
  callback( ambiente );
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

  /*
  Usuario tiene como campos:
  + Nombre
  + Primer apellido
  + Segundo apellido
  + Imagen de perfil
  + Correo electrónico
  + Compañia
  + Tipo
  */
  var currentUser; // Usuario que se manejará durante toda la sesión

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

  var renderInfo = {
    currentUser: [],
    dataPermissions: []
  },
      dataPermissions = {};

  // Superusuario:
  var super_user = {
    "operaciones": ["personas", "transacciones", "incidentes"],
    "informacion": ["resultados", "pendientes", "dictamen", "tableros"],
    "maestros": ["cuentas","entidades","partners","encuestas","usuarios","funciones"],
    "finanzas": ["sistemas","tickets","pagos"]
  };

  // Usuario Principal = company
  var principal_user = {
    "operaciones": ["personas", "transacciones", "incidentes"], // Entro transacciones
    "informacion": ["resultados", "dictamen", "tableros"], // Se fue pendientes
    "maestros": ["entidades","encuestas","usuarios","funciones"], // Se va cuentas, partners
    "finanzas": ["sistemas","tickets"] // Se va pagos
  };

  // Usuario Principal
  var normal_user = {
    "operaciones": ["personas", "transacciones", "incidentes"], // Entro transacciones
    "informacion": ["resultados", "dictamen", "tableros"], // Se fue pendientes
    "maestros": ["encuestas","usuarios","funciones"] // Se va cuentas, partners y entidades
    // Se va finanzas
  };

  // Verificar el tipo de usuario y renderizar
  switch ( currentUser.type ) {
    case "superuser":
      dataPermissions = super_user;
      break;
    case "company":
      dataPermissions = principal_user;
      break;
    case "normal":
      dataPermissions = normal_user;
      break;
    default:
      dataPermissions = null;
  }

  renderInfo['currentUser'] = currentUser;
  renderInfo['dataPermissions'] = dataPermissions;

  // Iterador para verificar la llave
  dust.helpers.iter = function(chunk, context, bodies, params) {
    var obj = context.resolve(params.obj);

    var iterable = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {

        var value   = obj[key];
        var iconID;

        switch ( key ) {
          case 'operaciones':
            iconID  = 'settings';
            break;
          case 'informacion':
            iconID  = 'info_outline';
            key = 'información'
            break;
          case 'maestros':
            iconID  = 'work';
            break;
          case 'finanzas':
            iconID  = 'attach_money';
            break;
          default:
            iconID  = null;
        }

        // key[0]  = key[0].toUpperCase(); // Convertir la primera letra en mayúscula
        iterable.push({
          '$key': key,
          '$value': value,
          '$type': typeof value,
          '$icon': iconID
        });

      }
    }
    // console.log( "Termino de iterar" );
    return chunk.section(iterable, context, bodies);
  };

  return new Promise( function( resolve, reject ){

    var loadStatus = dust.render('home-sidebar', renderInfo, function( err, output ) {
      if ( err ) {
        $('#rendered-sidebar').html("Ocurrió un trágico error");
        reject('failed');
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
        // Poner el nombre de la empresa
        resolve('success');
      } //else
    });

  }); // Promise

}


/*******************************************************
 * kickout: Cerrar sesión.                             *
 * @return: Ninguno                                    *
 *******************************************************/

$('#kickout').click(function(e){
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "/login";
  });
});
