export default function arrayToChess(array) {
    let chess = [];

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    for(let i = 0; i < array.length; i++) {
        let xcoordinate = letters[array[i].square.x];
        let ycoordinate = array[i].square.y + 1;

        chess.push({position: xcoordinate + ycoordinate});
    }

    return chess;
}