import './style.css';
import createBoardStructure from './gameboard-data-structure';
import generateGrid from './generate-gameboard';
import setDefaultKnight from './set-default-knight';
import setDefaultSquare from './set-default-square';
import generateKnight from './generate-knight';
import generateTarget from './generate-target';
import findPath from './path-logic';


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

// Highlight each element by attaching a class to it that colors it gold and remove the class
// after the user attempts to drag the knight or target. 
// Remove the option to interact with anything until that is done.
// Create a promise/await kind of thing before enabling that interaction.
// In order to change the knight or target, allow the user to drag the knight or target.
// Drag and drop should start an event that sets the knight/target's new position.
// Might need to make it so you can't click on anything during this time, but maybe not
// necessary.

findPathButton.addEventListener('click', () => {
    let string = findPath(knight, target, gameboard);
    pathDisplay.textContent = string;
})
