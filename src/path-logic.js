import callTree from './call-binary-tree';
import findClosest from './find-closest';
import arrayToChess from './array-to-chess-coordinates';
import colorPath from './color-the-path';

export default function findPath(knight, target, gameboard) {
    const root = callTree(knight, gameboard); // get the tree for the moves a knight would take
    const closestArray = []; // the array to hold the path to the target square
    findClosest(root, target, closestArray); // find the closest path to the target square

     // Wrap the colorPath function in a Promise
    const colorPathPromise = new Promise((resolve) => {
        resolve(colorPath(closestArray));
    });

    // When colorPath resolves, return the string to findPathWithPromise.
    return colorPathPromise.then(() => {
        
        const chess = arrayToChess(closestArray);
        let string = "";
    
        for (let i = chess.length - 1; i >= 0; i--) {
          string += chess[i].position;
    
          if (i === 0);
          else string += " to ";
        }
    
        
        return string;
      });
  }