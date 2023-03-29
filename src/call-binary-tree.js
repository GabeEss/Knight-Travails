import { createTree } from './create-binary-trees';

// This function calls the createTree function after creating the root node from
// the starting position of the knight.
export default function callTree(k, gb) {
    let root = new Node(gb[k.x][k.y], []);
    let addedNodes = new Set(); // The hashset to screen against duplicate values.
    return createTree(root, addedNodes, gb);
}

export class Node {
    constructor(square, children) {
        this.square = square;
        this.children = children;
    }
}