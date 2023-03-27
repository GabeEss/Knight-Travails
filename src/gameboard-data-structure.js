import Square from "./square";

// Creates an array of 8 elements. Each element contains an array of 8 elements.
// Each of those elements contains a square object, which holds the color of the square and it's grid coordinates.
// O(n^2) time complexity, where n is the number of rows/columns in the grid.
// This function creates the 8x8 gameboard.
export default function createBoardStructure () {
    let array = new Array(8);
    for(let i = 0; i < array.length; i++) {
        array[i] = new Array(8);
        for(let j = 0; j < array[i].length; j++) {
            if(i % 2 === 0 && j % 2 === 0)
                array[i][j] = new Square("Black", i, j);
            else if(i % 2 !== 0 && j % 2 === 0) 
                array[i][j] = new Square("White", i, j);
            else if(i % 2 === 0 && j % 2 !== 0)
                array[i][j] = new Square("White", i, j);
            else
                array[i][j] = new Square("Black", i, j);
        }
    }

    return array;
}