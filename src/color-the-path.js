export default function colorPath(array) {
    let count = 0; // to delay the time each square changes
    for(let i = array.length - 1; i >= 0; i--) {
        count++;
        setTimeout(() => {
            let x = array[i].square.x.toString();
            let y = array[i].square.y.toString();
            let xy = x + y;
            console.log(xy);
            let element = document.getElementById(xy);
            element.classList.add("Path")
        }, (count) * 1000)
    }
}