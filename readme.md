# Rover WebServer

This repository hosts the code for a Node.js web server responsible for communicating with the Rover WebApp and ESP32 on a rover. The web server was deployed on an AWS EC2 Instance. The deployment process involved utilizing GitHub, which made it convenient to implement changes. Whenever updates were made to the `index.js` file and pushed to the repository, the code on the EC2 instance would automatically update.

To execute the `index.js` file, specific commands needed to be run to establish a connection between the developer's terminal and the EC2 instance. Once connected, the file could be executed using the command: `npm start`
