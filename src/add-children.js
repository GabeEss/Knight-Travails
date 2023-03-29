import { Node } from "./call-binary-tree";

// Adds children to a node based on the moves available to the knight at a given square.
// Screens against duplicates through a set called addedNodes.
// Screens against out of bounds by continuing through the loop when a child is found to be out
// of bounds.
export default function addChildren(root, addedNodes, gb) {

    // Go through the potential moves a knight can make.
    // If a coordinate would be out of bounds, it is skipped.
    // If a coordinate is a duplicate, it is checked against the stored set of values.
    // A knight can move + or - 1 on the x or y axis or + or - 2 on the x or y axis.
    // If it moves an absolute value of 1 on the x or y axis, it must move an absolute value of
    // 2 on the opposing axis. This means 8 potential movement options.
    for (let [dx, dy] of [
        [-1, -2], [-2, -1], [1, -2], [-1, 2],
        [2, -1], [-2, 1], [2, 1], [1, 2]
    ]) {
        
        const x = root.square.x + dx; // operate on the current x axis with a potential move
        const y = root.square.y + dy; // do the same with the current y axis

        // Determine if either potential value is out of bounds.
        if (x < 0 || x >= gb.length || y < 0 || y >= gb[0].length) {
            continue; // Skip this child and move on to the next one
        }

        // Create a new child for the current node.
        const child = new Node(gb[x][y], []);

        // Check the child against the set for duplicates.
        // If the set does not hold the potential coordinates,
        // push the new child onto the current node's array of children.
        if (child && !addedNodes.has(`${x},${y}`)) {
            root.children.push(child);
            addedNodes.add(`${x},${y}`);
        }
    }
}