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

function infoPerm() {
  if (info.Tipo == "superuser") {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      getArray(snapshot);
    });
  } else if (info.Tipo == 'company') {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().entidad) {
        for (var i = 0; i < snapshot.val().entidad.length; i++) {
          if (snapshot.val().entidad[i] == info.Empresa) {
            getArray(snapshot);
          }
        }
      }
    });
    db.ref('Cuenta').orderByKey().equalTo(info.Empresa).on("child_added",function (snapshot) {
      getArray(snapshot);
    })
  } else if (info.Tipo == 'normal') {
    db.ref('Cuenta').orderByKey().equalTo(info.Empresa).on("child_added",function (snapshot) {
      getArray(snapshot);
    });
  } else if (info.Tipo == 'partner') {
    db.ref('Cuenta').on("child_added",function (snapshot) {
      if (snapshot.val().partner) {
        for (var i = 0; i < snapshot.val().partner.length; i++) {
          if (snapshot.val().partner[i] == uid) {
            getArray(snapshot);
          }
        }
      }
    });
  }
}

function getArray(snapshot) {

    var array = {
      id: snapshot.key,
      image: snapshot.val().Logotipo,
      name: snapshot.val().NComercial,
      social: snapshot.val().RSocial,
      pais: snapshot.val().Pais,
      type: snapshot.val().tipo,
    };

    showInfo(array);
}

db.ref('Transfer').on("child_changed",function (snapshot) {
  averaGe(snapshot.val().key_empresa);
});

function averaGe(key) {
  var div = document.getElementById('id['+key+']');
  var li = div.querySelectorAll('H6');
  var list = li[li.length-2];

  var res = 0;
  var i = 0;
  var prom = 0;

  db.ref('Transfer').on("child_added",function (snapshot) {
    if (snapshot.val().key_empresa == key) {
      prom = 0;
      while (list.hasChildNodes()) {  
          list.removeChild(list.firstChild);
      }
        i++;
        res = res + snapshot.val().resultado;
        prom = res/i;

        list.appendChild(document.createTextNode('Promedio: '+prom));
    }
  });
}

function notNull(val) {
  if (val == "null") {
    return "";
  } else {
    return val;
  }
}

function showInfo(array) {
  dust.render('inc', {array} , function( error, output ) {
    if (error) {
      $('#content-wrapper').append("Error");
    } else {
      $('#content-wrapper').append(output);
      averaGe(array.id);
      $('.materialboxed').materialbox();
      $('#'+array.id).click(function () {
        var list = document.getElementById("modal3");
        while (list.hasChildNodes()) {  
          list.removeChild(list.firstChild);
        }
        shoTrnsfr(array.id);
        $('#modal-trn').modal('open');
      });
    }
  });
}

function shoTrnsfr(id) {
  db.ref('Transfer').on("child_added",function (snapshot) {
    if (snapshot.val().status == 'resultado' && snapshot.val().key_empresa == id) {
      db.ref('Cuenta').orderByKey().equalTo(snapshot.val().key_empresa).on("child_added",function (snap) {
        db.ref('Usuarios').orderByKey().equalTo(snapshot.val().key_usuario).on("child_added",function (snp) {
          db.ref('Personas').orderByKey().equalTo(snapshot.val().key_persona).on("child_added",function (sn) {
            var array = {
              key: snapshot.key,
              image: sn.val().Fotografia,
              name: sn.val().Nombre,
              appa: sn.val().ApPat,
              date: snapshot.val().date,
              inc: snap.val().NComercial,
              eval: snp.val().Nombre,
              res: snapshot.val().resultado,
              visto: snapshot.val().visto,
              stat: snapshot.val().status
            };
            show(array);
          });
        });
      });
    }
  });
}

function show(array) {
  dust.render('inf', {array} , function( error, output ) {
    if (error) {
      $('#modal3').append("Error");
    } else {
      $('#modal3').append(output);
      $('.materialboxed').materialbox();
      change(array.key);
    }
  });
}

function change(id) {
  db.ref('Transfer').child(id).child('visto').set(true);
}
