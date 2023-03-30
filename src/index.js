import './style.css';
import createBoardStructure from './gameboard-data-structure';
import setRoot from './set-root';
import setSquare from './set-target-square';
import callTree from './call-binary-tree';
import findClosest from './find-closest';

const gameboard = createBoardStructure(); // get gameboard
const knight = setRoot(gameboard); // get knight's square (the root node position)
const target = setSquare(gameboard); // get the target square
const root = callTree(knight, gameboard); // get the tree for the moves a knight would take
const closestArray = []; // the array to hold the path to the target square
findClosest(root, target, closestArray); // find the closest path to the target square
console.log(closestArray);