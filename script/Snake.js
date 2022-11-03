import Vector from "./Vector.js";

/**
 * 貪食蛇類別
 */
class Snake {
    constructor() {
        this.body = [];
        this.length = 5;
        this.head = new Vector(0, 0);
        this.speed = new Vector(1, 0);
        this.direction = 'Right';
        this.status = 'normal';
    }

    /**
     * 增加長度
     */
    addBody() { this.length++; }

    update() {
        if(this.body.length > this.length) 
            this.body.shift();
        else {
            let newHead = this.head.add(this.speed);
            this.body.push(this.head);
            this.head = newHead;
        }
    }

    /**
     * Get Direction
     * @param {String} direction 
     * @returns Vector
     * 
     * @see Vector
     */
    getDirection(direction) {
        switch(direction) {
            case "Right":   return new Vector(1, 0);
            case "Left":    return new Vector(-1, 0);
            case "Up":      return new Vector(0, -1);
            case "Down":    return new Vector(0, 1);
        }
    }

    /**
     * 設定前進方向
     * @param {String} direction 
     * 
     * @see Vector
     */
    setDirection(direction) {
        switch(direction) {
            case "Right":
                this.speed = new Vector(1, 0);
                break;
            case "Left":
                this.speed = new Vector(-1, 0);
                break;
            case "Up":
                this.speed = new Vector(0, -1);
                break;
            case "Down":
                this.speed = new Vector(0, 1);
                break;
        }
    }

    /**
     * 是否吃到食物
     * @param {Vector} food 食物向量
     * @returns True/False
     */
    isEatFood(food) { return this.head.isEqual(food); }

    /**
     * check snake is in boundary or not.
     * @param {Number} range 
     * @returns True/False
     */
    isInBoundary(range) {
        const {x, y} = {...this.head};
        const inVerticalRange = 0 <= y && y < range;
        const inHorizontalRange = 0 <= x && x < range;

        return inVerticalRange && inHorizontalRange;
    }

    /**
     * 是否碰撞身體
     * @returns True/False
     */
    isTouchBody(food) {
        let result = false;

        if (food)
            if(this.head.isEqual(food))
                return this.head.isEqual(food);

        this.body.forEach(_body => {
            if(food) {
                if(food.isEqual(_body)) {
                    result = food.isEqual(_body);
                }
            } else {
                if(this.head.isEqual(_body)) {
                    result = this.head.isEqual(_body);
                }
            }
        });

        return result;
    }

    /**
     * 依食物種類更新狀態
     * 
     * @param {String} food food type(DOM id)
     * 
     * @see config.js
     */
    updateStatusByFood(food) {
        switch(food) {
            case 'SpeedDown':
                this.status = 'slow';
                break;
            case 'SpeedUp':
                this.status = 'fast';
                break;
            case 'Shield':
                this.status = 'shield';
                break;
            case 'Star':
                this.status = 'immortal';
                break;
        }
    }
};

export default Snake;