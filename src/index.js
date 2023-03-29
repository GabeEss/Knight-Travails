import './style.css';
import createBoardStructure from './gameboard-data-structure';
import setRoot from './set-root';
import setSquare from './set-target-square';
import callTree from './call-binary-tree';

const gameboard = createBoardStructure(); // get gameboard
const knight = setRoot(gameboard); // get knight's square (the root node position)
const targetSpace = setSquare(gameboard); // get the target square
console.log(callTree(knight, gameboard)); // get the tree for the moves a knight would take