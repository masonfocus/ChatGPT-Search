let delay = 50; // 延迟时间，可以根据需要调整
let hasExecuted = false;
const targetDivSelector = 'div[data-state="closed"][aria-haspopup="menu"][aria-expanded="false"].group.flex.cursor-pointer.items-center';


const observer = new MutationObserver((mutationsList, observer) => {
    if (hasExecuted) {
        return;
    }

    // 检测文本区域是否存在
    const textarea = document.getElementById('prompt-textarea');
    if (!textarea) {
        return; // 如果文本区域不存在，什么也不做，继续等待
    }

    // 检测特定的div元素是否存在
    const targetDiv = document.querySelector(targetDivSelector);
    if (!targetDiv) {
        return; // 如果目标div不存在，什么也不做，继续等待
    }

    // 读取URL中的查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    if (!query) {
        return; // 如果没有查询参数，什么也不做，继续等待
    }

    // 检测发送按钮是否存在
    const button = textarea.nextElementSibling;
    if (!button || button.nodeName !== 'BUTTON') {
        return; // 如果按钮不存在或不是按钮，什么也不做，继续等待
    }

    // 如果所有条件都满足，则断开观察器并执行填写和点击操作
    observer.disconnect();
    hasExecuted = true;
    
    // 设置延迟执行，以模拟人工输入
    setTimeout(() => {
        simulateTyping(textarea, query, button);
    }, delay);
});

// 开始观察页面变化
observer.observe(document.body, { childList: true, subtree: true });

function simulateTyping(textarea, text, button) {
    textarea.focus();
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < text.length) {
            const char = text.charAt(index++);
            textarea.value += char;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
            clearInterval(intervalId);
            textarea.blur();
            button.click();
        }
    }, delay); // 控制每个字符的输入速度
}

observer.observe(document, { childList: true, subtree: true });
