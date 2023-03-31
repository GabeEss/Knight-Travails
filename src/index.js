import './style.css';
import createBoardStructure from './gameboard-data-structure';
import setDefaultKnight from './set-default-knight';
import setDefaultSquare from './set-default-square';
import generateKnight from './generate-knight';
import generateTarget from './generate-target';
import callTree from './call-binary-tree';
import findClosest from './find-closest';
import generateGrid from './generate-gameboard';

const body = document.body; // body of the DOM
const main = document.createElement('div');
main.setAttribute('id', 'main-container');

const gameboard = createBoardStructure(); // get gameboard as a 2D array data structure
main.appendChild(generateGrid(gameboard)); // creates the gameboard element as a table
body.appendChild(main);

const knight = setDefaultKnight(gameboard); // get knight's square (the root node position)
const knightElement = generateKnight(knight); // put the knight on the board, letter k, color it gold
const target = setDefaultSquare(gameboard); // get the target square
const targetElement = generateTarget(target); // put the target on the board, letter t, color it gold

// Make a button that says find path.
// Using a click event, call the logic that finds the closest path a knight can take.
// Display the path as text along the bottom in a container. Make a translator function to
// take the coordinates in the array and translate them into chess board coordinates.
// Highlight each element by attaching a class to it that colors it gold and remove the class
// after a specific amount of time. Remove the option to interact with anything until that is done.
// Create a promise/await kind of thing before enabling that interaction.
// In order to change the knight or target, allow the user to drag the knight or target.
// Drag and drop should start an event that sets the knight/target's new position.
// Might need to make it so you can't click on anything during this time, but maybe not
// necessary.
// Make a little title.

const root = callTree(knight, gameboard); // get the tree for the moves a knight would take
const closestArray = []; // the array to hold the path to the target square
findClosest(root, target, closestArray); // find the closest path to the target square
console.log(closestArray);