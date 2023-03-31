import findPathWithPromise from "./find-path-with-promise";
import removeColor from './remove-path-color';
import setNewKnight from './set-new-knight';
import setNewTarget from './set-new-target';
import generateKnight from './generate-knight';
import generateTarget from './generate-target';
import setDefaultKnight from "./set-default-knight";
import setDefaultSquare from "./set-default-square";

let knight = "";
let knightElement = "";
let target = "";
let targetElement = "";

export function defaultPosition(gameboard, gameboardElement, findPathButton, pathDisplay) {
    knight = setDefaultKnight(gameboard); // get knight's square (the root node position)
    knightElement = generateKnight(knight); // put the knight on the DOM and get the element
    target = setDefaultSquare(gameboard); // get the target square
    targetElement = generateTarget(target);

    knightElement.setAttribute('draggable', true); // Make the elements draggable.
    targetElement.setAttribute('draggable', true);

    // Listen for a dragstart event to initiate the drag. The data is used to represent
    // whether the dragged element is the knight or the target.
    knightElement.addEventListener("dragstart", (event) => onKnightDragStart(event));
    targetElement.addEventListener("dragstart", (event) => onTargetDragStart(event));

    // Click event for the "Find Path" button.
    findPathButton.addEventListener('click', (event) => pathButtonClick
    (findPathButton, gameboardElement, gameboard, pathDisplay));

    // Listen for dragover and drop events on board squares.
    gameboardElement.addEventListener("dragover", (event) => onDragOver(event));
    gameboardElement.addEventListener("drop", (event) => onDrop
    (event, gameboard, gameboardElement));
}

async function pathButtonClick
(findPathButton, gameboardElement, gameboard, pathDisplay) {
    findPathButton.removeEventListener('click', pathButtonClick);
    knightElement.setAttribute('draggable', false);
    targetElement.setAttribute('draggable', false);

    // Wait until the path is complete before allowing user to drag again.
    let string = await findPathWithPromise(knight, target, gameboard);
    pathDisplay.textContent = string;

    knightElement.setAttribute('draggable', true);
    targetElement.setAttribute('draggable', true);
    enableDrag(gameboard, gameboardElement);
    findPathButton.addEventListener('click', (event) => pathButtonClick
    (findPathButton, gameboardElement, gameboard, pathDisplay));
}

function onKnightDragStart(event) {
    removeColor();
    event.dataTransfer.setData("text/plain", "knight");
}

function onTargetDragStart(event) {
    removeColor();
    event.dataTransfer.setData("text/plain", "target");
}

// Enables the drag events after they have been removed.
function enableDrag(gameboard, gameboardElement) {
    knightElement.addEventListener("dragstart", (event) => onKnightDragStart(event));
    targetElement.addEventListener("dragstart", (event) => onTargetDragStart(event));
    gameboardElement.addEventListener("dragover", (event) => onDragOver(event));
    gameboardElement.addEventListener("drop", (event) => { 
    onDrop (event, gameboard, gameboardElement)});
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event, gameboard, gameboardElement) {
    event.preventDefault();
    const square = event.target.closest(".White, .Black"); // look for either class
    if (square) {
      const type = event.dataTransfer.getData("text/plain");
      // Test to see if dragging a knight/target and that the square
      // being dropped on does not already hold the knight or target.
      if (type === "knight" && square.id !== targetElement.id) {
        knightElement.classList.remove('knight'); // Remove the knight class from the old element
        knightElement.setAttribute('draggable', false); // Remove draggable from old element
        knight = setNewKnight(square.id, gameboard); // Set the new knight on the gameboard.
        knightElement = generateKnight(knight); // Get the new knight element in the DOM.
        knightElement.setAttribute('draggable', true); // Make the new element draggable.
      } else if (type === "target" && square.id !== knightElement.id) {
        targetElement.classList.remove('target');
        targetElement.setAttribute('draggable', false);
        target = setNewTarget(square.id, gameboard);
        targetElement = generateTarget(target);
        targetElement.setAttribute('draggable', true);
      }
      enableDrag(gameboard, gameboardElement); // restore any lost event listeners
    }
}