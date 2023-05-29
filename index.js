const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data

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
  }, 2000);
  
  res.sendStatus(200); // Send a success status code (200)
});

app.get("/mvmtClicks", (req, res) => {
  res.json({
    mvmtClicks: mvmtClicks, // Return the buttonClicks array as JSON response
  });
});

app.post("/setManualMode", (req, res) => {
  const { mode } = req.body; // Extract the mode from the request body

  manualMode = mode; // Update the manual mode flag
  console.log("Mode:", mode);
  res.sendStatus(200); // Send a success status code (200)
});


//================FOR ESP32=========================================================
//GET REQUEST (ESP32)===============================================================
app.get("/numericalInputESP", (req, res) => {
  var numericalInputESP = 70; // Replace with your desired numerical input

  res.json({
    numericalInputESP: numericalInputESP,
  });
});

//POST REQUEST (ESP32)==============================================================
let roverCoordinates = null
app.post("/roverCoordinatePost", (req, res) => {
  const { coordinates } = req.body; // Extract the coordinates from the request body
  console.log("Received coordinates:", coordinates); // Log the received coordinates // You can perform any necessary processing with the coordinates here

  roverCoordinates = coordinates
  
  res.sendStatus(200); // Send a success status code (200)
});

app.get("/roverCoordinates", (req, res) => {

  res.json({
    roverCoordinates: roverCoordinates,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Start the server and log the port it's listening on
});
