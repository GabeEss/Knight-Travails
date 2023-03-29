export default class Square {
    constructor(color, xcoordinate, ycoordinate) {
        this.color = color;
        this.x = xcoordinate;
        this.y = ycoordinate;
    }

    getColor() {
        return this.color;
    }

    getXCoordinate() {
        return this.x;
    }

    getYCoordinate() {
        return this.y;
    }
}