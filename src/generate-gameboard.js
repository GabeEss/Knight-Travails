export default function generateGrid(boardData) {
    const table = document.createElement("table");
    
    // Create the rows and squares
    for (let i = 0; i < boardData.length; i++) {
      const row = document.createElement("tr");
      const numberCell = document.createElement("td");
      numberCell.textContent = boardData.length - i;
      numberCell.classList.add('number-cell');
      row.appendChild(numberCell);
      
      // Add the squares for this row
      for (let j = 0; j < boardData[i].length; j++) {
        const square = boardData[i][j];
        const cell = document.createElement("td");
        cell.classList.add(square.color);
        cell.setAttribute('id', 'square.x');
        cell.setAttribute('id', 'square.y');
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }

    // Create the row of letters beneath the table
    const letterRow = document.createElement("tr");


    // Add an empty cell to the left of the letters
    const emptyCell = document.createElement("td");
    emptyCell.classList.add('empty-cell');
    letterRow.appendChild(emptyCell);
    
    // Add the letters to the row
    for (let i = 0; i < 8; i++) {
        const letterCell = document.createElement("td");
        letterCell.classList.add('letter-cell');
        letterCell.textContent = String.fromCharCode(97 + i);
        letterRow.appendChild(letterCell);
    }
    
    table.appendChild(letterRow);
    
    return table;
}