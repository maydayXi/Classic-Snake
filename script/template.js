// 說明頁
const template = 
    `
        <h3 class='subtitle'>食物種類</h3>
        <div class='foodtype'>        
            <div class="foodcard">
                <img src="./images/apple.svg" alt="Apple">
                <span>+10分</span>
            </div>
            <div class="foodcard">
                <img src="./images/bomb.svg" alt="Bomb">
                <span>-50分</span>
            </div>
            <div class="foodcard">
                <img src="./images/gasoline.svg" alt="Gasoline">
                <span>加速 8 秒</span>
            </div>
            <div class="foodcard">
                <img src="./images/ice.svg" alt="Ice">
                <span>減速 8 秒</span>
            </div>
            <div class="foodcard">
                <img src="./images/shield.svg" alt="Shield">
                <span>抵銷炸彈<br />一次</span>
            </div>
        </div>
        <h3 class='subtitle'>玩法</h3>
        <p class='help-content'>
            分數歸零、撞牆、撞到自已就結束遊戲
        </p>
    `;

export default template;