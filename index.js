const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data

//new variables 
let iterations = 0
let current_coordinates = { };
let coordinates = []; // Empty array for coordinates
let walls_plotted = []; 
let NewWall = false;
let wall_detection = false;
let maze_complete = false;
let roverCoordinates = null;
let roverWallDetection = null; 
let wallCoordinate = null;
let constant = null;
var modeType;




function plot(coordinates, mode) {
  //================FOR CLIENT LAPTOP================================================
//GET REQUEST (Client Laptop)======================================================
app.get("/numericalInput", (req, res) => {
  var numericalInput = 70; // Replace with your desired numerical input

  res.json({
    numericalInput: numericalInput,
  });
});

//POST REQUEST (Client Laptop)======================================================
let mvmtClicks = []; // Array to store button click data
app.post("/mvmtClickPost", (req, res) => {
  const { direction } = req.body; // Extract the direction from the request body
  console.log("Button clicked:", direction); // Log the clicked direction

  mvmtClicks.push(direction); // Add the clicked direction to the buttonClicks array

  setTimeout(function(){
    const removedElement = mvmtClicks.pop();
    //console.log(removedElement);
    //console.log("Delayed by 2 seconds");
  }, 5000);
  
  res.sendStatus(200); // Send a success status code (200)
});

app.get("/mvmtClicks", (req, res) => {
  res.json({
    mvmtClicks: mvmtClicks, // Return the buttonClicks array as JSON response
  });
});

var modeType;
app.post("/setManualMode", (req, res) => {
  const { mode } = req.body; // Extract the mode from the request body

  modeType = mode; // Update the manual mode flag
  console.log("Mode:", mode);
  res.sendStatus(200); // Send a success status code (200)
});

}

function serverAlgorithm(current_coordinates){
  let right = "right"; // Declare and assign a value to the right variable

  return right; // Use the right variable in your code
}


  //================FOR ESP32=========================================================
    //POST REQUEST (ESP32)==============================================================

  app.post("/roverCoordinatePost", (req, res) => {
    const { received_coordinates } = req.body; // Extract the coordinates from the request body
    console.log("Received coordinates:", received_coordinates); // Log the received coordinates // You can perform any necessary processing with the coordinates here
    roverCoordinates = received_coordinates;   
    // Check if the maze is complete based on the received coordinates
    // Set the mazeComplete flag accordingly
    res.sendStatus(200); // Send a success status code (200)
  });

  
  coordinates = coordinates.concat(current_coordinates);

  app.post("/wallDetection", (req, res) => {
    const {recieved_walldetection } = req.body; // Extract the coordinates from the request body
    console.log("Received wall detection:", recieved_walldetection); // Log the received coordinates // You can perform any necessary processing with the coordinates here
    roverWallDetection = recieved_walldetection;   
    res.sendStatus(200); // Send a success status code (200)
  });

  wall_detection = roverWallDetection

  wallCoordinate = current_coordinates + constant

  if (wall_detection && !walls_plotted.includes(wallCoordinate)) {
    walls_plotted = walls_plotted.concat(wallCoordinate);
    NewWall = true;
    //GET REQUEST (ESP32)===============================================================
    app.get("/", (req, res) => {
      // Send left_following along with nextDirection
        res.json({newWall: NewWall });
        console.log(NewWall);
    });

    plot(wallCoordinate, modeType)
  }
  else{
    NewWall = false;
    plot(wallCoordinate, modeType)
    app.get("/", (req, res) => {
      // Send left_following along with nextDirection
        res.json({newWall: NewWall });
        console.log(NewWall);
    });

    direction = serverAlgorithm(current_coordinates)

    app.get("/", (req, res) => {
      // Send left_following along with nextDirection
        res.json({Direction: direction });
        console.log(direction);
    });
  }


  //app.get("/roverCoordinates", (req, res) => {
  //  res.json({
  //    roverCoordinates: roverCoordinates,
  //  });


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Start the server and log the port it's listening on
});