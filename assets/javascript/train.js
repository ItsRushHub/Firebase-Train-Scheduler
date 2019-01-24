$(document).ready(function(e){
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


// Make the submit button work for the submitted form info.
    $("#submit").on("click", function(e){
        e.preventDefault();

        var trainName = $("#trainName").val().trim;
        var destination = $("#destination").val().trim;
        var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency").val();

        console.log(trainName);
        console.log(destination);
        console.log(trainTime);
        console.log(frequency);
        

        var newTrainSchedule = {
            train: trainName,
            destination: destination,
            firstTrain: trainTime,
            frequency: frequency
        };

        database.ref().push(newTrainSchedule);

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");
    });

        database.ref().on("child_added", function (childsnapshot,) {
            
            var trainName = childsnapshot.val().train;
            var destination = childsnapshot.val().destination;
            var trainTime = childsnapshot.val().firstTrain;
            var frequency = childsnapshot.val().frequency;

                console.log('trainName from firebase', trainName);
                console.log(destination)
                console.log(trainTime)
                console.log(frequency)

                var tRemainder = moment().diff(moment.unix(parseInt(firstTrain)), "minutes") % frequency;
                var tMinutes = frequency - tRemainder;
                var nextArrival = moment().add(tMinutes, "m").format("hh:mm A");



            var newRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(destination),
                $("<td>").text(frequency),
                $("<td>").text(tRemainder),
                $("<td>").text(nextArrival),
                $("<td>").text(tMinutes),

                $("<td>").append('<i class="fa fa-trash" aria-hidden="true"></i>') 
            );
            
            $("#tbody").append(newRow);

            // console.log(newRow);

            

        });
});