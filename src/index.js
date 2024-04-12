/* Next task:
- make fns/factories from pseudocode:
-validKnight moves needs valid move generation logic. must handle edge cases like out of bounds coordinates. Also needs optimization such as not regenerating knight moves if they have already been generated, which is possible by storing the knight moves in a js set object.

-look for more optimizations, this implementation uses implicit DFS during creation of the tree which uses a lot of memory but is clear.
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, objectToString as ots } from './logger.js'; //shorthand loggers
import makeQueue from './queue.js';

//fn to make a tree node. each node represents a valid knight move with the coordinates it has reached at the current depth (path length) and it's parent move node.
const treeNode = (coords, parent = null, children = [])=> ({ coords, parent, children });

//set of board coordinate strings already added to the tree graph for move generation
const visitedCoordsSet = new Set();

//fn to calculate up to 8 valid knight moves from current coordinate. pass in a parent node for the current coordinate to get an array of valid move nodes.
const validKnightMoves = (parentMoveNode) => {
  const validMoveNodes = [];
  const startX = parentMoveNode.coords[0]; //extract for clarity
  const startY = parentMoveNode.coords[1];
  //need to loop over two arrays of 8 x/y move offsets. offsetorder is cw from top
  const xOffsets = [1, 2, 2, 1, -1, -2, -2, -1];
  const yOffsets = [2, 1, -1, -2, -2, -1, 1, 2];
  for ( let i = 0; i < 8; i++ ) { //8 operation/move creation loop
    //calculate new move coordinates from offsets, add in bounds moves
    const endX = startX + xOffsets[i];
    const endY = startY + yOffsets[i];
    if (endX < 8 && endX > -1 && endY < 8 && endY > -1) {
      //only make unique move nodes by checking visitedCoordsSet
      if ( !visitedCoordsSet.has( [endX, endY].join('') ) ) {
        validMoveNodes.push( treeNode([endX, endY], parentMoveNode) );
      }
    }
  }
  return validMoveNodes;
};

//fn to make tree of valid knight moves from a given coordinate.
const constructTree = (startCoords, endCoords)=> {
  //logic to build out tree in level loops using a queue, while checking if the endCoords
  //has been reached to stop tree construction.
  const depth0Node = treeNode(startCoords); //makes node: {coords:[0,0], parent:null}
  //make a queue with tree root
  const addNodesByLevelQueue = makeQueue();
  addNodesByLevelQueue.enqueue(depth0Node);
  lg(`tree:\n ${ots(depth0Node)}`); //view tree
  let currentMoveNode; //used to expose current move coordinates and children []
  while ( addNodesByLevelQueue.getSize() ) { // if queue occupied:
    currentMoveNode = addNodesByLevelQueue.dequeue();
    // Generate valid knight move nodes arr from current move node
    validKnightMoves(currentMoveNode).forEach( (childMove)=> {
      //check if node has endCoords
      if ( childMove.coords[0] === endCoords[0] && childMove.coords[1] === endCoords[1]) {
        //todo: childMove node with end coordinates found, trigger loop termination...
        
        return childMove;
      }
      addNodesByLevelQueue.enqueue(childMove);//enqueue moves we don't care about
    } );

  }
  //this point in code means endCoordinate not reached. Currently I think this never
  //happens since knights can eventually visit every square on an empty board
  return null;
};

//todo: fn to construct a path of moves from a given tree node by following it's parent chain of moves to the root node and reversing the order.
const getReversedPath = (endNode)=> {
  const path = [];
  //logic to add moves to path

  return path;
};

//todo: knightMoves driver script.
//make tree of valid moves with constructTree. It returns an end coordinate node made with implicit DFS and has a parents following the shortest path from start to end coordinates. pass the end coordinate node into getReversedPath to get the shortest path and log it.
const shortestKnightMoves = (startCoords, endCoords)=> {
  const endCoordsNode = constructTree(startCoords, endCoords);
  if (endCoordsNode) return getReversedPath(endCoordsNode);
  return 'No valid path found.'; //default return when no valid path found
};
lg( shortestKnightMoves([0, 0], [1, 2]) ); //should return [[0,0],[1,2]]
