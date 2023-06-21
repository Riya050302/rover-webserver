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
let direction = null; // Initialize the direction variable
let recalibrate = [];
let stopLeft = [];
let complete = [];
let beacon = [];
let recalibrate_var = "";
let beacon_var = "";
let stopLeft_var = "";
let recalibrate_output = "";
let complete_var = "";



function plot(){
      //================FOR CLIENT LAPTOP================================================
    //console.log(plot);
    //GET REQUEST (Client Laptop)======================================================
    app.get("/numericalInput", (req, res) => {
      // Generate random coordinates and add them to the array
        coordinates.push({ x, y }); // Add the coordinate to the array
        console.log([ x, y ]);
    //    console.log(plot);
      
      res.json({ coordinates }); // Send the coordinates array as a single response
    });

    //POST REQUEST (Client Laptop)======================================================
    app.post("/mvmtClickPost", (req, res) => {
      const { direction } = req.body; // Extract the direction from the request body
      //console.log("Button clicked:", direction); // Log the clicked direction

      mvmtClicks.unshift(direction); // Add the clicked direction to the buttonClicks array
      //console.log(mvmtClicks);
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

    app.get("/recalibrateOutput", (req, res) => {
      //console.log("Sent Recalibrate output:", recalibrate_output);
      res.json({ recalibrate_output }); // Send the recalibrate_output as a JSON response
    });
    


    app.post("/setManualMode", (req, res) => {
      const { mode } = req.body; // Extract the mode from the request body
      modeType = mode; // Update the manual mode flag
    //  console.log("Mode:", mode);
      res.sendStatus(200); // Send a success status code (200)
    });
  }

  
  app.post("/recalibratePost", (req, res) => {
    const { new_recalibrate } = req.body; // Extract the direction from the request body
    //console.log("Button clicked:", direction); // Log the clicked direction
    recalibrate.unshift(new_recalibrate); 
    //if (recalibrate === "true"){
    //console.log("ri:", recalibrate);
    //}
    setTimeout(function(){
      //const removedElement = mvmtClicks.pop();
      //console.log(removedElement);
      //console.log("Delayed by 2 seconds");
    }, 5000);
    res.sendStatus(200); // Send a success status code (200)
  });


 
  app.post("/stopleftPost", (req, res) => {
    const { new_stopleft } = req.body; // Extract the direction from the request body
    //console.log("Button clicked:", direction); // Log the clicked direction
    stopLeft.unshift(new_stopleft); 
    //if (stopLeft === "true"){
    //console.log("stop:", stopLeft);
    //}
    res.sendStatus(200); // Send a success status code (200)
  });


  app.post("/beaconPost", (req, res) => {
    const { new_beacon } = req.body; // Extract the direction from the request body
    //console.log("Button clicked:", direction); // Log the clicked direction
    beacon.unshift(new_beacon); 
    //if (stopLeft === "true"){
    //console.log("stop:", stopLeft);
    //}
    res.sendStatus(200); // Send a success status code (200)
  });

  app.post("/completePost", (req, res) => {
    const { new_complete } = req.body; // Extract the direction from the request body
    //console.log("Button clicked:", direction); // Log the clicked direction
    complete.unshift(new_complete); 
    //if (stopLeft === "true"){
    //console.log("stop:", stopLeft);
    //}
    res.sendStatus(200); // Send a success status code (200)
  });


function serverAlgorithm(received_coordinates){
  let right = "right"; // Declare and assign a value to the right variable

  return right; // Use the right variable in your code
}

  //================FOR ESP32=========================================================
    //POST REQUEST (ESP32)==============================================================

    app.post("/roverCoordinateAndWallDetectionAndRecalibrationOutput", (req, res) => {
      const { jsonPacket } = req.body; // Extract the coordinates from the request body
      // console.log("data:", jsonPacket); // Log the received coordinates // You can perform any necessary processing with the coordinates here
       const received_coordinates = jsonPacket.received_coordinates;
       const wall_detection = jsonPacket.received_walldetection;
       const receivedrecalibrate = jsonPacket.recalibrate_output;
       recalibrate_output = receivedrecalibrate 
     //  console.log("Recalibrate output:", recalibrate_output);
   
     //  console.log("received_coordinates:", received_coordinates);
     let nums;
     if (typeof received_coordinates === 'string') {
       nums = received_coordinates.slice(1, -1).split(', ').map(Number);
     } else if (Array.isArray(received_coordinates)) {    
       nums = received_coordinates.map(Number);
     } else {
     // console.log("Invalid data type for received_coordinates.");
     }    
     x = nums[0];
     y = nums[1];
     //const nums = received_coordinates.slice(1, -1).split(',').map(Number);
     res.sendStatus(200); // Send a success status code (200)
   });


  //app.post("/wallDetection", (req, res) => {
  //  const {received_walldetection } = req.body; // Extract the coordinates from the request body
  //  console.log("Received wall detection:", received_walldetection); // Log the received coordinates // You can perform any necessary processing with the coordinates here
  //  wall_detection = received_walldetection;   
  //  res.sendStatus(200); // Send a success status code (200)
  //});

  app.get("/nextDirectionAndRecalibrateAndStopLeftAndBeaconAndComplete", (req, res) => {
   // console.log("Recalibrate:", recalibrate);
    recalibrate_var = recalibrate.pop()
    stopLeft_var = stopLeft.pop()
    beacon_var = beacon.pop()
    complete_var = complete.pop()
    res.json({ Direction: direction , Recalibrate : recalibrate_var, StopLeft : stopLeft_var, Beacon : beacon_var, Complete : complete_var});
    direction = mvmtClicks.pop();
    plot();
  });
  


 // app.get("/nextDirection", (req, res) => {
 //   if (wall_detection == "true" && !walls_plotted.includes(wallCoordinate)) {
 //     walls_plotted.push(wallCoordinate);
 //     NewWall = "true";
 //   //  plot(wallCoordinate, modeType);
 //   } else {
 //     NewWall = "false";
 //     //direction = serverAlgorithm(current_coordinates);
 //     direction = mvmtClicks.pop()
 //     res.json({ Direction: direction });
 //     console.log('direction:', direction);
 //     plot()
 //   //  plot(x,y, modeType);
 //   }
 // });
 // 
 // app.get("/newWall", (req, res) => {
 //   res.json({ newWall: NewWall });
 //   console.log('NewWall:', NewWall);
 // });

app.listen(PORT, () => {
 // console.log(`Server listening on port ${PORT}`); // Start the server and log the port it's listening on
});

  //app.get("/roverCoordinates", (req, res) => {
  //  res.json({
  //    roverCoordinates: roverCoordinates,
  //  });