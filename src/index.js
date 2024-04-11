/* Next task:
- make fns/factories:
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
*/

//For Node.js, when importing local modules, include the file extension in the import statement.
import { logToConsole as lg, objectToString as ots } from './logger.js'; //shorthand loggers

