const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(10000, 10000); // Increase the canvas size
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
const coordinates = [
  [0, 12],
  [1, 12],
  [3, 11],
  [1, 8],
  [3, 31],
  [8, 35],
  [11, 36],
  [24, 36],
  [30, 36],
  [32, 36],
  [38, 32],
  [46, 28],
  [50, 25],
  [52, 21],
  [55, 16],
  [60, 8],
  [64, 4],
  [66, 0],
  [67, -7],
  [69, -15],
  [70, -24],
  [73, -36],
  [76, -45],
  [79, -57],
  [81, -65],
  [83, -73],
  [85, -80],
];

// Define start and end points
const startPoint = [0, 12];
const endPoint = [66, 0];

// Find the shortest path
const shortestPath = findShortestPath(coordinates, startPoint, endPoint);

// Draw the coordinates and shortest path on the canvas
context.fillStyle = 'blue';
coordinates.forEach((coord) => {
  const [x, y] = coord.map((val) => val * 50);
  context.fillRect(x, y, 5, 5);

  // Display coordinates
  context.font = '10px Arial';
  context.fillText(`(${coord[0]}, ${coord[1]})`, x + 7, y);
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
