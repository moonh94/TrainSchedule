
var config = {
    apiKey: "AIzaSyAZu6P6oO-2fq2qB6FQGzwsHIzxPMg3FmE",
    authDomain: "train-schedule-9c55c.firebaseapp.com",
    databaseURL: "https://train-schedule-9c55c.firebaseio.com",
    projectId: "train-schedule-9c55c",
    storageBucket: "train-schedule-9c55c.appspot.com",
    messagingSenderId: "107976499820"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit").on("click", function(event) {
      event.preventDefault();

      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTime =$("#time-input").val().trim();
      var frequency =$("#frequency-input").val().trim();
      var currentTime = moment();
        console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm tt"));

      var newTrain = {
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
      };
    
      database.ref().push(newTrain);

      $("#name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("")
      $("#time-input").val("");
  
      
    
  }); 

database.ref().on("child_added", function(snapshot) {

    var name = snapshot.val().name;
    var destination =snapshot.val().destination;
    var firstTime = snapshot.val().firstTime;
    var frequency =snapshot.val().frequency;

  
var firstTrain=moment(firstTime, "hh:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTrain), "minutes");
var remainder = diffTime % frequency;
var minAway = frequency-remainder;
var nextTrain = moment().add(minAway,"minutes");
nextTrain=moment(nextTrain).format("hh:mm");

console.log("first train: " + moment(firstTime, "hh:mm").subtract(1, "years"));
console.log(moment(firstTrain, "hh:mm").subtract(1, "day").format("X"));
console.log(diffTime);
console.log(remainder);
console.log(minAway);
console.log(nextTrain);

$("#trainInfo> tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>");
});
function refreshPage(){
  window.location.reload();
} 