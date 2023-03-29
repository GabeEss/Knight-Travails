import addChildren from "./add-children";

// This function takes the root node (the knight's starting position).
// Then it adds the node to a queue. The node at the top of the queue is popped.
// The value is passed into the addChildren function.
// The addChildren function screens for moves out of bounds and moves that
// have already been completed.
// Those children/potential moves are added onto the queue.
// The loop ends when all of the children have been added. The
// time complexity of this function is O(n), where n is the number of squares on the grid (64).
export function createTree(root, addedNodes, gb) {
    // let i = 0; // To count the number of moves from the root
    let q = [root]; // A queue to ensure the tree is created breadth-first

    // This loop continues while the queue isn't empty.
    // 64 is the number of squares on a chess board.
    while (q.length > 0) {
        let node = q.shift(); // pop the node from the front of the queue
        addChildren(node, addedNodes, gb); // create children for the node
        
        for (let child of node.children) {
            // console.log(i++); // should be 63
            // console.log(child);
            q.push(child);
        }
    }

    return root;
}


