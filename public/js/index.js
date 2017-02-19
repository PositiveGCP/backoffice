"use strict";

// Initialize Firebase
var appConfig = {
  apiKey: "AIzaSyAT7spVMFGob7q6Q1UJCaMi6RvGoMBgcAc",
  authDomain: "prototipo1-8e37a.firebaseapp.com",
  databaseURL: "https://prototipo1-8e37a.firebaseio.com",
  storageBucket: "prototipo1-8e37a.appspot.com",
  messagingSenderId: "856846236373"
};
firebase.initializeApp( appConfig );

const db = firebase.database();
const usr = db.ref('Usuarios');
const auth = firebase.auth();
var info;
var uid;

$(document).ready(function(){
  $('select').material_select();
  $('.materialboxed').materialbox();
});
