/**
 * 向量類別
 */
class Vector {
    /**
     * 建構向量
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * 複製向量
     * @returns new Vecotr
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * 向量加法
     * @param {Vector} vector 
     * @returns new Vector
     */
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    /**
     * 向量減法
     * @param {Vector} vector 
     * @returns new Vector
     */
    reduce(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    /**
     * 向量乘法
     * @param {Number} n 
     * @returns new Vector
     */
    mul(n) {
        return new Vector(this.x * n, this.y * n);
    }

    /**
     * 判斷向量是否相等
     * @param {Vector} vector 
     * @returns True/False
     */
    isEqual(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    /**
     * Vector value to string
     * @returns String
     */
    toString() { return `(${this.x}, ${this.y})`; }
};

export default Vector;