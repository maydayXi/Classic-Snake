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
        this.FPS   = 0;             // 每秒畫面更新頻率
        this.normalFPS = 0;         // 正常的更新頻率

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
     * 開始遊戲
     */
    startGame() {
        this.isStart = true;
        this.snake = new Snake();           // 貪食蛇
        this.view.hidePenel();
        this.view.showInfos();

        this.FPS = 10;                      
        this.normalFPS = this.FPS;
        this.view.updatePlayground(this);   // 更新遊戲畫面
        this.#addFood();                    // 新增食物
        this.view.renderFoods(this.foods);  // 渲染食物
    }

    /**
     * 新增食物
     * @param {Vector} vector 
     * 
     * @see Vector
     */
    #addFood() {
        // 隨機產生食物種類
        const type = this.utils.getRandomFood();
        var food = this.#randomFoodPosition();

        // 新增食物
        this.foods.push({vector: food, type: type});

        if(type !== 'Apple') {
            food = this.#randomFoodPosition();
            // 新增沒有效果的食物
            this.foods.push({vector: food, type: 'Apple'});
        }

        // 多餘物的清理
        this.#removeFood();
    }

    #removeFood() {
        switch(this.foods.length) {
            case 2:
            case 3:
                setTimeout(() => {
                    if(this.foods.length > 1)
                        this.foods.shift();
                }, 8000);
                break;
            case 4:
                this.foods.shift();
                break;
        }
    }

    /**
     * 隨機產生食物位置（不能在蛇的位置）
     * @returns Vector
     * 
     * @see Vector
     */
    #randomFoodPosition() {
        let food = this.utils.getRandomVector();
        while (this.snake.isTouchBody(food)) 
            food = this.utils.getRandomVector();

        return food;
    }

    /**
     * 玩
     */
    play() {
        if(this.isStart) {
            if (this.#snakeInBoundary()) {
                if(this.#sankeTouchBody()) {
                    this.view.stopUpdatePlayground();
                    this.#endGame();
                }

                let ateFood;
                if((ateFood = this.#isEatFood())) {
                    this.#eat(ateFood);
                    this.#addFood();
                    this.view.renderFoods(this.foods);
                }
            } else {
                this.view.stopUpdatePlayground();
                this.#endGame();
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
    #snakeInBoundary() { return this.snake.isInBoundary(this.utils.getGridCount()); }

    /**
     * 蛇是否撞自己
     * @returns True/False
     */
    #sankeTouchBody() { return this.snake.isTouchBody(); }

    /**
     * 蛇身體加長
     */
    #addSankeBody() { this.snake.addBody(); }

    /**
     * 吃食物，依食物產生不同效果
     * @param {Object} food food object
     */
    #eat(food) {
        const effects = ['SpeedUp', 'SpeedDown'];
        const ateFood = this.foods.find(_food => _food.vector.isEqual(food));
        this.foods = this.foods.filter(_food => !_food.vector.isEqual(food));

        // 吃到蘋果
        if(ateFood.type === 'Apple') this.#eatApple();
        // 吃到炸彈：扣 50 分
        if(ateFood.type === 'Bomb') this.#eatBomb();

        // 更新狀態
        this.snake.updateStatusByFood(ateFood.type);
        this.view.showStatus(this.snake.status);

        // 取得速度並更新
        const _fps = this.utils.getFPSByStatus(this.snake.status);
        
        // 吃到加速或減速
        if(effects.includes(ateFood.type)) {
            // 清除上一個效果狀態
            this.#clearEffect();
            if(this.FPS + _fps > 0) 
                this.FPS += _fps;
        }

        // 變更效果時間
        let duration = this.utils.getDurationBystaus(this.snake.status);
        if(duration) this.#resetEffect(duration);
    }

    /**
     * 吃蘋果
     */
    #eatApple() {
        let _score = this.utils.getScoreByStatus(this.snake.status);
        this.#addScore(_score);
        this.#addSankeBody();

        // 紀錄正常的速度，並依長度增加速度
        if(this.snake.status !== 'fast' && this.snake.status !== 'slow') {
            this.FPS += 0.5;
            this.normalFPS = this.FPS;
        }
    }

    /**
     * 吃炸彈
     */
    #eatBomb() {
        // 沒有盾牌
        if(this.snake.status !== 'shield') {
            // 分數 < 50，結束遊戲
            if (this.score < 50) {
                this.#addScore(-50);
                this.view.stopUpdatePlayground();
                this.#endGame();
            } else {
                this.#addScore(-50);
            }
        } else {
            this.snake.status = 'normal';
            this.view.showStatus();
        }
    }

    /**
     * 重設效果
     */
    #clearEffect() { if(this.effectTime) clearTimeout(this.effectTime); }

    /**
     * 重設效果
     * @param {Number} duration
     * 
     * @see setTimeout 
     */
    #resetEffect(duration) {
        this.effectTime = setTimeout(() => {
            this.snake.status = 'normal';
            this.view.showStatus();
            
            this.FPS = this.normalFPS;
            console.log(`current FPS => ${this.FPS}, normal FPS = ${this.normalFPS}`);
        }, duration);
    }

    /**
     * 是否吃到食物
     * @param {Vector} food 
     * @returns True/False
     */
    #isEatFood() { 
        let result = 0;

        this.foods.forEach(food => {
            if (this.snake.isEatFood(food.vector))
                result = food.vector;
        });

        return result;
    }

    /**
     * 加分
     */
    #addScore(score) {
        this.score += score;
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
        this.view.showStatus();
    }

    /**
     * 結束遊戲
     */
    #endGame() {
        this.view.showTotal(this.score);
        this.#reset();
        this.view.hideInfos();
        this.view.showPanel();
        this.#clearEffect();
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