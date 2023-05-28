const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data

app.get("/numericalInput", (req, res) => {
  var numericalInput = 70; // Replace with your desired numerical input

  res.json({
    numericalInput: numericalInput,
  });
});

let buttonClicks = []; // Array to store button click data
app.post("/buttonClickPost", (req, res) => {
  const { direction } = req.body; // Extract the direction from the request body
  console.log("Button clicked:", direction); // Log the clicked direction

  buttonClicks.push(direction); // Add the clicked direction to the buttonClicks array

  res.sendStatus(200); // Send a success status code (200)
});

app.get("/buttonClicks", (req, res) => {
  res.json({
    buttonClicks: buttonClicks, // Return the buttonClicks array as JSON response
  });
});

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
