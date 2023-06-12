const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(600, 600);
const context = canvas.getContext('2d');

function calculateDistance(coord1, coord2) {
  return Math.sqrt((coord2[0] - coord1[0]) ** 2 + (coord2[1] - coord1[1]) ** 2);
}

function findShortestPath(coordinates, startPoint, endPoint) {
    let shortestPath = [];
    let shortestDistance = Infinity;
  
    const startDistance = calculateDistance(startPoint, coordinates[0]);
    const endDistance = calculateDistance(coordinates[coordinates.length - 1], endPoint);
  
    if (startDistance < shortestDistance) {
      shortestDistance = startDistance;
      shortestPath = [startPoint, coordinates[0]];
    }
  
    if (endDistance < shortestDistance) {
      shortestDistance = endDistance;
      shortestPath = [coordinates[coordinates.length - 1], endPoint];
    }
  
    for (let i = 0; i < coordinates.length - 1; i++) {
      const currentCoord = coordinates[i];
      const nextCoord = coordinates[i + 1];
      const distance = calculateDistance(currentCoord, nextCoord);
  
      if (distance < shortestDistance) {
        shortestDistance = distance;
        shortestPath = [currentCoord, nextCoord];
      }
    }
  
    if (startPoint && shortestPath[0] !== startPoint) {
      shortestPath.unshift(startPoint);
    }
  
    if (endPoint && shortestPath[shortestPath.length - 1] !== endPoint) {
      shortestPath.push(endPoint);
    }
  
    return shortestPath;
  }

// Generate random coordinates
//const numCoordinates = 50;
//const coordinates = Array.from({ length: numCoordinates }, () => [
//  Math.random() * 10,
//  Math.random() * 10,
//]);

// Define start and end points
const startPoint = [0, 0];
const endPoint = [10, 10];

// Find the shortest path
const shortestPath = findShortestPath(coordinates, startPoint, endPoint);

// Draw the coordinates and shortest path on the canvas
context.fillStyle = 'blue';
coordinates.forEach((coord) => {
  const [x, y] = coord.map((val) => val * 50);
  context.fillRect(x, y, 5, 5);
});

context.strokeStyle = 'red';
context.lineWidth = 2;
context.beginPath();
shortestPath.forEach((coord, index) => {
  const [x, y] = coord.map((val) => val * 50);
  if (index === 0) {
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
  }
});
context.stroke();

context.fillStyle = 'green';
const [startX, startY] = startPoint.map((val) => val * 50);
context.fillRect(startX, startY, 5, 5);

context.fillStyle = 'magenta';
const [endX, endY] = endPoint.map((val) => val * 50);
context.fillRect(endX, endY, 5, 5);

// Save the canvas as an image file
const fs = require('fs');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('shortest_path.png', buffer);
