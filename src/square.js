export default class Square {
    constructor(color, xcoordinate, ycoordinate) {
        this.color = color;
        this.xcoordinate = xcoordinate;
        this.ycoordinate = ycoordinate;
    }

    getColor() {
        return this.color;
    }

    getXCoordinate() {
        return this.xcoordinate;
    }

    getYCoordinate() {
        return this.ycoordinate;
    }
}