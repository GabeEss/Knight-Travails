import targetFound from "./target-found";


// The tree is already sorted breadth-first and without duplicates.
// Therefore this function checks depth-first until it finds the target value and
// pushes the node and its parents into closestArray as it climbs back to the root node.
export default function findClosest(root, target, closestArray) {
    // If the target is found, push the node that found it onto the array and then return the node.
    if(targetFound(root, target)) {
        closestArray.push(root);
        return root;
    }
    
    for (let child of root.children) {
        // When the target is found, it initializes "node" to be something that isn't undefined.
        let node = findClosest(child, target, closestArray);

        // Everything that's not along the path to the target node is undefined.
        // console.log(node);

        // Because "node" isn't falsy, push the current root onto the array.
        // Return the current root, so that "node" continutes to not be falsy for the previous
        // recursive loop.
        if(node) {
            closestArray.push(root);
            return root;
        }
    }
}