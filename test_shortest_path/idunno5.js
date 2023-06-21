function shortestPath(maze, start, end) {
    if (!isValidMaze(maze) || !isValidCoordinate(start, maze) || !isValidCoordinate(end, maze)) {
      throw new Error('Invalid maze or coordinates');
    }
  
    const queue = [{ position: start, path: [] }];
    const visited = new Set();
  
    const isValidMove = (x, y) => {
      if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) {
        return false; // Out of bounds
      }
      if (maze[x][y] === 1) {
        return false; // Wall
      }
      return true;
    };
  
    const getNeighbors = (x, y) => {
      const neighbors = [];
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Up, Down, Left, Right
  
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
  
        if (isValidMove(newX, newY) && !visited.has(`${newX},${newY}`)) {
          neighbors.push({ x: newX, y: newY });
        }
      }
  
      return neighbors;
    };
  
    while (queue.length > 0) {
      const { position, path } = queue.shift();
      const { x, y } = position;
      const currentPosition = `${x},${y}`;
  
      if (x === end[0] && y === end[1]) {
        return path.concat([position]);
      }
  
      if (!visited.has(currentPosition)) {
        visited.add(currentPosition);
        const neighbors = getNeighbors(x, y);
        for (const neighbor of neighbors) {
          queue.push({ position: neighbor, path: path.concat([position]) });
        }
      }
    }
  
    return null; // No path found
  }
  
  function isValidMaze(maze) {
    if (!Array.isArray(maze) || maze.length === 0 || !Array.isArray(maze[0]) || maze[0].length === 0) {
      return false; // Invalid maze structure
    }
    const rowLength = maze[0].length;
    for (let i = 1; i < maze.length; i++) {
      if (!Array.isArray(maze[i]) || maze[i].length !== rowLength) {
        return false; // Invalid row length
      }
    }
    return true;
  }
  
  function isValidCoordinate(coord, maze) {
    const [x, y] = coord;
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) {
      return false; // Invalid coordinate
    }
    return true;
  }
  
  // Example usage:
  try {
    const maze = [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0]
    ];
  
    const start = [0, 0];
    const end = [4, 4];
  
    const path = shortestPath(maze, start, end);
  
    if (path) {
      console.log("Shortest path:", path);
    } else {
      console.log("No path found");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
  