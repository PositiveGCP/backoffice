$('#kickout').click(function(e){
  e.preventDefault();
  firebase.auth().signOut().then(function() {
    window.location.href = "/login";
  });
});
