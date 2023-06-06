const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data

//new variables 
let coordinates = []; // Empty array for coordinates
let walls_plotted = []; 
let NewWall = "false";
let wall_detection = "false";
let maze_complete = "false";
let wallCoordinate = null;
let constant = 5;
let x = 2;
let y = 3;
var modeType;
let mvmtClicks = []; // Array to store button click data


function plot(){
      //================FOR CLIENT LAPTOP================================================
      console.log(plot);
    //GET REQUEST (Client Laptop)======================================================
    app.get("/numericalInput", (req, res) => {
      // Generate random coordinates and add them to the array
        coordinates.push({ x, y }); // Add the coordinate to the array
        console.log({ x, y });
        console.log(plot);
      
      res.json({ coordinates }); // Send the coordinates array as a single response
    });

    //POST REQUEST (Client Laptop)======================================================
    app.post("/mvmtClickPost", (req, res) => {
      const { direction } = req.body; // Extract the direction from the request body
      console.log("Button clicked:", direction); // Log the clicked direction

      mvmtClicks.unshift(direction); // Add the clicked direction to the buttonClicks array
      console.log(mvmtClicks);
      setTimeout(function(){
        //const removedElement = mvmtClicks.pop();
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


    app.post("/setManualMode", (req, res) => {
      const { mode } = req.body; // Extract the mode from the request body

      modeType = mode; // Update the manual mode flag
      console.log("Mode:", mode);
      res.sendStatus(200); // Send a success status code (200)
    });
  }


function serverAlgorithm(received_coordinates){
  let right = "right"; // Declare and assign a value to the right variable

  return right; // Use the right variable in your code
}

  //================FOR ESP32=========================================================
    //POST REQUEST (ESP32)==============================================================

  app.post("/roverCoordinatePost", (req, res) => {

    const { received_coordinates } = req.body; // Extract the coordinates from the request body
    console.log("Received coordinates:", received_coordinates); // Log the received coordinates // You can perform any necessary processing with the coordinates here
    //coordinates.push(received_coordinates);
    //console.log("Updated Array of coordinates:", coordinates);
    
    let nums;
    if (typeof received_coordinates === 'string') {
      nums = received_coordinates.slice(1, -1).split(', ').map(Number);
    } else if (Array.isArray(received_coordinates)) {
      nums = received_coordinates.map(Number);
    } else {
      console.log("Invalid data type for received_coordinates.");
    }    
    x = nums[0];
    y = nums[1];
    //const nums = received_coordinates.slice(1, -1).split(',').map(Number);
    const xwall = nums[0] + constant;
    const ywall = nums[1] + constant;
    wallCoordinate = `[${xwall},${ywall}]`;
    console.log(wallCoordinate); // Output: [xwall,ywall]
    //current_coordinates = received_coordinates.split(",").map(coord => parseInt(coord.trim()));
    //wallCoordinate = current_coordinates.map(coord => coord + constant);
    console.log("wallCoordinate:",wallCoordinate);
    res.sendStatus(200); // Send a success status code (200)
  });


  app.post("/wallDetection", (req, res) => {
    const {received_walldetection } = req.body; // Extract the coordinates from the request body
    console.log("Received wall detection:", received_walldetection); // Log the received coordinates // You can perform any necessary processing with the coordinates here
    wall_detection = received_walldetection;   
    res.sendStatus(200); // Send a success status code (200)
  });


  app.get("/nextDirection", (req, res) => {
    if (wall_detection == "true" && !walls_plotted.includes(wallCoordinate)) {
      walls_plotted.push(wallCoordinate);
      NewWall = "true";
    //  plot(wallCoordinate, modeType);
    } else {
      NewWall = "false";
      //direction = serverAlgorithm(current_coordinates);
      direction = mvmtClicks.pop()
      res.json({ Direction: direction });
      console.log('direction:', direction);
      plot()
    //  plot(x,y, modeType);
    }
  });
  
  app.get("/newWall", (req, res) => {
    res.json({ newWall: NewWall });
    console.log('NewWall:', NewWall);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Start the server and log the port it's listening on
});

  //app.get("/roverCoordinates", (req, res) => {
  //  res.json({
  //    roverCoordinates: roverCoordinates,
  //  });