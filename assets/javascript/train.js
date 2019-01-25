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

        var trainName = $("#trainName").val();
        var thedestination = $("#tdestination").val();
        var firstTrain = moment($("#firstTrainTime").val(), "HH:mm").subtract(10, "years").format("X");
        var thefrequency = $("#frequencyData").val();
    

        var newTrainSchedule = {
            train: trainName,
            destination: thedestination,
            firstTrainTime: firstTrain,
            frequencyData: thefrequency,
        };

        database.ref().push(newTrainSchedule);

        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrainTime").val("");
        $("#frequencyData").val("");
    });

        database.ref().on("child_added", function (childsnapshot) {
            
            var trainName = childsnapshot.val().train;
            var theDestination = childsnapshot.val().destination;
            var firstTrain = childsnapshot.val().firstTrainData;
            var thefrequency = childsnapshot.val().frequencyData;
            var theTimeInput = childsnapshot.val().firstTrainData;

                console.log('trainName from firebase', trainName);

                var theRemainder = moment().diff(moment.unix(parseInt(firstTrain)), "minutes") % frequencyData;
                var theMinutes = frequencyData - theRemainder;
                var theArrival = moment().add(theMinutes, "m").format("hh:mm A");


// New submitted info. own its new row
            var newRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(theDestination),
                $("<td>").text(thefrequency),
                $("<td>").text(theArrival),
                $("<td>").text(theMinutes),
                $("<td>").append('<i class="fa fa-trash" aria-hidden="true"></i>') 
            );
            
            $("tbody").append(newRow);
        });
});