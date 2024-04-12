/* Next task:
- make fns/factories from pseudocode:
-validKnight moves needs valid move generation logic. must handle edge cases like out of bounds coordinates. Also needs optimization such as not regenerating knight moves if they have already been generated, which is possible by storing the knight moves in a js set object.

-look for more optimizations, this implementation uses implicit DFS during creation of the tree which uses a lot of memory but is clear.
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, objectToString as ots } from './logger.js'; //shorthand loggers
import makeQueue from './queue.js';

//fn to make a tree node. each node represents a valid knight move with the coordinates it has reached at the current depth (path length) and it's parent move node.
const treeNode = (coords, parent = null, kids = [])=> ( { coords, parent, kids } );

//set of board coordinates w/ generated moves. check to prevent regenerating moves.
const generatedCoords = new Set();

//todo: fn to calculate up to 8 valid knight moves from a given coordinate.
//it needs to reference a free variable holding moves that have already been generated to not return them. it also needs to handle edge cases like out of bounds coordinates.
const validKnightMoves = (coords) => {
  let moves = [];

  return moves;
};

//todo: fn to make tree of valid knight moves from a given coordinate.
const constructTree = (startCoord, endCoord)=> {
  //logic to build out tree in level loops using a queue, while checking if the endCoord has been reached to indicate stopping. validKnightMoves will be used to generate valid knight moves.
  let depth0Node = treeNode(startCoord); //makes node: {coords:[0,0], parent:null}
  //make a queue with tree root
  const addNodesByLevelQueue = makeQueue();
  addNodesByLevelQueue.enqueue(depth0Node);
  lg(`tree:\n ${ots(depth0Node)}`); //view tree
  let currentNode;
  while ( addNodesByLevelQueue.getSize() ) { // while queue occupied:
    currentNode = addNodesByLevelQueue.dequeue();

  }
  // Generate valid knight moves from current coordinates and loop over them:
  // for move of validKnightMoves(currentNode.coordinates):
  //   if move == end: RETURN currentNode
  //   childNode = treeNode(move, parent=currentNode)
  //   enqueue childNode

  //if endCoordinate is not reached, return null. I thin this should never happen as knights can visit every square on an empty board.
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
const shortestKnightMoves = (startCoord, endCoord)=> {
  const endCoordNode = constructTree(startCoord, endCoord);
  if (endCoordNode) return getReversedPath(endCoordNode);
  return 'No valid path found.'; //default return when no valid path found
};
lg( shortestKnightMoves([0, 0], [1, 2]) ); //should return [[0,0],[1,2]]
