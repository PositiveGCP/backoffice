var cloud = null;

firebase.auth().onAuthStateChanged(function( user ) {
  if ( user ) {
    $('#menu').removeClass('scale-out');
    $('#menu').addClass('scale-in');
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
    db.ref('Personas').on("child_added",function (snapshot) {
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

function infoPerm() {
if ( info.Tipo == "superuser" ) {
    db.ref('Personas').on("child_added", function (snapshot) {
      getArray(snapshot,"view");
    });
  } else if ( info.Tipo == "normal" ) {
    db.ref('Personas').orderByChild('Empresa').equalTo(info.Empresa).on("child_added",function (snapshot) {
      getArray(snapshot,"view");
    });
  } else if ( info.Tipo == "company" ) {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().entidad) {
        for (var i = 0; i < snapshot.val().entidad.length; i++) {
          if (snapshot.val().entidad[i] == info.Empresa) {
            db.ref('Personas').orderByChild('Empresa').equalTo(snapshot.key).on("child_added",function (snap) {
              getArray(snap,"view");
            });
          }
        }
      }
    });
    db.ref('Personas').orderByChild('Empresa').equalTo(info.Empresa).on("child_added", function (snapshot) {
      getArray(snapshot,"view");
    });
  } else if ( info.Tipo == "partner" ) {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().partner) {
        for (var i = 0; i < snapshot.val().partner.length; i++) {
          if (snapshot.val().partner[i] == uid) {
            db.ref('Personas').orderByChild('Empresa').equalTo(snapshot.key).on("child_added",function (snap) {
              getArray(snap,"view");
            });
          }
        }
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
  var tel = notNull(snapshot.val().Telefono);
  var rfc = notNull(snapshot.val().RFC);
  var dsp = dspPer(snapshot.val().Disponibilidad);
  var gen = genPer(snapshot.val().Genero);
  var pro = aVerage();

  db.ref('Cuenta').orderByKey().equalTo(snapshot.val().Empresa).once('value',function (snap) {
    var emp = snap.val()[snapshot.val().Empresa].NComercial;
    var array = {
      id: snapshot.key,
      image: snapshot.val().Fotografia,
      name: snapshot.val().Nombre,
      appat: snapshot.val().ApPat,
      apmat: mat,
      email: ema,
      tel: tel,
      disp: dsp,
      dispon: snapshot.val().Disponibilidad,
      puesto: snapshot.val().Puesto,
      prom: pro,
      last: snapshot.val().lastDate,
      empresa: emp,
      evr: snapshot.val().Empresa,
      rfc: rfc,
      male: gen[0]
    };
    showInfo(snapshot,array,type);
  });
}

function showInfo(snapshot,array,type) {
  if (type == "view") {
    dust.render('person', {array} , function( error, output ) {
      if (error) {
        $('#content-wrapper').append("Error");
      } else {
        $('#content-wrapper').append(output);
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modPer(snapshot.key);
        });
      }
    });
  } else if (type == "modify") {
    dust.render('modPer', {array} , function( error, output ) {
      if (error) {
        $('#modal1').append("Error");
      } else {
        $('#modal1').append(output);
        document.getElementById('photo').addEventListener('change', __photo, false);
        $('select').material_select();
        empSel(array.evr);
      }
    });
  } else if (type == "change") {
    var list = document.getElementById('id['+snapshot.key+']');
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }
    dust.render('cont', {array} , function( error, output ) {
      if (error) {
        $(list).append("Error");
      } else {
        $(list).append(output);
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modPer(snapshot.key);
        });
      }
    });
  }
}

function modPer(key) {
  db.ref('Personas').orderByKey().equalTo(key).on("child_added",function (snapshot) {
    var mod = document.getElementById('modal1');
    while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
    }
    getArray(snapshot,"modify");
  });
}

$('#massive').click(function () {
  var array = [];
  var mod = document.getElementById('modal1');
  while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
  }
  dust.render('massPer', {array} , function( error, output ) {
    if (error) {
      $('#modal1').append("Error");
    } else {
      $('#modal1').modal('open');
      $('#modal1').append(output);
    }
  });
});

$('#altas').click(function () {
  var array = [];
  var mod = document.getElementById('modal1');
  while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
  }
  dust.render('altPer', {array} , function( error, output ) {
    if (error) {
      $('#modal1').append("Error");
    } else {
      $('#modal1').modal('open');
      $('#modal1').append(output);
      document.getElementById('photo').addEventListener('change', __photo, false);
      $('select').material_select();
      empSel("null");
    }
  });
});

function notNull(val) {
  if (val == "null") {
    return "";
  } else {
    return val;
  }
}

function aVerage() {
  return 0;
}

function genPer(val) {
  if (val == "male") {
    return [true,false];
  } else {
    return [false,true];
  }
}

function dspPer(val) {
  if (val=="Si") {
    return true;
  } else {
    return false;
  }
}

function empOpt(id,txt,val) {
  var sel = document.getElementById(id)
  var opt = document.createElement('OPTION');
  opt.text = txt;
  opt.value = val;
  sel.appendChild(opt);
  $('select').material_select();
}

