export default function colorPath(array) {
    return new Promise((resolve) => {
        let count = 0; // to delay the time each square changes and to resolve the promise
        for (let i = array.length - 1; i >= 0; i--) {
            count++;
            setTimeout(() => {
                let x = array[i].square.x.toString();
                let y = array[i].square.y.toString();
                let xy = x + y;
                let element = document.getElementById(xy);
                element.classList.add("Path")
                if (i === 0) {
                    resolve();
                }
            }, (count) * 1000)
        }
    });
}