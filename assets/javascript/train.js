$(document).ready(function(){
    // Initialize Firebase
    var config = {
      apiKey: "svAHRzuiCCv7R8Ek8WHJIt8nphDzAa1R",
      authDomain: "fir-inclass-project.firebaseapp.com",
      databaseURL: "https://fir-inclass-project.firebaseio.com",
      projectId: "fir-inclass-project",
      storageBucket: "fir-inclass-project.appspot.com",
      messagingSenderId: "83150528120"
    };

    firebase.initializeApp(config);
  
    var database = firebase.database();


    $("#submit").on("click", function(e){
        e.preventDefault();

        

    });







});