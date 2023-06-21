class BinaryHeap {
    constructor() {
      this.heap = [];
    }
  
    insert(item, priority) {
      this.heap.push({ item, priority });
      this.bubbleUp(this.heap.length - 1);
    }
  
    extractMinimum() {
      const min = this.heap[0];
      const last = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.bubbleDown(0);
      }
  
      return min.item;
    }
  
    decreaseKey(item, newPriority) {
      const index = this.heap.findIndex((elem) => elem.item === item);
      if (index !== -1 && newPriority < this.heap[index].priority) {
        this.heap[index].priority = newPriority;
        this.bubbleUp(index);
      }
    }
  
    bubbleUp(index) {
      const current = this.heap[index];
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
  
        if (current.priority >= parent.priority) {
          break;
        }
  
        this.heap[parentIndex] = current;
        this.heap[index] = parent;
        index = parentIndex;
      }
    }
  
    bubbleDown(index) {
      const current = this.heap[index];
      const length = this.heap.length;
  
      while (true) {
        let childIndex = index * 2 + 1;
        if (childIndex >= length) {
          break;
        }
  
        const child = this.heap[childIndex];
        const rightChildIndex = childIndex + 1;
  
        if (
          rightChildIndex < length &&
          this.heap[rightChildIndex].priority < child.priority
        ) {
          childIndex = rightChildIndex;
        }
  
        if (child.priority >= current.priority) {
          break;
        }
  
        this.heap[index] = child;
        this.heap[childIndex] = current;
        index = childIndex;
      }
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  }
  
