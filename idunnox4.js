// Define the line coordinates
const lineCoordinates = [
        [0, 0], [1, 0], [2, 0],                         [6, 0], [7, 0], [8, 0],                                             [14, 0], [15, 0], [16, 0],
                        [2, 1],                         [6, 1], [7, 1], [8, 1], [9, 1],                            [13, 1], [14, 1], [15, 1], [16, 1], [17, 1], [18, 1], [19, 1],
                        [2, 2],                 [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2],                   [13, 2], [14, 2], [15, 2], [16, 2], [17, 2], [18, 2], [19, 2],
                        [2, 3], [3, 3],         [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3],                   [13, 3], [14, 3], [15, 3], [16, 3], [17, 3], [18, 3], [19, 3],
                        [2, 4], [3, 4],         [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],                   [13, 4], [14, 4], [15, 4], [16, 4], [17, 4], [18, 4], [19, 4],
        [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5],                 [8, 5], [9, 5], [10, 5], [11, 5], [12, 5], [13, 5],                
        [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],                 [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],                 
        [0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7],                 [8, 7], [9, 7], [10, 7], [11, 7], [12, 7],                           
        [0, 8], [1, 8], [2, 8],         [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8],                           
        [0, 9], [1, 9], [2, 9],                 [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]                                                      
  ];
  
  // Define the beginning and end points
  const startPoint = [0, 0];
  const endPoint = [18, 3];
  
  // Find the shortest path
  const shortestPath = findShortestPath(lineCoordinates, startPoint, endPoint);
  
  console.log('Shortest Path:', shortestPath);
  
  function findShortestPath(coordinates, start, end) {
    const graph = createGraph(coordinates);
    const openSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
  
    // Initialize scores for all nodes
    coordinates.forEach(node => {
      const key = node.toString();
      gScore.set(key, Infinity);
      fScore.set(key, Infinity);
    });
  
    // Initialize start node
    const startKey = start.toString();
    gScore.set(startKey, 0);
    fScore.set(startKey, heuristic(start, end));
    openSet.add(startKey);
  
    while (openSet.size > 0) {
      const current = getLowestFScoreNode(openSet, fScore);
      const currentKey = current.toString();
  
      if (currentKey === end.toString()) {
        return reconstructPath(cameFrom, current);
      }
  
      openSet.delete(currentKey);
  
      const neighbors = graph.get(current);
      neighbors.forEach(neighbor => {
        const neighborKey = neighbor.toString();
        const tentativeGScore = gScore.get(currentKey) + 1;
  
        if (tentativeGScore < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, end));
  
          if (!openSet.has(neighborKey)) {
            openSet.add(neighborKey);
          }
        }
      });
    }
  
    return null; // No path found
  }
  
  function createGraph(coordinates) {
    const graph = new Map();
  
    coordinates.forEach(currentNode => {
      const neighbors = [];
      coordinates.forEach(neighborNode => {
        if (isNeighbor(currentNode, neighborNode)) {
          neighbors.push(neighborNode);
        }
      });
      const currentNodeKey = currentNode.toString();
      graph.set(currentNodeKey, neighbors);
    });
  
    return graph;
  }
  
  function isNeighbor(node1, node2) {
    const [x1, y1] = node1;
    const [x2, y2] = node2;
  
    return (
      (Math.abs(x1 - x2) === 1 && y1 === y2) ||
      (Math.abs(y1 - y2) === 1 && x1 === x2)
    );
  }
  
  function heuristic(node1, node2) {
    const [x1, y1] = node1;
    const [x2, y2] = node2;
  
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
  
  function getLowestFScoreNode(nodes, fScore) {
    let lowestNode = null;
    let lowestFScore = Infinity;
  
    nodes.forEach(node => {
      const score = fScore.get(node);
      if (score < lowestFScore) {
        lowestNode = node;
        lowestFScore = score;
      }
    });
  
    return lowestNode;
  }
  
  function reconstructPath(cameFrom, current) {
    const path = [];
    let currentKey = current.toString();
  
    while (cameFrom.has(currentKey)) {
      path.unshift(current);
      currentKey = cameFrom.get(currentKey);
    }
  
    path.unshift(current); // Add the start node
  
    return path;
  }
  