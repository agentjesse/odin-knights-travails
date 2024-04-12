/* Next task:
-look for more optimizations, this implementation uses implicit DFS during creation of the tree which uses a lot of memory but is clear.
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, objectToString as ots } from './logger.js'; //shorthand loggers
import makeQueue from './queue.js';

//fn to make a tree node. each node represents a valid knight move with the coordinates it has reached at the current depth (path length) and it's parent move node.
const treeNode = (coords, parent = null, children = [])=> ({ coords, parent, children });

//set of board coordinate strings already added to the tree graph for move generation
const visitedCoordsSet = new Set();

//fn to calculate up to 8 valid knight moves from current coordinate. pass in a parent
//node for the current coordinate to get an array of valid move nodes. also sets child
//move nodes to the parent
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
        const childMoveNode = treeNode([endX, endY], parentMoveNode);
        validMoveNodes.push( childMoveNode );
      }
      //set valid move nodes as children of parent
      parentMoveNode.children = validMoveNodes;
    }
  }
  return validMoveNodes;
};

//fn to make tree of valid knight moves from a given coordinate and return the first
//movement node matching the end coordinates. Nodes are added by depth level and checked,
//which means the first matching node reveals a shortest path.
const makeTreeForEndNode = (startCoords, endCoords)=> {
  //build out tree in depth level loops using a queue, while checking if a move with the
  //end coordinates has been found to stop tree construction.
  //example movement node: {coords:[0,0], parent:null, chldren: null}
  const depth0Node = treeNode(startCoords);
  //make a queue with tree root
  const addNodesByLevelQueue = makeQueue();
  addNodesByLevelQueue.enqueue(depth0Node);
  // lg(`tree:\n ${ots(depth0Node)}`); //view tree
  let currentMoveNode; //used to expose current move coordinates and children []
  while ( addNodesByLevelQueue.getSize() ) { // if queue occupied:
    currentMoveNode = addNodesByLevelQueue.dequeue();
    // Generate valid knight move nodes arr from current move node
    const validKnightMovesArr = validKnightMoves(currentMoveNode);
    // eslint-disable-next-line no-restricted-syntax
    for ( const childMove of validKnightMovesArr ) {
      //check to return node with coords matching endCoords
      if ( childMove.coords[0] === endCoords[0]
        && childMove.coords[1] === endCoords[1] ) return childMove;
      addNodesByLevelQueue.enqueue(childMove);//enqueue non-matching moves
    }
  }
  //this point in code means endCoordinate not reached. Knights can eventually visit every square on an EMPTY board, so this might only be reached if there is an error currently.
  return null;
};

//fn to construct a path of moves from a movement node by following it's parent
//chain to the level 0 node
const pathToEndCoords = (node)=> {
  const path = [];
  //add move coordinates to path array
  while (node) { //traversal stops at level 0 node
    path.push( node.coords );
    node = node.parent;
  }
  return `Shortest Path: ${ path.toReversed().join(' -> ')}`;
};

//shortestKnightMoves driver script
//use makeTreeForEndNode fn to build a tree of valid moves and return a node with
//the end coordinate if found. The node can reveal a shortest path as a string when it
//is passed into pathToEndCoords.
const shortestKnightMoves = (startCoords, endCoords)=> {
  //handle out of bounds start or end coordinates
  const [startX, startY] = startCoords; const [endX, endY] = endCoords;
  if (startX < 8 && startX > -1 && startY < 8 && startY > -1
    && endX < 8 && endX > -1 && endY < 8 && endY > -1) {
    const endCoordsNode = makeTreeForEndNode(startCoords, endCoords);
    if (endCoordsNode) return pathToEndCoords(endCoordsNode);
    return 'No valid path found.'; //default return when no valid path found
  }
  return 'out of bounds start or end coordinates';
};
// lg( shortestKnightMoves([3, 3], [4, 3]) ); //should return [3,3] [4,5] [6,4] [4,3]
lg( shortestKnightMoves([0, 0], [7, 7]) ); //should return [3,3] [4,5] [6,4] [4,3]
