"use strict";

$(document).ready(function(){
  $('select').material_select();
});

$('.datepicker').pickadate({
  selectMonths: true,
  selectYears: 15,
  format: 'dd/mm/yyyy',
  formatSubmit: 'yyyy/mm/dd',
  closeOnSelect: true,
  closeOnClear: true
});


$('#register-request').click(function() {
  registerProcess(); //  Función de inicio de sesión
}); // #login-request.click

function registerProcess () {

  var registro = {},
      errors = 0, temp, key;

  var nombre    = $('#first-name-input').val(), // nombre
      apellido  = $('#last-name-input').val(), //apellido
      empresa   = $('#company-input').val(), //empresa
      email     = $('#email-input').val(), //email
      telefono  = $('#tel-number-input').val(), //telefono
      fecha     = $('#date-input').val(),  //fecha
      sec_eco   = $('#eco-sector-input').val(), // sector economico
      rep       = $('#representation-input').val(); // representacion
      accept    = $('#accept').is(":checked");

  registro = {
    nombre, apellido, empresa, email, telefono, fecha, sec_eco, rep
  };

  for ( key in registro ) {
    temp = registro[ key ];
    if (key === "sec_eco" || key === "rep") {
      if ( temp == "" || temp == null) {
        envMode == "development" ? crearAlerta( "Vacío en " + key, "rounded red" ) : temp ;
        errors++
      }
    } // Revisar sector económico y representacion
    else{
      temp = stringCheck( registro[key] );
      if ( key === "empresa" || key === "nombre" || key === "apellido") {
        temp  = registro[key];
        if ( temp == "" || temp == null || temp[0] == " " ) {
          errors++;
        }
      } // Revisar nombres, apellido y empresa
      else if ( key === "fecha" ) {
        temp = stringCheck( registro[key], true);
        if ( registro[key] != temp ) {
          envMode == "development" ? crearAlerta( temp + " en " + key, "rounded red" ) : temp ;
          errors++;
        }
      } // Revisar fecha
      else if ( registro[key] != temp ) {
        envMode == "development" ? crearAlerta( temp + " en " + key, "rounded red" ) : temp ;
        errors++;
      } // Revisar los demás
    }
  }

  if ( errors > 0 ) {
    crearAlerta("El formulario no está completo.","rounded red");
  }
  else {
    // Verificar que se hayan cedido los derechos
    if ( accept == true ) {
      $.ajax({
          type: 'post',
          url: '/register-send-mail',
          data: JSON.stringify( registro ),
          contentType: "application/json; charset=utf-8",
          traditional: true,
          success: function (data) {
            crearAlerta(data,"rounded green");
          },
          error: function( req, xhr, err ){
            crearAlerta("Ocurrió un error","rounded black");
            console.log( xhr, err );
          }
      });


      $('#first-name-input').val(""); // nombre
      $('#last-name-input').val(""); //apellido
      $('#company-input').val(""); //empresa
      $('#email-input').val(""); //email
      $('#tel-number-input').val(""); //telefono
      $('#date-input').val("");  //fecha
      $('#eco-sector-input').val("");
      $('#eco-sector-input').find('option[value="0"]').prop('selected', true); // sector economico
      $('#eco-sector-input').material_select();
      $('#representation-input').val("");
      $('#representation-input').find('option[value="0"]').prop('selected', true); // representacion
      $('#representation-input').material_select();
      $('#accept').prop('checked',false);

    }
    else {
      crearAlerta("No se aceptaron los términos","rounded black");
    }

  }

}
