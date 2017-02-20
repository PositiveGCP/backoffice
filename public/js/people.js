firebase.auth().onAuthStateChanged(function( user ) {
  if ( user ) {
    $('#menu').removeClass('scale-out');
    $('#menu').addClass('scale-in');
    usr.orderByKey().equalTo(user.uid).once('value').then(function (snapshot) {//
      info = snapshot.val()[user.uid];
      uid = user.uid;
      __infoItem();
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

function __infoItem() {
  if ( info.Tipo == "superuser" ) {
    db.ref('Personas').orderByChild('ApPat').on("child_added", function (snapshot) {
      ItemEmp(snapshot);
    });
  }
}

function ItemEmp(snapshot) {
  var mat = notNull(snapshot.val().ApMat);
  var ema = notNull(snapshot.val().email);
  var tel = notNull(snapshot.val().Telefono);
  var pro = aVerage();

  db.ref('Cuenta').orderByKey().equalTo(snapshot.val().Empresa).once('value',function (snap) {
    var emp = snap.val()[snapshot.val().Empresa].NComercial;
    itemData(snapshot,emp,mat,ema,tel,pro);
  });
}
//Cambiar platilla con condicional
function itemData(snapshot,emp,mat,ema,tel,pro) {//Definir privilegios de usuario
  var array = {
    id: snapshot.key,
    image: snapshot.val().Fotografia,
    name: snapshot.val().Nombre,
    appat: snapshot.val().ApPat,
    apmat: " "+mat,
    email: ema,
    tel: tel,
    disp: snapshot.val().Disponibilidad,
    puesto: snapshot.val().Puesto,//Regresa a ser un texto, cambiar a input
    prom: pro,
    last: snapshot.val().lastDate,
    empresa: emp
  };

  dust.render('person', {array} , function( error, output ) {
    if (error) {
      $('#content-wrapper').append("Error");
    } else {
      $('#content-wrapper').append(output);
      $('.materialboxed').materialbox();
      $('#'+snapshot.key).click(function () {
        $('#modal1').modal('open');
      });
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

//Posterior modificacion (no me olvides)
function aVerage() {
  return 0;
}
