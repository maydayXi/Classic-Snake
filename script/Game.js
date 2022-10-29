import Snake from "./Snake.js";
import Utils from "./Utils.js";
import View from "./View.js";

/**
 * 遊戲類別
 */
class Game {
    /**
     * 初始化遊戲資料
     */
    constructor() {
        this.isStart = false;       // 開始遊戲
        this.foods = [];            // 食物資料
        this.score = 0;             // 遊戲分數

        // 遊戲相關物
        this.view = new View();     // 遊戲畫面
        this.utils = new Utils();   // 共用方法

        // 渲染遊戲畫面
        this.view.renderPlayground(this.foods);
        // 開始鈕事件
        this.#bindingStartEvent();
    }

    #bindingStartEvent() {
        this.view.startButton.addEventListener(
            'click', this.utils.binding(this.startGame, this));
    }

    /**
     * 新增食物
     * @param {Vector} vector 
     * 
     * @see Vector
     */
    addFood() { 
        const x = this.utils.randomNumber(this.utils.getGridCount());
        const y = this.utils.randomNumber(this.utils.getGridCount());

        this.foods.push(this.utils.getVector(x, y)); 
    }

    /**
     * 開始遊戲
     */
    startGame() {
        this.isStart = true;
        this.snake = new Snake();           // 貪食蛇

        this.view.hidePenel();
        this.view.showInfos();
        this.view.updatePlayground(this);   // 更新遊戲畫面
        this.view.addFood(this);            // 新增食物
    }

    play() {
        if(this.isStart) {
            if (this.snakeInBoundary()) {
                if(this.sankeTouchBody()) {
                    this.view.stopUpdatePlayground();
                    this.endGame();
                }

                if(this.isEatFood()) {
                    this.removeFood();
                    this.addScore();
                    this.addSankeBody();
                    this.view.addFood(this);
                }
            } else {
                this.view.stopUpdatePlayground();
                this.endGame();
            }
        }
    }

    /**
     * 更新蛇的位置
     */
    updateSnake() { this.snake.update(); }

    /**
     * 蛇是否撞牆
     * @returns True/False
     */
    snakeInBoundary() { return this.snake.isInBoundary(this.utils.getGridCount()); }

    /**
     * 蛇是否撞自己
     * @returns True/False
     */
    sankeTouchBody() { return this.snake.isTouchBody(); }

    /**
     * 減少一個食物
     */
    removeFood() { this.foods.shift(); }

    /**
     * 蛇身體加長
     */
    addSankeBody() { this.snake.length++; }

    /**
     * 是否吃到食物
     * @param {Vector} food 
     * @returns True/False
     */
    isEatFood() { 
        let result = false;

        this.foods.forEach(food => {
            if (this.snake.isEatFood(food))
                result = true;
        });

        return result;
    }

    /**
     * 加分
     */
    addScore() { 
        this.score += 10;
        this.view.showScore(this.score);
    }

    /**
     * 重設遊戲資料
     */
    #reset() {
        this.isStart = false;
        this.foods = [];
        this.score = 0;
        this.view.showScore(this.score);
    }

    /**
     * 結束遊戲
     */
    endGame() {
        this.view.showTotal(this.score);
        this.#reset();
        this.view.hideInfos();
        this.view.showPanel();
    }

    /**
     * 鍵盤事件
     * @param {String} key 
     */
    keyDown(key) {
        if(this.isStart) {
            let direction = key.replace(/Arrow/, '');
            let speed = this.snake.getDirection(direction);
    
            if(this.utils.getDirections().includes(direction) && 
                !speed.isEqual(this.snake.speed.mul(-1)))
                this.snake.setDirection(direction);
        }
    }
};

export default Game;