import Game from "./Game.js";

// 遊戲物件
const game = new Game();

// 鍵盤事件註冊
const keyDown = e => game.keyDown(e.key);
window.addEventListener('keydown', keyDown);