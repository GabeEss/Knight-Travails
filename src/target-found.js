export default function targetFound(root, t) {
    if(root.square.x === t.x && root.square.y === t.y) {
        return true;
    }
}