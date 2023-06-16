const { createCanvas } = require('canvas');

// Define the line coordinates
const lineCoordinates = [
  [0, 0],
  [2, 0],
  [4, 0],
  [4, 2],
  [4, 4],
  [2, 4],
  [0, 4],
  [0, 2],
  [1, 1],
  [1, 3],
  [3, 1],
  [3, 3],
  [5, 1],
  [5, 3],
  [5, 5]
];

// Find the minimum and maximum values of x and y coordinates
let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;

lineCoordinates.forEach(([x, y]) => {
  if (x < minX) minX = x;
  if (y < minY) minY = y;
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
});

// Calculate canvas size based on coordinate range
const padding = 20; // Adjust the padding value to control the zoom level
const canvasWidth = (maxX - minX + padding) * 10;
const canvasHeight = (maxY - minY + padding) * 10;

// Set up the canvas
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d');

// Set the line color and width
ctx.strokeStyle = 'blue';
ctx.lineWidth = 2;

// Adjust the coordinate values to fit within the canvas and apply zoom
const adjustedCoordinates = lineCoordinates.map(([x, y]) => [
  (x - minX + padding / 2) * 10,
  (y - minY + padding / 2) * 10
]);

// Connect the adjusted coordinates
ctx.beginPath();
ctx.moveTo(adjustedCoordinates[0][0], adjustedCoordinates[0][1]);

for (let i = 1; i < adjustedCoordinates.length; i++) {
  ctx.lineTo(adjustedCoordinates[i][0], adjustedCoordinates[i][1]);
}

ctx.stroke();

// Save the canvas as an image
const fs = require('fs');
const out = fs.createWriteStream(__dirname + '/zoomed_lines.jpg');
const stream = canvas.createJPEGStream();
stream.pipe(out);
out.on('finish', () => console.log('Image created: zoomed_lines.jpg'));
