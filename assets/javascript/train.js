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
        var tdestination = $("#destination").val();
        var trainTime = moment($("#trainTime").val(), "HH:mm").subtract(10, "years").format("X");
        var tfrequency = $("#frequency").val();

        console.log(trainName);
        console.log(tdestination);
        console.log(trainTime);
        console.log(tfrequency);
        

        var newTrainSchedule = {
            train: trainName,
            destination: tdestination,
            firstTrainTime: trainTime,
            frequencyData: tfrequency,
        };

        database.ref().push(newTrainSchedule);

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequency").val("");
    });

        database.ref().on("child_added", function (childsnapshot) {
            
            var trainName = childsnapshot.val().train;
            var tdestination = childsnapshot.val().destination;
            var trainTime = childsnapshot.val().firstTrainTimeData;
            var tfrequency = childsnapshot.val().frequencyData;
            var theTimeInput = childsnapshot.val().firstTrainTimeData;

                console.log('trainName from firebase', trainName);
                console.log(tdestination);
                console.log(trainTime);
                console.log(tfrequency);
                console.log(theTimeInput);

                var remainderTime = moment().diff(moment.unix(parseInt(trainTime)), "minutes") % tfrequency;
                var trainMinutes = tfrequency - remainderTime;
                var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");



            var newRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(tdestination),
                $("<td>").text(tfrequency),
                $("<td>").text(trainArrival),
                $("<td>").text(trainMinutes),
                $("<td>").append('<i class="fa fa-trash" aria-hidden="true"></i>') 
            );
            
            $("tbody").append(newRow);
        });
});