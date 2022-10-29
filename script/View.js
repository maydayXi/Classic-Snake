import Utils from "./Utils.js";
import Vector from "./Vector.js";

/**
 * View class
 * 頁面更新
 */
class View {
    /**
     * 頁面初始設定
     * @param {Object} config Game data config
     */
    constructor() {
        // 共用方法物件
        this.utils       = new Utils();

        // 頁面元件
        this.startButton = this.utils.$("btnStart");
        this.canvas      = this.utils.$('Canvas');
        this.ctx         = this.canvas.getContext('2d');
        this.panel       = this.utils.$('Panel');
        this.infos       = this.utils.$('Infos');
        this.score       = this.infos.children[0];
    }

    /**
     * 渲染遊戲畫面
     */
    renderPlayground(foods) {
        let count = this.utils.getGridCount();

        // 初始化畫面尺寸
        this.utils.setCanvasSize(this);
        this.ctx.fillStyle = this.utils.getColor('playground');
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 渲染網格
        for (let i = 0; i < count; i++)
            for (let j = 0; j < count; j++) 
                this.#renderBlock(
                    this.utils.getVector(i, j), 
                    this.utils.getColor('block')
                );

        // 初始食物
        this.#renderFoods(foods);
    }

    /**
     * 繪製格子
     * @param {Vector} vector 
     * @param {String} color grid's background color
     * 
     * @see Vector
     */
    #renderBlock(vector, color) {
        const {x, y} = this.utils.getPositionByVector(vector);
        let width = this.utils.getGridWidth();

        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, width);
    }

    /**
     * 渲染貪食蛇
     * @param {Snake} snake snake object
     * 
     * @see Snake
     */
    #renderSanke(snake) {
        snake.body.forEach(body => this.#renderBlock(
            body, this.utils.getColor('snake')));
    }

    /**
     * 渲染食物
     * @param {Array} foods food array
     */
    #renderFoods(foods) {
        foods.forEach(food => this.#renderBlock(food, this.utils.getColor('food')));
    }

    /**
     * 更新遊戲畫面
     * @param {Snake} snake 
     * 
     * @see Snake
     */
    updatePlayground(game) {
        this.renderPlayground(game.foods);
        game.updateSnake();
        this.#renderSanke(game.snake);

        this.timer = setTimeout(() => this.updatePlayground(game), 
            this.utils.getUpdatePerSecond(this.utils.getFPS()));

        game.play();
    }

    stopUpdatePlayground() {
        clearTimeout(this.timer);
        this.timer = -1;
    }

    /**
     * 新增食物
     * @param {Game} game 遊戲主體
     * 
     * @see Game
     */
    addFood(game) {      
        // 新增食物
        game.addFood();
        this.#renderFoods(game.foods);
    }

    /**
     * 隱藏開始畫面
     */
    hidePenel() { this.panel.style.display = 'none'; }

    /**
     * 顯示開始畫面
     */
    showPanel() { this.panel.style.display = 'block'; }

    /**
     * 顯示遊戲資訊
     */
    showInfos() { this.infos.style.display = 'inline-block'; }

    /**
     * 隱藏遊戲資訊
     */
    hideInfos() { this.infos.style.display = 'none'; }

    /**
     * 顯示遊戲分數
     * @param {Number} score game score
     */
    showScore(score) { this.score.innerHTML = `Score：${score}`; }

    /**
     * 顯示遊戲總分
     * @param {Number} score game total score
     */
    showTotal(score) { this.utils.$('Score').innerHTML = `Total：${score}`; }
}

export default View;