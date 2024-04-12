/* Next task:
- make fns/factories from pseudocode:
treeNode : { coordinates, parent=none }
validKnightMoves(currentNode.coordinates): return arr of up to 8 valid move coordinates
constructTree(startCoord, endCoord):
  root = treeNode(startCoord)
  make a queue
  while queue occupied:
    currentNode = dequeue a node
    Generate valid knight moves from current coordinates and loop over them:
    for move of validKnightMoves(currentNode.coordinates):
      if move == end: RETURN currentNode
      childNode = treeNode(move, parent=currentNode)
      enqueue childNode
  if no path found: RETURN null
reconstructPath(endNode): returns a path []
//driver script:
endNode = constructTree(start_coord, end_coord)
if endingNode: shortestPath = reconstructPath(endingNode)
else: return "No valid path found."

-validKnight moves needs to handle edge cases like out of bounds coordinates. It also needs optimization such as not regenerating knight moves if they have already been generated, which is possible by storing the knight moves in a js set object.

-look for more optimizations, this implementation uses implicit DFS during creation of the tree which uses a lot of memory but is clear.
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, objectToString as ots } from './logger.js'; //shorthand loggers

//fn to make a tree node. each node represents a valid knight move with the coordinates it has reached and it's parent movement node.
const treeNode = (coords, parent = null)=> ( { coords, parent } );
// lg( treeNode([0, 0]) ); //debug


