var cloud = null;
var cloud_user = null;
local = new Array();
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

$('#search').keypress(function(e){
      if(e.which == 13){
        return false;
      }
    });
$('#search').keyup(function () {
  var sos = document.getElementById('search').value;
  db.ref('Cuenta').on("child_added",function (snapshot) {
    var val = snapshot.val().NComercial;
    if (val.toUpperCase().startsWith(sos.toUpperCase())) {
      $(document.getElementById('id['+snapshot.key+']')).removeClass("hide");
    } else {
      $(document.getElementById('id['+snapshot.key+']')).addClass("hide");
    }
  });
});

function Alert(txt,color) {
  var $bad = $('<span>'+txt+'</span>');
  Materialize.toast($bad, 5000, color);
}

function infoPerm() {
if ( info.Tipo == "superuser" ) {
  $('#menu').removeClass('scale-out');
  $('#menu').addClass('scale-in');
    db.ref('Cuenta').orderByChild('tipo').equalTo('Empresa Positive').on("child_added", function (snapshot) {
      if (snapshot.key != '-K_oamG1TExZkGP5Ed8g') {
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
  var local = snapshot.val().Localidades[0];
  var ent = cmfEnt(snapshot.val().tipo);
  var ide = notNull(snapshot.val().Identidad);

  for (var i = 1; i < snapshot.val().Localidades.length; i++) {
    local = local+", "+snapshot.val().Localidades[i];
  }

    var array = {
      id: snapshot.key,
      image: snapshot.val().Logotipo,
      name: snapshot.val().NComercial,
      social: snapshot.val().RSocial,
      ide: ide,
      pais: snapshot.val().Pais,
      type: snapshot.val().tipo,
      entidad: ent,
      asign: snapshot.val().m_op,
      loc: local
    };

    showInfo(snapshot,array,type);
}

function showInfo(snapshot,array,type) {
  if (type == "view") {
    dust.render('account', {array} , function( error, output ) {
      if (error) {
        $('#content-wrapper').append("Error");
      } else {
        $('#content-wrapper').append(output);
        $('.collapsible').collapsible();
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modCta(snapshot.key);
        });
      }
    });
  } else if (type == "modify") {
    dust.render('modCta', {array} , function( error, output ) {
      if (error) {
        $('#modal1').append("Error");
      } else {
        printFr(output,array);
      }
    });
  }
}

function __optSel(id,val) {
  var sel = document.getElementById(id);
  for (var i = 0; i < val.length; i++) {
    var opt = document.createElement('OPTION');
    opt.text = val[i];
    opt.value = val[i];
    sel.appendChild(opt);
    $('select').material_select();
  }
}

function locSel(val) {
  var op = document.getElementById('local').querySelectorAll('OPTION');
  for (var i = 0; i < op.length; i++) {
    document.getElementById('local').removeChild(op[i]);
  }
  if (val != "Selecciona las Localidades") {
    var opc = document.createElement('OPTION');
    opc.text = val;
    opc.value = "old";
    opc.id = "old_local";
    opc.setAttribute("disabled","");
    opc.setAttribute("selected","");
    document.getElementById('local').appendChild(opc);
    $('select').material_select();
  } else {
    optNull("local",val);
  }
  db.ref('Localidades').orderByKey().equalTo($('#pais').val()).on("child_added",function (snapshot) {
    for (i = 0; i < snapshot.val().length; i++) {
      var opt = document.createElement('OPTION');
      opt.text = snapshot.val()[i];
      opt.value = snapshot.val()[i];
      document.getElementById('local').appendChild(opt);
      $('select').material_select();
    }
  });
}

function paisSel(val,loc) {
  db.ref('Localidades').on("child_added",function (snapshot) {
    var opt = document.createElement('OPTION');
    opt.text = snapshot.key;
    opt.value = snapshot.key;
    document.getElementById('pais').appendChild(opt);
    $('select').material_select();
    if (val == snapshot.key) {
      document.getElementById('pais').value = val;
      locSel(loc);
      $('select').material_select();
    }
  });
}

function modCta(key) {
  db.ref('Cuenta').orderByKey().equalTo(key).on("child_added",function (snapshot) {
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

function cmfEnt(val) {
  if (val == "Empresa Positive") {
    return false;
  } else {
    return true;
  }
}

$('#altas').click(function () {
  var array = [];
  var mod = document.getElementById('modal1');
  while (mod.hasChildNodes()) {  
      mod.removeChild(mod.firstChild);
  }
  dust.render('altCta', {array} , function( error, output ) {
    if (error) {
      $('#modal1').append("Error");
    } else {
      $('#modal1').modal('open');
      printFr(output,array);
      document.getElementById('photo').addEventListener('change', __photo, false);
    }
  });
});

function printFr(output,array) {
  $('#modal1').append(output);
  document.getElementById('logo').addEventListener('change', __logo, false);
  $('select').material_select();
  paisSel(array.pais,array.loc);
  $('#pais').change(function () {
    locSel("Selecciona las Localidades");
  });
  $('#local').change(function () {
    if (document.getElementById('old_local')) {
      document.getElementById('local').removeChild(document.getElementById('old_local'));
      optNull("local","Selecciona las Localidades");
    }
  });
}

function __logo(evt) {
  var img;
  if (logotipo = evt.target.files[0]){
    metlogo = {
      'contentType': logotipo.type
    };
    if (logotipo.size > 1000*1000 || logotipo.type != "image/jpeg" && logotipo.type != "image/png") {
      Alert("Verifica el peso y tipo del archivo","red");
      document.getElementById('txt_logo').value = "";
      $(document.getElementById('txt_logo')).addClass("invalid");
      document.getElementById('logo').value = null;
      fotografia = null;
      metlogo = null;
    } else {
      $(document.getElementById('txt_logo')).removeClass("invalid");
    }
    img = new Image();
    img.onload = function() {
      if (this.width != this.height) {
        Alert("La imagen debe ser cuadrada","red");
        document.getElementById('txt_logo').value = "";
        document.getElementById('logo').value = null;
        $(document.getElementById('txt_logo')).addClass("invalid");
        logotipo = null;
        metlogo = null;
      } else {
        $(document.getElementById('txt_logo')).removeClass("invalid");
      }
    };
    img.src = _URL.createObjectURL(logotipo);
  }
}

function optNull(id,txt) {
  var sel = document.getElementById(id);
  var opt = document.createElement('OPTION');
  opt.text = txt;
  opt.value = 'empty';
  opt.setAttribute("disabled","");
  opt.setAttribute("selected","");
  document.getElementById(id).appendChild(opt);
  $('select').material_select();
}

function modAcc(id) {
  if (validaCta(id) == 1) {
    suRe('view');
  } else {
    return;
  }
}

function validaCta(key) {
  var list = document.getElementById('modal1');
  var inp = list.querySelectorAll('INPUT');
  var sel = list.querySelectorAll('SELECT');
  var opt = sel[1].querySelectorAll('OPTION');
  var obg = new Array(), may = new Array(), data = new Array();
  var inc = 0, inv = 0, op = 0;
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

  if (document.getElementById('old_local')) {
    local = ["same"];
    op = 1;
  } else {
    local = [];
    for (var i = 0; i < opt.length; i++) {
      if (opt[i].selected == true && opt[i].value != "empty") {
        local[op] = opt[i].value;
        op++;
      }
    }
  }

  if (sel[0].value == "empty") {
    $(inp[5]).addClass("invalid");
    Alert("Selecciona un Pais","red");
    return 0;
  } else {
    data[data.length] = sel[0].value;
    $(inp[5]).removeClass("invalid");
  }

  if (op == 0) {
    $(inp[6]).addClass("invalid");
    Alert("Selecciona las Localidades","red");
    return 0;
  } else {
    $(inp[6]).removeClass("invalid");
  }

  if (inc != 0) {
    cloud = null;
    Alert("Campos vacios","red");
    return 0;
  } else {
    if (logotipo != null) {
      data[data.length] = "null";
      data[data.length] = key;
      cloud = data;
      return 1;
    } else {
      data[data.length] = "same";
      data[data.length] = key;
      cloud = data;
      if (key == "new") {
        $(inp[4]).addClass("invalid");
        Alert("La imagen del logotipo es obligatoria","blue");
        return 0;
      } else {
        $(inp[4]).removeClass("invalid");
      }
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

function mayNot() {
  $('#modal1').modal('close');
  $('#modal2').modal('close');
  fotografia = null;
  logotipo = null;
  cloud = null;
  local = null;
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
  if (type == 'new') {
    newAccount();
  } else if (type == 'view') {
    modifyAcc();
  } else if (type == 'kill') {
    killAccount();
  }
}

function modifyAcc() {
  db.ref('Cuenta').orderByKey().equalTo(cloud[5]).on("child_added",function (snapshot) {
    if (cloud[4] == "same") {
      cloud[4] = snapshot.val().Logotipo;
      getLocal(snapshot);
      endMod();
    } else if (cloud[4] == "null") {
      storageRef.child('images/logos/' + "'"+cloud[5]+"'").put(logotipo, metlogo).then(function(snap) {
        cloud[4] = snap.metadata.downloadURLs[0];
        getLocal(snapshot);
        endMod();
      });
    }
  });
}

function getLocal(snapshot) {
  if (local[0] == "same") {
    for (var i = 0; i < snapshot.val().Localidades.length; i++) {
      local[i] = snapshot.val().Localidades[i];
    }
  }
}

function endMod() {
  db.ref('Cuenta').child(cloud[5]).set({
    NComercial: cloud[0],
    RSocial: cloud[1],
    Identidad: cloud[2],
    Pais: cloud[3],
    Localidades: local,
    tipo: "Empresa Positive",
    Logotipo: cloud[4]
  });
  cloud = null;
  local = [];
  logotipo = null;
  Alert("Exito","green");
  $('#modal1').modal('close');
}

function newAcc() {
  if (validaCta('new') == 1 && validaUsr() == 1) {
    suRe('new');
  }
}

function validaUsr() {
  var cont = document.getElementById('user');
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
    $(inp[4]).addClass("invalid");
    $(inp[3]).addClass("invalid");
    Alert("Indica el genero","red");
    inc++;
  } else {
    if (inp[3].checked == true) {
      data[data.length] = "male";
    } else if (inp[4].checked == true) {
      data[data.length] = "female";
    }
    $(inp[4]).removeClass("invalid");
    $(inp[3]).removeClass("invalid");
  }

  if (inc != 0) {
    Alert("Campos vacios","red");
    return 0;
  } else {
    if (fotografia != null) {
      data[data.length] = "null";
      cloud_user = data;
      return 1;
    } else {
      if (data[9] == "male") {
        data[data.length] = male;
      } else {
        data[data.length] = female;
      }
    }
    cloud_user = data;
    return 1;
  }
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

function newAccount() {
  var nw = db.ref('Cuenta').push();
  var a = document.getElementById('user');
  var inp = a.querySelectorAll('INPUT');

  var promise = secondaryApp.auth().createUserWithEmailAndPassword(inp[7].value,inp[8].value).then(function(user) {
    cloud_user[cloud_user.length] = inp[7].value;
    cloud_user[cloud_user.length] = inp[8].value;
    if ( cloud_user[4] == 'null') {
      storageRef.child('images/usuarios/' + "'"+user.uid+"'").put(fotografia, metfoto).then(function(snapshot) {
        cloud_user[4] = snapshot.metadata.downloadURLs[0];
        storageRef.child('images/logos/' + "'"+nw.key+"'").put(logotipo, metlogo).then(function(snap) {
          cloud[4] = snap.metadata.downloadURLs[0];
          saveNew(nw,user.uid);
        });
      });
    } else {
      storageRef.child('images/logos/' + "'"+nw.key+"'").put(logotipo, metlogo).then(function(snap) {
        cloud[4] = snap.metadata.downloadURLs[0];
        saveNew(nw,user.uid);
      });
    }
  });
  secondaryApp.auth().signOut();
  promise.catch(e=>__Error(e.code));
}

function __Error(error) {
  var cont = document.getElementById('user');
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

function saveNew(nw,uid) {
  nw.set({
    NComercial: cloud[0],
    RSocial: cloud[1],
    Identidad: cloud[2],
    Pais: cloud[3],
    Localidades: local,
    Logotipo: cloud[4],
    tipo: "Empresa Positive"
  });

  db.ref('Usuarios').child(uid).set({
    Nombre: cloud_user[0],
    ApPat: cloud_user[1],
    ApMat: cloud_user[2],
    Genero: cloud_user[3],
    Foto: cloud_user[4],
    Empresa: nw.key,
    email: cloud_user[5],
    pass: cloud_user[6],
    Tipo: 'company'
  });

  cloud_user = null;
  cloud = null;
  fotografia = null;
  logotipo = null;
  local = [];
  Alert("Exito","green");
  $('#modal1').modal('close');
  $('#modal2').modal('close');
}

function killAcc(id) {
  cloud = id;
  suRe('kill');
}

function killAccount() {
  db.ref('Cuenta').child(cloud).set(null);

  db.ref('Usuarios').orderByChild('Empresa').equalTo(cloud).on('child_added',function (snapshot) {
    db.ref('Usuarios').child(user.uid).child('Tipo').set('inactivo');
  });

  db.ref('Personas').orderByChild('Empresa').equalTo(cloud).on('child_added',function (snapshot) {
    db.ref('Personas').child(snapshot.key).set(null);
  });

  document.getElementById('content-wrapper').removeChild(document.getElementById('id['+cloud+']'));

  cloud_user = null;
  cloud = null;
  fotografia = null;
  logotipo = null;
  local = [];
  Alert("Cuenta eliminada","green");
  $('#modal1').modal('close');
  $('#modal2').modal('close');
}

db.ref('Cuenta').on("child_changed",function (snapshot) {
  var local = snapshot.val().Localidades[0];
  var ent = cmfEnt(snapshot.val().tipo);
  var ide = notNull(snapshot.val().Identidad);

  for (var i = 1; i < snapshot.val().Localidades.length; i++) {
    local = local+", "+snapshot.val().Localidades[i];
  }

    var array = {
      id: snapshot.key,
      image: snapshot.val().Logotipo,
      name: snapshot.val().NComercial,
      social: snapshot.val().RSocial,
      ide: ide,
      pais: snapshot.val().Pais,
      type: snapshot.val().tipo,
      entidad: ent,
      asign: snapshot.val().m_op,
      loc: local
    };

    var list = document.getElementById('id['+snapshot.key+']');
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }

    dust.render('cont', {array} , function( error, output ) {
      if (error) {
        $('#content-wrapper').append("Error");
      } else {
        $(list).append(output);
        $('.collapsible').collapsible();
        $('.materialboxed').materialbox();
        $('#'+snapshot.key).click(function () {
          $('#modal1').modal('open');
          modCta(snapshot.key);
        });
      }
    });
});
