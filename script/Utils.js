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
     * 取得隨機向量
     * @returns Vector
     * 
     * @see Vector
     */
    getRandomVector() {
        return new Vector(
            this.randomNumber(config.Grid.count),
            this.randomNumber(config.Grid.count)
        );
    }

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
     * 隨機產生食物
     * @returns {String} Image DOM id
     */
    getRandomFood() {
        const images = config.FoodImage;
        const types  = Object.keys(images).map(key => images[key]);
        const probability = config.FoodProbability;

        return this.#randFood(types, probability);
    }

    /**
     * 依不同機率產生隨機食物
     * @param {Array} types food types
     * @param {Array} probability food types probability
     * @returns Food type
     */
    #randFood(types, probability) {
        var array = [];
        var i, sum = 0;

        for (i = 0; i < probability.length - 1; i++) {
            sum += (probability[i] / 100.0);
            array[i] = sum;
        };

        // [0 ~ 1]
        var r = Math.random();
        for(i = 0; i < array.length && r >= array[i]; i++) ;

        return types[i];
    }

    /**
     * 依貪食蛇狀態取得圖片來源
     * @param {String} status snake status
     * @returns {String} Image src
     */
    getFoodImageSrcByStatus(status) {
        const types = config.FoodType;
        const _id = Object.keys(types).find(key => types[key] === status);
        return this.$(config.FoodImage[_id]).src;
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

    /**
     * 依狀態取得遊戲畫面更新頻率
     * @param {String} status snake status
     * @returns {Number} Game FPS
     * 
     * 0 => normal
     * 
     * 15 => fast
     * 
     * -7 => slow
     */
    getFPSByStatus(status) { 
        switch(status) {
            case 'fast':    return config.FPS.fast;
            case 'slow':    return config.FPS.slow;
            default:        return config.FPS.normal;
        }
    }

    /**
     * 依狀態取得遊戲分數
     * @param {String} status snake status
     * @returns {Number} score
     * 
     * fast => 30
     * 
     * slow => 5
     * 
     * else => 10
     */
    getScoreByStatus(status) {
        switch(status) {
            case 'fast':return config.Scores.Gasoline;
            case 'slow':return config.Scores.Ice;
            default:    return config.Scores.Apple;
        }
    }

    /**
     * 依狀態取得計時器
     * @param {String} status snake status
     * @returns {Number} 計時秒數（毫秒）
     * 
     * immortal, fast, slow => 8000ms
     * 
     * else => 0ms
     */
    getDurationBystaus(status) {
        switch(status) {
            case 'immortal':// 無敵
            case 'fast':    // 加速
            case 'slow':    // 減速
                return config.EffectTime * 1000;
            default:        // 非持續性效果
                return 0;
        }
    }
};

export default Utils;