function revEmp(val) {
  if (val == "null") {
    document.getElementById('emp').value = 'empty';
  } else {
    document.getElementById('emp').value = val;
  }
  $('select').material_select();
}

function empSel(val) {
  if (info.Tipo == "superuser") {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      empOpt('emp',snapshot.val().NComercial,snapshot.key);
      revEmp(val);
    });
  } else if (info.Tipo == "company") {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().entidad) {
        for (var i = 0; i < snapshot.val().entidad.length; i++) {
          if (snapshot.val().entidad[i] == info.Empresa) {
            empOpt('emp',snapshot.val().NComercial,snapshot.key);
            revEmp(val);
          }
        }
      }
    });
    db.ref('Cuenta').orderByKey().equalTo(info.Empresa).on("child_added",function (snapshot) {
      empOpt('emp',snapshot.val().NComercial,snapshot.key);
      revEmp(val);
    });
  } else if (info.Tipo == "normal") {
    db.ref('Cuenta').orderByKey().equalTo(info.Empresa).on("child_added",function (snapshot) {
      empOpt('emp',snapshot.val().NComercial,snapshot.key);
      revEmp(val);
    });
  } else if (info.Tipo == "partner") {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().partner) {
        for (var i = 0; i < snapshot.val().partner.length; i++) {
          if (snapshot.val().partner[i] == uid) {
            empOpt('emp',snapshot.val().NComercial,snapshot.key);
            revEmp(val);
          }
        }
      }
    });
  }
}

function personData(id) {
  cloud = null;
  key = db.ref('Personas').push().key;
  if (id == null) {
    if (valPer(key) == 1) {
      if (cloud[10] == "null") {
        storageRef.child('images/personas/' + "'"+key+"'").put(fotografia, metfoto).then(function(snapshot) {
          cloud[10] = snapshot.metadata.downloadURLs[0];
          suRe("new");
        });
      } else {
        suRe("new");
      }
    } else {
      return;
    }
  } else {
    if (valPer(id) == 1) {
      if (cloud[10] == "null") {
        storageRef.child('images/personas/' + "'"+id+"'").put(fotografia, metfoto).then(function(snapshot) {
          cloud[10] = snapshot.metadata.downloadURLs[0];
          suRe("view");
        });
      } else {
        suRe("view");
      }
    } else {
      return;
    }
  }
}

function killData(id) {
  cloud=id;
  suRe("kill");
}

function valPer(key) {
  var cont = document.getElementById('modal1');
  var inp = cont.querySelectorAll('INPUT');
  var sel = cont.querySelectorAll('SELECT');
  var obg = new Array(), may = new Array(), data = new Array();
  var inc = 0, inv = 0;
  var tt;

  obg[0] = inp[0];
  obg[1] = inp[1];
  obg[2] = inp[11];

  may[0] = inp[2];
  may[1] = inp[7];
  may[2] = inp[9];
  may[3] = inp[10];

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

  for (var i = 0; i < sel.length; i++) {
    if (sel[i].value == "empty") {
      inc ++;
      if (i == 0) {
        $(inp[8]).addClass("invalid");
      } else {
        $(inp[12]).addClass("invalid");
      }
    } else {
      data[data.length] = sel[i].value;
      if (i == 0) {
        $(inp[8]).removeClass("invalid");
      } else {
        $(inp[12]).removeClass("invalid");
      }
    }
  }

  if (inp[10].value != "") {
    if (inp[10].value.match(/[a-z]/) != null) {
      Alert("Formato errorneo de numero","red");
      $(inp[10]).addClass("invalid");
      return 0;
    } else {
      $(inp[10]).removeClass("invalid");
    }
  }

  if (inp[9].value != "") {
    if (inp[9].value.match(/[@]/) == null) {
      Alert("Formato errorneo de e-mail","red");
      $(inp[9]).addClass("invalid");
      return 0;
    } else {
      $(inp[9]).removeClass("invalid");
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
  if (type == "kill") {
    var origen = document.getElementById('content-wrapper');
    origen.removeChild(document.getElementById('id['+cloud+']'));
    db.ref('Personas').child(cloud).set(null);
  } else if (type == "new" || type == "view") {
    var key = db.ref('Personas').child(cloud[11]);
    key.set({
      Nombre: cloud[0],
      ApPat: cloud[1],
      ApMat: cloud[3],
      Fotografia: cloud[10],
      Empresa: cloud[7],
      RFC: cloud[4],
      Telefono: cloud[6],
      email: cloud[5],
      Disponibilidad: cloud[8],
      Puesto: cloud[2],
      Genero: cloud[9]
    });
  }
  Alert("Exito","green");
  $('#modal1').modal('close');
  $('#modal2').modal('close');
  cloud = null;
}

function mayNot() {
  $('#modal1').modal('close');
  $('#modal2').modal('close');
  cloud = null;
}

db.ref('Personas').on("child_changed",function (snapshot) {
  getArray(snapshot,"change");
});
