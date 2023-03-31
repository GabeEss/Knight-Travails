export default function generateKnight(knight) {
    let coordinates = knight.x.toString() + knight.y.toString(); // get knight coordinates
    let element = document.getElementById(coordinates); // find the element that holds the knight
    element.classList.add("knight"); // add the knight class to the element

    return element;
}