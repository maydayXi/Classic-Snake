/**
 * 遊戲設定資料
 */
var config = {
    // 方向控制鍵
    Directions: ["Up", "Down", 'Left', 'Right'],
    Grid: {
        width:  12, // 格子寬度
        gap:    2,  // 格子間隔
        count:  40, // 格子數
    },
    Colors: {
        // 背景色
        background: 'rgba(0, 0, 0, 0.3)',
        // 格子背景色
        block:      'rgba(255, 255, 255, 0.15)',
        // 貪食蛇顏色
        snake:      'rgb(255, 255, 255)',
        // 食物顏色
        food:       'rgb(255, 0, 0)',
    },
    FPS: 30,    // Frame Per Second
};

export default config;