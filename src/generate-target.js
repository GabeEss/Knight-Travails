export default function generateTarget(target) {
    console.log(target);
    let coordinates = target.x.toString() + target.y.toString(); // get target coordinates
    console.log(coordinates);
    let element = document.getElementById(coordinates); // find the element that holds the target
    element.classList.add("target"); // add the target class to the element
    element.innerText = "Target"; // change the inner text

    return element;
}