import './style.css';
import createBoardStructure from './gameboard-data-structure';
import generateGrid from './generate-gameboard';
import setDefaultKnight from './set-default-knight';
import setDefaultSquare from './set-default-square';
import generateKnight from './generate-knight';
import generateTarget from './generate-target';
import removeColor from './remove-path-color';
import findPathWithPromise from './find-path-with-promise';
import setNewKnight from './set-new-knight';
import setNewTarget from './set-new-target';


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

let knight = setDefaultKnight(gameboard); // get knight's square (the root node position)
let knightElement = generateKnight(knight); // put the knight on the board
let target = setDefaultSquare(gameboard); // get the target square
let targetElement = generateTarget(target); 
knightElement.setAttribute('draggable', true); // Make the elements draggable.
targetElement.setAttribute('draggable', true);

// Listen for a dragstart event to initiate the drag. The data is used to represent
// whether the dragged element is the knight or the target.
knightElement.addEventListener("dragstart", onKnightDragStart);
targetElement.addEventListener("dragstart", onTargetDragStart);

// Click event for the "Find Path" button.
findPathButton.addEventListener('click', pathButtonClick);

async function pathButtonClick() {
    findPathButton.removeEventListener('click', pathButtonClick);
    knightElement.removeEventListener("dragstart", onKnightDragStart);
    targetElement.removeEventListener("dragstart", onTargetDragStart);
    gameboardElement.removeEventListener("dragover", onDragOver);
    gameboardElement.removeEventListener("dragover", onDragOver);
    gameboardElement.removeEventListener("drop", onDrop);
    gameboardElement.removeEventListener("drop", onDrop);
    let string = await findPathWithPromise(knight, target, gameboard);
    pathDisplay.textContent = string;
    enableDrag();
    findPathButton.addEventListener('click', pathButtonClick);
}

function onKnightDragStart(event) {
    removeColor();
    knightElement.classList.remove('knight');
    event.dataTransfer.setData("text/plain", "knight");
}

function onTargetDragStart(event) {
    removeColor();
    targetElement.classList.remove('target');
    event.dataTransfer.setData("text/plain", "target");
}

// Enables the drag events after they have been removed.
function enableDrag() {
    knightElement.addEventListener("dragstart", onKnightDragStart);
    targetElement.addEventListener("dragstart", onTargetDragStart);
    gameboardElement.addEventListener("dragover", onDragOver);
    gameboardElement.addEventListener("dragover", onDragOver);
    gameboardElement.addEventListener("drop", onDrop);
    gameboardElement.addEventListener("drop", onDrop);
}

function onDragOver(event) {
    event.preventDefault();
    const square = event.target.closest(".White, .Black"); // look for either class
}

// listen for dragover and drop events on board squares
gameboardElement.addEventListener("dragover", onDragOver);
gameboardElement.addEventListener("dragover", onDragOver);
gameboardElement.addEventListener("drop", onDrop);
gameboardElement.addEventListener("drop", onDrop);


// NEED TO TEST AGAINST DROPPING ON THE SAME SQUARE!!!
// listen for drop on board squares
function onDrop(event) {
    event.preventDefault();
    const square = event.target.closest(".White, .Black"); // look for either class
    if (square) {
      const type = event.dataTransfer.getData("text/plain");
      if (type === "knight") {
        knightElement.setAttribute('draggable', false); // Remove draggable from old ele
        knight = setNewKnight(square.id, gameboard);
        knightElement = generateKnight(knight);
        knightElement.setAttribute('draggable', true); // Make new elements draggable.
      } else if (type === "target") {
        targetElement.setAttribute('draggable', false);
        target = setNewTarget(square.id, gameboard);
        targetElement = generateTarget(target);
        targetElement.setAttribute('draggable', true);
      }
      enableDrag();
    }
}
