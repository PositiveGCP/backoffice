"use strict";

// Initialize Firebase
var appConfig = {
  apiKey: "AIzaSyAT7spVMFGob7q6Q1UJCaMi6RvGoMBgcAc",
  authDomain: "prototipo1-8e37a.firebaseapp.com",
  databaseURL: "https://prototipo1-8e37a.firebaseio.com",
  storageBucket: "prototipo1-8e37a.appspot.com",
  messagingSenderId: "856846236373"
};

const pstv  = firebase.initializeApp( appConfig );
const sApp  = firebase.initializeApp( appConfig, "Secondary");

const db    = pstv.database();
const auth  = firebase.auth();
const storageRef = firebase.storage().ref();

// Dedicated variables for the user
var info;
var uid;

// Afecta a toda la aplicación en cuanto a tener una versión en desarrollo y otra en producción
const envMode = "development";

$(document).ready(function(){
  $('select').material_select();
  $('.materialboxed').materialbox();
  $('.modal').modal();
});

function cerrarSesion(){
  firebase.auth().signOut().then(function() {
    window.location.href = "/login";
  });
}
