import Vector from "./Vector.js";
import config from "./config.js";

/**
 * 共用函式類
 */
class Utils {
    constructor() { };

    /**
     * Get HTML DOM by id
     * @param {String} _id DOM id attribute
     * @returns HTML DOM
     */
    $(_id) { return document.getElementById(_id); }

    /**
     * 事件綁定方法
     * @param {Function} func 要執行的函數
     * @param {Object} src 呼叫的來源物件
     * @returns Function
     */
    binding(func, src) { return () => func.call(src); }

    /**
     * 取得隨機亂數
     * @param {Number} n 最大值
     * @returns 隨機亂數
     */
    randomNumber(n) { return parseInt(Math.random() * n); }

    /**
     * 取得每秒更新頻率
     * @param {Number} fps 每秒影格數
     * @returns 畫面更新頻率
     */
    getUpdatePerSecond(fps) { return 1000/fps; }

    /**
     * 取得網格數量
     * @returns Number
     */
    getGridCount() { return config.Grid.count; }

    /**
     * 取得格子寬度
     * @returns Number
     */
    getGridWidth() { return config.Grid.width; }

    /**
     * 取得每秒更新頻率
     * @returns Number
     */
    getFPS() { return config.FPS; }

    /**
     * 取得方向設定
     * @returns Direction array
     */
    getDirections() { return config.Directions; }

    /**
     * Get Vector object
     * @param {Number} x 
     * @param {Number} y 
     * @returns Vector
     * 
     * @see Vector
     */
    getVector(x, y) { return new Vector(x, y); }

    /**
     * 取得指定向量的位置
     * @param {Vector} vector 
     * @returns Position Object
     */
    getPositionByVector(vector) {
        var {x, y} = {...vector};

        x = x * config.Grid.width + (x - 1) * config.Grid.gap;
        y = y * config.Grid.width + (y - 1) * config.Grid.gap;

        return { x: x, y: y };
    }

    /**
     * 取得指定顏色
     * @param {String} color witch color
     * @returns Color string
     */
    getColor(color) {
        switch(color) {
            case 'playground':
                return config.Colors.background;
            case 'block':
                return config.Colors.block;
            case 'snake':
                return config.Colors.snake;
            case 'food':
                return config.Colors.food;
        }
    }

    /**
     * 設定遊戲畫面尺寸
     * @param {View} view 
     * 
     * @see View
     */
    setCanvasSize(view) {
        let gridWidth = config.Grid.width * config.Grid.count;
        let gapCount = config.Grid.count - 1;
        let gapWidth = gapCount * config.Grid.gap;

        view.canvas.width = gridWidth + gapWidth;
        view.canvas.height = view.canvas.width;
    }
};

export default Utils;