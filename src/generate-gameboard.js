export default function generateGrid(boardData) {
    const table = document.createElement("table"); // The table to hold the board.

    // This variable helps to adjust the number cell to be correctly displayed from 1 to 8
    // in a column to the left of the chessboard.
    let number = 0;

    // Set up a column that holds all the visual coordinates for the chess board's y axis.
    // "i" is the yaxis index and "j" is the xaxis index.
    // The table appends children from left to right, top to bottom.
    // So we start with the top of the yaxis (7) and the bottom of the xaxis (0).
    for (let i = boardData.length - 1; i >= 0; i--) {
      const row = document.createElement("tr");
      row.classList.add("row");
      const numberCell = document.createElement("td");

      // From top to bottom the number cell must show 8 to 1 along the yaxis.
      numberCell.textContent = (boardData.length) - number;
      
      numberCell.classList.add('number-cell');
      row.appendChild(numberCell);

      for (let j = 0; j < boardData[i].length; j++) {
        const square = boardData[j][i];
        const cell = document.createElement("td");
        cell.classList.add(square.color); // the color of a tile will appear as a class
        let coordinates = square.x.toString() + square.y.toString(); // the bottom left is 00, top right is 77
        cell.setAttribute('id', coordinates); // the coordinates of the tile will be in the element's id
        row.appendChild(cell);
      }
      number++;
      table.appendChild(row);
    }

    // Create the row of letters beneath the table to display the letter coordinates of the board.
    const letterRow = document.createElement("tr");

    // Add an empty cell to the left of the letters
    const emptyCell = document.createElement("td");
    emptyCell.classList.add('empty-cell');
    letterRow.appendChild(emptyCell);
    
    // Add the letters to the row
    for (let i = 0; i < 8; i++) {
        const letterCell = document.createElement("td");
        letterCell.classList.add('letter-cell');
        letterCell.textContent = String.fromCharCode(65 + i);
        letterRow.appendChild(letterCell);
    }
    
    table.appendChild(letterRow);
    
    return table;
}