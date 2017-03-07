"use strict";
var cloud = null;

firebase.auth().onAuthStateChanged(function( user ) {
  if ( user ) {
    usr.orderByKey().equalTo(user.uid).once('value').then(function (snapshot) {//
      info = snapshot.val()[user.uid];
      uid = user.uid;
      infoPerm();
    });
  } else {
    Alert("No hay sesión abierta","red");
  }
}, function ( err ) {
  Alert("Error","red");
});

function Alert(txt,color) {
  var $bad = $('<span>'+txt+'</span>');
  Materialize.toast($bad, 5000, color);
}

$('#search').keypress(function(e){
      if(e.which == 13){
        return false;
      }
});

$('#search').keyup(function () {
  var sos = document.getElementById('search').value;
    db.ref('Usuarios').on("child_added",function (snapshot) {
      var val = snapshot.val();
      var nc = snapshot.val().Nombre+" "+snapshot.val().ApPat+" "+snapshot.val().ApMat;
      var ap = snapshot.val().ApPat+" "+snapshot.val().ApMat;
      if (val.Nombre.toUpperCase().startsWith(sos.toUpperCase()) || val.ApPat.toUpperCase().startsWith(sos.toUpperCase()) || val.ApMat.toUpperCase().startsWith(sos.toUpperCase()) || nc.toUpperCase().startsWith(sos.toUpperCase()) || ap.toUpperCase().startsWith(sos.toUpperCase())) {
        $(document.getElementById('id['+snapshot.key+']')).removeClass("hide");
      } else {
        $(document.getElementById('id['+snapshot.key+']')).addClass("hide");
      }
    });
  });

function mayNot() {
  $('#modal1').modal('close');
  $('#modal2').modal('close');
  fotografia = null;
  cloud = null;
}

function infoPerm() {
  if ( info.Tipo == "superuser") {
    $('#menu').removeClass('scale-out');
    $('#menu').addClass('scale-in');
    db.ref('Usuarios').orderByChild('ApPat').on("child_added", function (snapshot) {
      if (snapshot.val().Tipo == 'partner') {
        getArray(snapshot,"view");
      }
    });
  } else {
    $('#menu').addClass('scale-out');
    $('#menu').removeClass('scale-in');
    location.href = "/";
  }
}

function getArray(snapshot,type) {
  var mat = notNull(snapshot.val().ApMat);
  var ema = notNull(snapshot.val().email);
  var gen = genUsr(snapshot.val().Genero);

  db.ref('Cuenta').orderByKey().equalTo(snapshot.val().Empresa).once('value',function (snap) {
    var emp = snap.val()[snapshot.val().Empresa].NComercial;
    var array = {
      id: snapshot.key,
      image: snapshot.val().Foto,
      name: snapshot.val().Nombre,
      appat: snapshot.val().ApPat,
      apmat: mat,
      email: ema,
      puesto: snapshot.val().Puesto,
      empresa: emp,
      type: snapshot.val().Tipo,
      male: gen,
      emke: snapshot.val().Empresa
    };
    showInfo(snapshot,array,type);
  });
}

function showInfo(snapshot,array,type) {
  if (type == "view") {
    dust.render('user', {array} , function( error, output ) {
      if (error) {
        $('#content-wrapper').append("Error");
      } else {
        $('#content-wrapper').append(output);
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modUsr(snapshot.key);
        });
      }
    });
  } else if (type == "modify") {
    dust.render('modUsr', {array} , function( error, output ) {
      if (error) {
        $('#modal1').append("Error");
      } else {
        $('#modal1').append(output);
        document.getElementById('photo').addEventListener('change', __photo, false);
        $('select').material_select();
        $('#action').click(function () {
          reset(snapshot);
        });
      }
    });
  }
}

function modUsr(key) {
  db.ref('Usuarios').orderByKey().equalTo(key).on("child_added",function (snapshot) {
    var mod = document.getElementById('modal1');
    while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
    }
    getArray(snapshot,"modify");
  });
}

function notNull(val) {
  if (val == "null") {
    return "";
  } else {
    return val;
  }
}

function genUsr(val) {
  if (val == "male") {
    return true;
  } else {
    return false;
  }
}

