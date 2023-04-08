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

    enableDrag(gameboard, gameboardElement);

    // Click event for the "Find Path" button.
    findPathButton.addEventListener('click', () => pathButtonClick
    (findPathButton, gameboard, pathDisplay));
}

async function pathButtonClick
(findPathButton, gameboard, pathDisplay) {
    knightElement.setAttribute('draggable', false);
    targetElement.setAttribute('draggable', false);
    findPathButton.style.pointerEvents = 'none';

    // Wait until the path is complete before allowing user to drag again.
    let string = await findPathWithPromise(knight, target, gameboard);
    pathDisplay.textContent = string;

    knightElement.setAttribute('draggable', true);
    targetElement.setAttribute('draggable', true);
    findPathButton.style.pointerEvents = 'auto';
}

// Enables the drag events.
function enableDrag(gameboard, gameboardElement) {
    gameboardElement.addEventListener("dragstart", (event) => onDragStart(event));
    gameboardElement.addEventListener("dragover", (event) => onDragOver(event));
    gameboardElement.addEventListener("drop", (event) => { 
    onDrop (event, gameboard)});
}

// Determine if dragging the knight or the target.
function onDragStart(event) {
    removeColor();
    if(event.target.classList.contains('knight'))
        event.dataTransfer.setData("text/plain", 'knight');
    else
        event.dataTransfer.setData("text/plain", 'target');
}

function onDragOver(event) {
    event.preventDefault();
}

// What happens when the knight/target are dropped.
function onDrop(event, gameboard) {
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
    }
}