function findShortestPath(startCoord, endCoord, coordinateList, distanceThreshold) {
    // Calculate the squared distance between two coordinates
    function calculateDistance(coord1, coord2) {
      const dx = coord2[0] - coord1[0];
      const dy = coord2[1] - coord1[1];
      return dx * dx + dy * dy;
    }
  
    // Construct the adjacency matrix
    const adjacencyMatrix = [];
    const numCoordinates = coordinateList.length;
  
    for (let i = 0; i < numCoordinates; i++) {
      adjacencyMatrix[i] = [];
      for (let j = 0; j < numCoordinates; j++) {
        if (i !== j) {
          const distance = calculateDistance(coordinateList[i], coordinateList[j]);
          if (distance <= distanceThreshold) {
            adjacencyMatrix[i][j] = distance;
          } else {
            adjacencyMatrix[i][j] = Infinity;
          }
        } else {
          adjacencyMatrix[i][j] = 0;
        }
      }
    }
  
    // Dijkstra's algorithm
    const distances = {};
    const previous = {};
    const priorityQueue = new BinaryHeap();
  
    // Initialize distances and priority queue
    for (let i = 0; i < numCoordinates; i++) {
      const coord = coordinateList[i].toString();
      distances[coord] = Infinity;
      previous[coord] = null;
      priorityQueue.insert(coord, Infinity);
    }
  
    distances[startCoord.toString()] = 0;
  
    while (!priorityQueue.isEmpty()) {
      const currentCoord = priorityQueue.extractMinimum();
  
      if (currentCoord === endCoord.toString()) {
        break; // Reached the destination
      }
  
      if (distances[currentCoord] === Infinity) {
        break; // No more accessible nodes
      }
  
      const currentCoordIndex = coordinateList.findIndex((coord) =>
        coord.toString() === currentCoord
      );
  
      for (let i = 0; i < numCoordinates; i++) {
        if (i !== currentCoordIndex) {
          const neighborCoord = coordinateList[i].toString();
          const altDistance = distances[currentCoord] + adjacencyMatrix[currentCoordIndex][i];
  
          if (altDistance < distances[neighborCoord]) {
            distances[neighborCoord] = altDistance;
            previous[neighborCoord] = currentCoord;
            priorityQueue.decreaseKey(neighborCoord, altDistance);
          }
        }
      }
    }
  
    // Reconstruct the shortest path
    const shortestPath = [];
    let current = endCoord.toString();
  
    while (current !== null) {
      shortestPath.unshift(coordinateList.find((coord) => coord.toString() === current));
      current = previous[current];
    }
  
    return shortestPath;
  }
  
  
  const startCoord = [-249, -184];
  const endCoord = [203, 187];
  const coordinateList = [
    [ -96, -175 ] ,
    [ -96, -175 ] ,
    [ -96, -175 ] ,
    [ -91, -176 ] ,
    [ -81, -173 ] ,
    [ -72, -175 ] ,
    [ -67, -174 ] ,
    [ -63, -173 ] ,
    [ -62, -173 ] ,
    [ -58, -175 ] ,
    [ -53, -173 ] ,
    [ -49, -172 ] ,
    [ -42, -167 ] ,
    [ -37, -161 ] ,
    [ -36, -159 ] ,
    [ -36, -153 ] ,
    [ -37, -152 ] ,
    [ -36, -152 ] ,
    [ -27, -146 ] ,
    [ -27, -146 ] ,
    [ -25, -138 ] ,
    [ -25, -138 ] ,
    [ -22, -137 ] ,
    [ -18, -134 ] ,
    [ -17, -133 ] ,
    [ -14, -123 ] ,
    [ -7, -113 ] ,
    [ -1, -106 ] ,
    [ 2, -103 ] ,
    [ 6, -97 ] ,
    [ 10, -92 ] ,
    [ 13, -88 ] ,
    [ 19, -83 ] ,
    [ 23, -80 ] ,
    [ 29, -77 ] ,
    [ 37, -73 ] ,
    [ 46, -70 ] ,
    [ 56, -69 ] ,
    [ 60, -69 ] ,
    [ 65, -70 ] ,
    [ 69, -72 ] ,
    [ 73, -75 ] ,
    [ 76, -80 ] ,
    [ 76, -81 ] ,
    [ 76, -81 ] ,
    [ 76, -81 ] ,
    [ 81, -109 ] ,
    [ 82, -116 ] ,
    [ 82, -123 ] ,
    [ 83, -132 ] ,
    [ 83, -138 ] ,
    [ 84, -142 ] ,
    [ 86, -145 ] ,
    [ 91, -149 ] ,
    [ 95, -150 ] ,
    [ 103, -148 ] ,
    [ 109, -147 ] ,
    [ 109, -147 ] ,
    [ 118, -151 ] ,
    [ 121, -151 ] ,
    [ 128, -149 ] ,
    [ 131, -147 ] ,
    [ 131, -147 ] ,
    [ 139, -150 ] ,
    [ 142, -150 ] ,
    [ 150, -147 ] ,
    [ 151, -146 ] ,
    [ 159, -149 ] ,
    [ 161, -149 ] ,
    [ 168, -147 ] ,
    [ 173, -145 ] ,
    [ 173, -145 ] ,
    [ 181, -147 ] ,
    [ 185, -148 ] ,
    [ 189, -146 ] ,
    [ 195, -144 ] ,
    [ 199, -140 ] ,
    [ 203, -133 ] ,
    [ 202, -129 ] ,
    [ 200, -121 ] ,
    [ 200, -120 ] ,
    [ 201, -117 ] ,
    [ 203, -113 ] ,
    [ 201, -109 ] ,
    [ 199, -95 ] ,
    [ 198, -90 ] ,
    [ 196, -78 ] ,
    [ 194, -73 ] ,
    [ 192, -61 ] ,
    [ 190, -59 ] ,
    [ 182, -55 ] ,
    [ 176, -53 ] ,
    [ 169, -56 ] ,
    [ 162, -59 ] ,
    [ 148, -59 ] ,
    [ 141, -59 ] ,
    [ 133, -62 ] ,
    [ 127, -63 ] ,
    [ 121, -64 ] ,
    [ 119, -65 ] ,
    [ 115, -71 ] ,
    [ 113, -77 ] ,
    [ 114, -81 ] ,
    [ 115, -83 ] ,
    [ 126, -88 ] ,
    [ 128, -89 ] ,
    [ 135, -87 ] ,
    [ 142, -85 ] ,
    [ 151, -86 ] ,
    [ 156, -87 ] ,
    [ 159, -88 ] ,
    [ 162, -91 ] ,
    [ 164, -93 ] ,
    [ 165, -95 ] ,
    [ 165, -97 ] ,
    [ 165, -100 ] ,
    [ 165, -102 ] ,
    [ 165, -103 ] ,
    [ 163, -106 ] ,
    [ 158, -110 ] ,
    [ 151, -112 ] ,
    [ 145, -113 ] ,
    [ 138, -114 ] ,
    [ 132, -116 ] ,
    [ 128, -116 ] ,
    [ 117, -116 ] ,
    [ 112, -114 ] ,
    [ 108, -112 ] ,
    [ 102, -107 ] ,
    [ 100, -103 ] ,
    [ 98, -97 ] ,
    [ 96, -89 ] ,
    [ 95, -83 ] ,
    [ 95, -74 ] ,
    [ 95, -65 ] ,
    [ 97, -60 ] ,
    [ 102, -53 ] ,
    [ 109, -46 ] ,
    [ 114, -44 ] ,
    [ 119, -42 ] ,
    [ 125, -42 ] ,
    [ 129, -40 ] ,
    [ 135, -39 ] ,
    [ 141, -38 ] ,
    [ 147, -37 ] ,
    [ 155, -34 ] ,
    [ 164, -32 ] ,
    [ 169, -32 ] ,
    [ 172, -29 ] ,
    [ 174, -25 ] ,
    [ 176, -20 ] ,
    [ 173, -14 ] ,
    [ 170, -6 ] ,
    [ 170, -6 ] ,
    [ 173, 2 ] ,
    [ 172, 8 ] ,
    [ 167, 22 ] ,
    [ 167, 23 ] ,
    [ 169, 27 ] ,
    [ 170, 30 ] ,
    [ 167, 37 ] ,
    [ 166, 42 ] ,
    [ 166, 42 ] ,
    [ 168, 48 ] ,
    [ 168, 52 ] ,
    [ 164, 63 ] ,
    [ 164, 63 ] ,
    [ 165, 66 ] ,
    [ 166, 70 ] ,
    [ 162, 78 ] ,
    [ 160, 82 ] ,
    [ 160, 82 ] ,
    [ 161, 87 ] ,
    [ 161, 87 ] ,
    [ 158, 100 ] ,
    [ 157, 106 ] ,
    [ 155, 110 ] ,
    [ 154, 119 ] ,
    [ 152, 125 ] ,
    [ 151, 127 ] ,
    [ 147, 130 ] ,
    [ 141, 132 ] ,
    [ 134, 131 ] ,
    [ 128, 130 ] ,
    [ 122, 130 ] ,
    [ 113, 128 ] ,
    [ 103, 126 ] ,
    [ 96, 125 ] ,
    [ 86, 125 ] ,
    [ 78, 123 ] ,
    [ 73, 122 ] ,
    [ 67, 121 ] ,
    [ 57, 119 ] ,
    [ 53, 118 ] ,
    [ 42, 116 ] ,
    [ 32, 113 ] ,
    [ 20, 111 ] ,
    [ 9, 109 ] ,
    [ 5, 109 ] ,
    [ 0, 108 ] ,
    [ -3, 108 ] ,
    [ -9, 106 ] ,
    [ -22, 105 ] ,
    [ -34, 102 ] ,
    [ -46, 99 ] ,
    [ -56, 98 ] ,
    [ -60, 97 ] ,
    [ -67, 97 ] ,
    [ -76, 96 ] ,
    [ -86, 93 ] ,
    [ -93, 92 ] ,
    [ -99, 90 ] ,
    [ -103, 89 ] ,
    [ -109, 88 ] ,
    [ -118, 87 ] ,
    [ -123, 85 ] ,
    [ -130, 84 ] ,
    [ -134, 83 ] ,
    [ -139, 83 ] ,
    [ -147, 82 ] ,
    [ -157, 80 ] ,
    [ -164, 79 ] ,
    [ -169, 78 ] ,
    [ -175, 77 ] ,
    [ -179, 75 ] ,
    [ -187, 74 ] ,
    [ -191, 73 ] ,
    [ -200, 71 ] ,
    [ -206, 70 ] ,
    [ -221, 68 ] ,
    [ -228, 66 ] ,
    [ -232, 66 ] ,
    [ -235, 64 ] ,
    [ -241, 62 ] ,
    [ -245, 57 ] ,
    [ -247, 52 ] ,
    [ -245, 43 ] ,
    [ -245, 40 ] ,
    [ -245, 40 ] ,
    [ -249, 30 ] ,
    [ -250, 28 ] ,
    [ -248, 21 ] ,
    [ -246, 15 ] ,
    [ -246, 15 ] ,
    [ -247, 12 ] ,
    [ -245, 9 ] ,
    [ -241, 0 ] ,
    [ -240, -1 ] ,
    [ -241, -2 ] ,
    [ -242, -7 ] ,
    [ -240, -10 ] ,
    [ -238, -15 ] ,
    [ -238, -18 ] ,
    [ -236, -21 ] ,
    [ -235, -27 ] ,
    [ -234, -29 ] ,
    [ -231, -44 ] ,
    [ -229, -57 ] ,
    [ -229, -63 ] ,
    [ -227, -68 ] ,
    [ -225, -76 ] ,
    [ -224, -83 ] ,
    [ -222, -94 ] ,
    [ -221, -105 ] ,
    [ -219, -111 ] ,
    [ -218, -117 ] ,
    [ -217, -123 ] ,
    [ -216, -127 ] ,
    [ -214, -142 ] ,
    [ -213, -152 ] ,
    [ -211, -161 ] ,
    [ -210, -167 ] ,
    [ -208, -173 ] ,
    [ -207, -179 ] ,
    [ -206, -184 ] ,
    [ -201, -190 ] ,
    [ -196, -193 ] ,
    [ -193, -192 ] ,
    [ -185, -189 ] ,
    [ -182, -190 ] ,
    [ -176, -188 ] ,
    [ -167, -187 ] ,
    [ -161, -186 ] ,
    [ -154, -184 ] ,
    [ -141, -183 ] ,
    [ -132, -181 ] ,
    [ -124, -178 ] ,
    [ -121, -174 ] ,
    [ -119, -167 ] ,
    [ -119, -164 ] ,
    [ -122, -159 ] ,
    [ -125, -157 ] ,
    [ -133, -155 ] ,
    [ -134, -155 ] ,
    [ -140, -159 ] ,
    [ -140, -159 ] ,
    [ -143, -157 ] ,
    [ -150, -154 ] ,
    [ -158, -157 ] ,
    [ -163, -156 ] ,
    [ -173, -151 ] ,
    [ -178, -146 ] ,
    [ -182, -141 ] ,
    [ -186, -132 ] ,
    [ -188, -124 ] ,
    [ -189, -118 ] ,
    [ -190, -113 ] ,
    [ -192, -107 ] ,
    [ -193, -101 ] ,
    [ -195, -93 ] ,
    [ -196, -89 ] ,
    [ -196, -89 ] ,
    [ -198, -74 ] ,
    [ -200, -68 ] ,
    [ -202, -58 ] ,
    [ -203, -52 ] ,
    [ -204, -46 ] ,
    [ -206, -36 ] ,
    [ -207, -29 ] ,
    [ -208, -23 ] ,
    [ -211, -10 ] ,
    [ -213, -1 ] ,
    [ -216, 6 ] ,
    [ -218, 14 ] ,
    [ -218, 21 ] ,
    [ -215, 31 ] ,
    [ -212, 36 ] ,
    [ -208, 39 ] ,
    [ -204, 41 ] ,
    [ -197, 41 ] ,
    [ -191, 39 ] ,
    [ -186, 36 ] ,
    [ -183, 32 ] ,
    [ -177, 23 ] ,
    [ -173, 14 ] ,
    [ -170, 8 ] ,
    [ -167, 2 ] ,
    [ -165, -5 ] ,
    [ -164, -9 ] ,
    [ -160, -16 ] ,
    [ -155, -24 ] ,
    [ -153, -30 ] ,
    [ -149, -38 ] ,
    [ -141, -49 ] ,
    [ -140, -52 ] ,
    [ -137, -58 ] ,
    [ -132, -66 ] ,
    [ -126, -74 ] ,
    [ -121, -84 ] ,
    [ -116, -95 ] ,
    [ -111, -104 ] ,
    [ -107, -112 ] ,
    [ -105, -115 ] ,
    [ -100, -120 ] ,
    [ -93, -132 ] ,
    [ -88, -142 ] ,
    [ -86, -147 ] ,
    [ -84, -154 ] ,
    [ -81, -161 ] ,
    [ -78, -169 ] ,
    [ -77, -170 ] ,
    [ -71, -173 ] ,
    [ -64, -173 ] ,
    [ -61, -174 ] ,
    [ -55, -171 ] ,
    [ -50, -168 ] ,
    [ -50, -168 ] ,
    [ -45, -169 ] ,
    [ -41, -169 ] ,
    [ -38, -167 ] ,
    [ -34, -164 ] ,
    [ -34, -164 ] ,
    [ -29, -165 ] ,
    [ -25, -164 ] ,
    [ -21, -161 ] ,
    [ -18, -157 ] ,
    [ -16, -151 ] ,
    [ -14, -147 ] ,
    [ -16, -144 ] ,
    [ -17, -136 ] ,
    [ -16, -130 ] ,
    [ -13, -124 ] ,
    [ -13, -123 ] ,
    [ -10, -116 ] ,
    [ -9, -110 ] ,
    [ -5, -103 ] ,
    [ 0, -93 ] ,
    [ 2, -87 ] ,
    [ 8, -79 ] ,
    [ 15, -69 ] ,
    [ 17, -64 ] ,
    [ 20, -59 ] ,
    [ 24, -54 ] ,
    [ 28, -51 ] ,
    [ 32, -49 ] ,
    [ 36, -47 ] ,
    [ 45, -44 ] ,
    [ 52, -43 ] ,
    [ 60, -43 ] ,
    [ 64, -45 ] ,
    [ 68, -48 ] ,
    [ 71, -52 ] ,
    [ 74, -57 ] ,
    [ 76, -62 ] ,
    [ 77, -68 ] ,
    [ 78, -75 ] ,
    [ 81, -85 ] ,
    [ 85, -92 ] ,
    [ 86, -97 ] ,
    [ 87, -102 ] ,
    [ 91, -110 ] ,
    [ 96, -114 ] ,
    [ 102, -116 ] ,
    [ 107, -117 ] ,
    [ 114, -113 ] ,
    [ 116, -112 ] ,
    [ 120, -113 ] ,
    [ 123, -112 ] ,
    [ 133, -105 ] ,
    [ 140, -100 ] ,
    [ 140, -100 ] ,
    [ 144, -102 ] ,
    [ 147, -102 ] ,
    [ 155, -96 ] ,
    [ 160, -93 ] ,
    [ 160, -93 ] ,
    [ 165, -94 ] ,
    [ 167, -95 ] ,
    [ 175, -89 ] ,
    [ 181, -86 ] 
  ];
  
  const shortestPath = findShortestPath(startCoord, endCoord, coordinateList, 200);
  console.log(shortestPath);
  