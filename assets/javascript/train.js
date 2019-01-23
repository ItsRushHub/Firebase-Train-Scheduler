$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCtVrwzWDQ0ggP9TNdeicRAezpJ3LZfoWc",
        authDomain: "fir-train-scheduler-c2bb0.firebaseapp.com",
        databaseURL: "https://fir-train-scheduler-c2bb0.firebaseio.com",
        projectId: "fir-train-scheduler-c2bb0",
        storageBucket: "fir-train-scheduler-c2bb0.appspot.com",
        messagingSenderId: "666379577815"
    };

    firebase.initializeApp(config);
  
    var database = firebase.database();

    console.log(database);

// Make the submit button work for the submitted form info.
    $("#submit").on("click", function(e){
        e.preventDefault();

        var trainName = $("#trainName").val();
        var destination = $("#destination").val();
        var trainTime = $("#trainTime").val();
        var frequency = $("#frequency").val();

        var newTrainSchedule = {
            train: trainName,
            destination: destination,
            nextArrival: trainTime,
            minutesAway: frequency
        }

        database.ref().push(newTrainSchedule);

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");
    });

        database.ref().on("child_added", function(childsnapshot){
            var trainName = childsnapshot.val().train;
            var destination = childsnapshot.val().destination;
            var trainTime = childsnapshot.val().nextArrival;
            var frequency = childsnapshot.val().minutesAway;


        
            $("tbody").append(
                `<tr> 
                    <td>${trainName}</td>
                    <td>${destination}</td>
                    <td>${trainTime}</td>
                    <td>${frequency}</td>
                </tr>`)

                console.log(tbody);
        });









});