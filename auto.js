function calc_x_y() {
    const game = window.game;
    const scenes = game.scene.scenes;

    var hold = null;
    scenes.forEach(scene => {
        const children = scene.children.list;
        children.forEach(child => {
            if (child.type == "Image") {
                hold = child;
            }
        });
    });

    x = 300
    y = 200

    var targets = []
    scenes.forEach(scene => {
        const children = scene.children.list;
        children.forEach(child => {
            if (child.type == "Image" && child.frame.name == hold.frame.name && child != hold) {
                targets.push(child);
            }
        });
    });

    if (targets.length > 0) {
        // console.log(targets)
        min_y = 9999999;
        min_target = null;
        targets.forEach(target => {
            if (target.y < min_y) {
                min_y = target.y;
                min_target = target;
            }
        })

        x = min_target.x / 2;
    }

    return {x: x, y: y}
}

function simulatePhaserClick(x, y) {
    // 创建鼠标按下事件
    const mouseDownEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
    });

    // 创建鼠标抬起事件
    const mouseUpEvent = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
    });

    // 获取目标元素
    const element = document.elementFromPoint(x, y);

    if (element) {
        // 触发按下事件
        element.dispatchEvent(mouseDownEvent);

        // 短暂延迟后触发抬起事件
        setTimeout(() => {
            element.dispatchEvent(mouseUpEvent);
        }, 100); // 100毫秒后释放
    } else {
        console.error(`No element found at (${x}, ${y})`);
    }
}

function clickGameOver() {
    // 子字符串要匹配的类名部分
    var substring = 'gameOver--restartBtn';

    // 获取所有 div 元素
    var divs = document.querySelectorAll('div');

    // 遍历所有 div 元素
    divs.forEach(function(div) {
        // 检查类名是否包含指定子字符串
        if (div.className.includes(substring)) {
            div.click()
        }
    });
}

setInterval(() => {
    clickGameOver()

    xy = calc_x_y()
    simulatePhaserClick(xy.x, xy.y)
}, 500)
