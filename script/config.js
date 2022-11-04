/**
 * 遊戲設定資料
 */
var config = {
    // 方向控制鍵
    Directions: ["Up", "Down", 'Left', 'Right'],
    // 格子屬性
    Grid: {
        width:  12, // 格子寬度
        gap:    2,  // 格子間隔
        count:  40, // 格子數
    },
    // 食物出現的機率：Apple(60%), Gasoline(10%), Ice(10%), Shield(10%), Bomb(10%)
    FoodProbability: [60, 10, 10, 10, 10],
    // 食物圖片(ID 屬性)
    FoodImage: {
        Apple:      'Apple',
        Gasoline:   'SpeedUp',
        Ice:        'SpeedDown',
        Shield:     'Shield',
        Bomb:       'Bomb'
    },
    // 食物種類
    FoodType: {
        // 一次性效果
        Reverse:    'reverse',  // 反轉方向
        Bomb:       'bomb',     // 炸彈：-50 分，如果分數 < 50，吃到直接 Game over。
        Shield:     'shield',   // 盾牌：與炸彈抵銷一次
        Apple:      'normal',   // 蘋果：+10 分
        
        // 持續性效果，持續 8 秒
        Star:       'immortal', // 星星：無敵 
        Gasoline:   'fast',     // 加速：每個 Apple +20 分
        Ice:        'slow',     // 減速：每個 Apple +5 分
    },
    // 分數
    Scores: {
        Gasoline:   20,
        Ice:        5,
        Star:       0,
        Reverse:    0,
        Shield:     0,
        Bomb:       -50,
        Apple:      10,
    },
    // 顏色屬性
    Colors: {
        // 背景色
        background: 'rgba(0, 0, 0, 0.3)',
        // 格子背景色
        block:      'rgba(255, 255, 255, 0.15)',
        // 貪食蛇顏色
        snake:      'rgb(255, 255, 255)',
    },
    // 畫面更新頻率（增量）
    FPS: {
        normal: 0,
        fast:   15,
        slow:   -7,
    },
    // 特殊效果時間
    EffectTime: 8
};

export default config;