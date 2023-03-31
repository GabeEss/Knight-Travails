import findPath from "./path-logic";

export default function findPathWithPromise(knight, target, gameboard) {
    return new Promise((resolve, reject) => {
        
      let string = findPath(knight, target, gameboard);
      resolve(string);
    });
  }