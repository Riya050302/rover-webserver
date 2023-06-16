const { createCanvas, loadImage } = require('canvas');

// Define the coordinates
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
  [85, -80]
];

// Find the minimum and maximum values of x and y coordinates
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

coordinates.forEach(([x, y]) => {
  if (x < minX) minX = x;
  if (y < minY) minY = y;
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
});

// Calculate canvas size based on coordinate range
const canvasWidth = maxX - minX + 10; // Add some padding for better visibility
const canvasHeight = maxY - minY + 10;

// Set up the canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Set the line color and width
ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;

// Adjust the coordinate values to fit within the canvas
const adjustedCoordinates = coordinates.map(([x, y]) => [x - minX + 5, y - minY + 5]);

// Connect the adjusted coordinates and store line coordinates
ctx.beginPath();
ctx.moveTo(adjustedCoordinates[0][0], adjustedCoordinates[0][1]);

const lineCoordinates = [adjustedCoordinates[0]]; // Array to store line coordinates

for (let i = 1; i < adjustedCoordinates.length; i++) {
  const [x, y] = adjustedCoordinates[i];
  ctx.lineTo(x, y);
  lineCoordinates.push([x, y]);
}

ctx.stroke();

// Draw circles at the adjusted coordinates
ctx.fillStyle = 'red';
adjustedCoordinates.forEach(([x, y]) => {
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fill();
});

// Save the canvas as an image
const fs = require('fs');
const out = fs.createWriteStream(__dirname + '/path.jpg');
const stream = canvas.createJPEGStream();
stream.pipe(out);
out.on('finish', () => console.log('Image created: path.jpg'));

// Use the line coordinates as needed
console.log('Line coordinates:', lineCoordinates);
