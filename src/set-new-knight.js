export default function setNewKnight(elementID, gameboard) {
    let xy = elementID.toString();
    const x = xy.substring(0, 1);
    const y = xy.substring(1, 2);
    return gameboard[x][y];
}