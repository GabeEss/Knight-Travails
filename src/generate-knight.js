export default function generateKnight(knight) {
    console.log(knight);
    let coordinates = knight.x.toString() + knight.y.toString(); // get knight coordinates
    console.log(coordinates);
    let element = document.getElementById(coordinates); // find the element that holds the knight
    element.classList.add("knight"); // add the knight class to the element
    element.innerText = "Knight"; // change the inner text

    return element;
}