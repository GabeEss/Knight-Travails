import './style.css';
import createBoardStructure from './gameboard-data-structure';
import generateGrid from './generate-gameboard';
import { defaultPosition } from './event-listeners';

buildDOM();

function buildDOM() {
    const body = document.body; // body of the DOM
    const main = document.createElement('div');
    main.setAttribute('id', 'main-container');
    const title = document.createElement('h1');
    title.textContent = "Knight Travails";
    const description = document.createElement('h4');
    let descriptionString = "Drag and drop the knight where you want him to move. The application will find the shortest path and display it for you.";
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

    defaultPosition(gameboard, gameboardElement, findPathButton, pathDisplay);
}