$( '#altas' ).click(function () {
  var array = [];
  var mod = document.getElementById('modal1');
  while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
  }
  dust.render('altUsr', {array} , function( error, output ) {
    if (error) {
      $('#modal1').append("Error");
    } else {
      $('#modal1').modal('open');
      $('#modal1').append(output);
      document.getElementById('photo').addEventListener('change', __photo, false);
      $('select').material_select();
    }
  });
});

function userData(id) {
  if (id == "new") {
    if (validaUsr(id) == 1) {
      suRe('new');
    } else {
      return;
    }
  } else {
    if (validaUsr(id) == 1) {
      suRe('view');
    } else {
      return;
    }
  }
}

function killData(id) {
  cloud = id;
  suRe('kill');
}

function validaUsr(key) {
  var cont = document.getElementById('modal1');
  var inp = cont.querySelectorAll('INPUT');
  var obg = new Array(), may = new Array(), data = new Array();
  var inc = 0, inv = 0;
  var tt;

  obg[0] = inp[0];
  obg[1] = inp[1];

  may[0] = inp[2];

  for (var i = 0; i < obg.length; i++) {
    tt = stringCheck(obg[i].value);
    if (tt == 'pathFormat') {
      inv++;
      $(obg[i]).addClass("invalid");
    } else if (tt == 'notString') {
      inc++;
      $(obg[i]).addClass("invalid");
    } else {
      $(obg[i]).removeClass("invalid");
      data[data.length] = obg[i].value;
    }
  }

  for (var i = 0; i < may.length; i++) {
    tt = stringCheck(may[i].value);
    if (tt == 'pathFormat') {
      inv++;
      $(may[i]).addClass("invalid");
    } else if (tt == 'notString') {
      $(may[i]).removeClass("invalid");
      data[data.length] = "null";
    } else {
      $(may[i]).removeClass("invalid");
      data[data.length] = may[i].value;
    }
  }

  if (inp[3].checked == false && inp[4].checked == false) {
    $(inp[3]).addClass("invalid");
    $(inp[4]).addClass("invalid");
    Alert("Indica el genero","red");
    inc++;
  } else {
    if (inp[3].checked == true) {
      data[data.length] = "male";
    } else if (inp[4].checked == true) {
      data[data.length] = "female";
    }
    $(inp[3]).removeClass("invalid");
    $(inp[4]).removeClass("invalid");
  }

  if (inc != 0) {
    Alert("Campos vacios","red");
    return 0;
  } else {
    if (fotografia != null) {
      data[data.length] = "null";
      data[data.length] = key;
      cloud = data;
      return 1;
    } else {
      if (data[9] == "male") {
        data[data.length] = male;
      } else {
        data[data.length] = female;
      }
      data[data.length] = key;
      cloud = data;
      return 1;
    }
  }
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
 var regPath = /(\/\+)+/;

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

function __photo(evt) {
  var img;
  if (fotografia = evt.target.files[0]){
    metfoto = {
      'contentType': fotografia.type
    };
    if (fotografia.size > 1000*1000 || fotografia.type != "image/jpeg" && fotografia.type != "image/png") {
      Alert("Fotografia de usuario no admitida","red");
      document.getElementById('txt_photo').value = "";
      $(document.getElementById('txt_photo')).addClass("invalid");
      document.getElementById('photo').value = null;
      fotografia = null;
      metfoto = null;
    } else {
      $(document.getElementById('txt_photo')).removeClass("invalid");
    }
    img = new Image();
    img.onload = function() {
      if (this.width != this.height) {
        Alert("Tu fotografia debe ser cuadrada","red");
        document.getElementById('txt_photo').value = "";
        document.getElementById('photo').value = null;
        $(document.getElementById('txt_photo')).addClass("invalid");
        fotografia = null;
        metfoto = null;
      } else {
        $(document.getElementById('txt_photo')).removeClass("invalid");
      }
    };
    img.src = _URL.createObjectURL(fotografia);
  }
}

function suRe(type) {
  var array;

  if (type == "new") {
    array = {
      type: "new"
    };
  } else if (type == "view") {
    array = {
      type: "view"
    };
  } else if (type == "kill") {
    array = {
      type: "kill"
    };
  }

  $("#modal2_footer_firsta").attr('onclick','doIt("'+ array.type +'")');
  $('#modal2').modal('open');

}

function doIt(type) {
  var cont = document.getElementById('modal1');
  var inp = cont.querySelectorAll('INPUT');
  if (type == 'new') {
    newUsr(inp);
  } else if (type == 'view') {
    viewUsr(inp);
  } else if (type == 'kill') {
    killUsr();
  }
}

function killUsr() {
  $('#modal2').modal('close');
  var div = document.getElementById('content-wrapper');
  div.removeChild(document.getElementById('id['+cloud+']'));
  db.ref('Usuarios').orderByKey().equalTo(cloud).on("child_added",function (snapshot) {
    db.ref('Usuarios').child(snapshot.key).child('Tipo').set('inactivo');
    $('#modal1').modal('close');
    $('#modal2').modal('close');
  });
}

function viewUsr(inp) {
  var id = cloud[5];
  db.ref('Usuarios').orderByKey().equalTo(id).on("child_added",function (snapshot) {
  cloud[5] = inp[7].value;
  cloud[cloud.length] = snapshot.val().pass;
    if (fotografia != null) {
      storageRef.child('images/usuarios/' + "'"+snapshot.key+"'").put(fotografia, metfoto).then(function(snap) {
        cloud[4] = snap.metadata.downloadURLs[0];
        datUsr(id);
      });
    } else {
      cloud[4] = snapshot.val().Foto;
      datUsr(id);
    }
  });
}

function datUsr(id) {
  db.ref('Usuarios').child(id).set({
    Nombre: cloud[0],
    ApPat: cloud[1],
    ApMat: cloud[2],
    Genero: cloud[3],
    Foto: cloud[4],
    Empresa: '-K_oamG1TExZkGP5Ed8g',
    email: cloud[5],
    pass: cloud[6],
    Tipo: 'partner'
  });
  Alert("Función completada","green");
  $('#modal1').modal('close');
  $('#modal2').modal('close');
  cloud = null;
  fotografia = null;
}

function killData(id) {
  cloud = id;
  suRe('kill');
}

function newUsr(inp) {
  var promise = secondaryApp.auth().createUserWithEmailAndPassword(inp[7].value,inp[8].value).then(function(user) {
    $(inp[7]).removeClass("invalid");
    $(inp[8]).removeClass("invalid");
    cloud[5] = inp[7].value;
    cloud[cloud.length] = inp[8].value;
    if (fotografia != null) {
      storageRef.child('images/usuarios/' + "'"+user.uid+"'").put(fotografia, metfoto).then(function(snap) {
        cloud[4] = snap.metadata.downloadURLs[0];
        datUsr(user.uid);
      });
    } else {
      datUsr(user.uid);
    }
  });
  secondaryApp.auth().signOut();
  promise.catch(e=>__Error(e.code));
}

function __Error(error) {
  var cont = document.getElementById('modal1');
  var inp = cont.querySelectorAll('INPUT');
  switch (error) {
    case "auth/email-already-in-use":
      Alert("Correo ya en uso","red");
      $(inp[7]).addClass("invalid");
      break;
    case "auth/invalid-email":
      Alert("Correo inválido","red");
      $(inp[7]).addClass("invalid");
      break;
    case "auth/operation-not-allowed":
      Alert("Operación inválida","red");
      $(inp[7]).addClass("invalid");
      $(inp[8]).addClass("invalid");
      break;
    case "auth/weak-password":
      Alert("Contraseña débil, recuerda utilizar al menos una mayúsucula y un caracter especial.","red");
      $(inp[8]).addClass("invalid");
      break;
  }
  $('#modal2').modal('close');
}

db.ref('Usuarios').on("child_changed",function (snapshot) {
  var list = document.getElementById('id['+snapshot.key+']');
  while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
  }
  var mat = notNull(snapshot.val().ApMat);
  var ema = notNull(snapshot.val().email);
  var gen = genUsr(snapshot.val().Genero);

  db.ref('Cuenta').orderByKey().equalTo(snapshot.val().Empresa).once('value',function (snap) {
    var emp = snap.val()[snapshot.val().Empresa].NComercial;
    var array = {
      id: snapshot.key,
      image: snapshot.val().Foto,
      name: snapshot.val().Nombre,
      appat: snapshot.val().ApPat,
      apmat: mat,
      email: ema,
      puesto: snapshot.val().Puesto,
      empresa: emp,
      type: snapshot.val().Tipo,
      male: gen,
      emke: snapshot.val().Empresa
    };

    dust.render('cont', {array} , function( error, output ) {
      if (error) {
        $(list).append("Error");
      } else {
        $(list).append(output);
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modUsr(snapshot.key);
        });
      }
    });
  });
});
