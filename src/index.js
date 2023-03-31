import './style.css';
import createBoardStructure from './gameboard-data-structure';
import generateGrid from './generate-gameboard';
import setDefaultKnight from './set-default-knight';
import setDefaultSquare from './set-default-square';
import generateKnight from './generate-knight';
import generateTarget from './generate-target';
import findPath from './path-logic';
import removeColor from './remove-path-color';


const body = document.body; // body of the DOM
const main = document.createElement('div');
main.setAttribute('id', 'main-container');

const title = document.createElement('h1');
title.textContent = "Knight Travails";

const description = document.createElement('h4');
let descriptionString = "Drag and drop the knight and where you want him to move. The application will find the shortest path and display it for you.";
description.textContent = descriptionString;
main.appendChild(title);
main.appendChild(description);

const gameboard = createBoardStructure(); // get gameboard as a 2D array data structure
const gameboardElement = generateGrid(gameboard);
main.appendChild(gameboardElement); // creates the gameboard element as a table

const findPathButton = document.createElement('button');
findPathButton.textContent = "Find Closest Path";
const pathDisplay = document.createElement('p');
main.appendChild(findPathButton);
main.appendChild(pathDisplay);

body.appendChild(main);

const knight = setDefaultKnight(gameboard); // get knight's square (the root node position)
const knightElement = generateKnight(knight); // put the knight on the board
const target = setDefaultSquare(gameboard); // get the target square
const targetElement = generateTarget(target); 
knightElement.setAttribute('draggable', true); // Make the elements draggable.
targetElement.setAttribute('draggable', true);

// Listen for a dragstart event to initiate the drag. The data is used to represent
// whether the dragged element is the knight or the target.
knightElement.addEventListener("dragstart", onKnightDragStart);
targetElement.addEventListener("dragstart", onTargetDragStart);

// Remove the option to interact with anything until that is done.
// Create a promise/await kind of thing before enabling that interaction.
// In order to change the knight or target, allow the user to drag the knight or target.
// Drag and drop should start an event that sets the knight/target's new position.
// Might need to make it so you can't click on anything during this time, but maybe not
// necessary.


// While finding a patch from the knight to the target, the user cannot drag.
findPathButton.addEventListener('click', async () => {
    knightElement.removeEventListener("dragstart", onKnightDragStart); // prevent the user from dragging until function completes
    targetElement.removeEventListener("dragstart", onTargetDragStart);
    let string = await findPath(knight, target, gameboard);
    pathDisplay.textContent = string;
    enableDragStartListeners();
})

function onKnightDragStart(event) {
    removeColor();
    event.dataTransfer.setData("text/plain", "knight");
}

function onTargetDragStart(event) {
    removeColor();
    event.dataTransfer.setData("text/plain", "target");
}

// Enables the drag events after they have been removed.
function enableDragStartListeners() {
    knightElement.addEventListener("dragstart", onKnightDragStart);
    targetElement.addEventListener("dragstart", onTargetDragStart);
}
