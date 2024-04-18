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

    // 读取URL中的查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const paste = urlParams.get('paste');

    // 根据URL参数执行不同操作
    if (query) {
        // 检测发送按钮是否存在
        const button = textarea.nextElementSibling;
        if (!button || button.nodeName !== 'BUTTON') {
            return; // 如果按钮不存在或不是按钮，什么也不做，继续等待
        }
        observer.disconnect();
        hasExecuted = true;
        // 执行模拟打字操作
        setTimeout(() => {
            simulateTyping(textarea, query, button);
        }, delay);
    } else if (paste) {
        observer.disconnect();
        hasExecuted = true;
        // 从剪贴板粘贴内容
        navigator.clipboard.readText().then(text => {
            if (text) {
                simulatePaste(textarea, text);
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents:', err);
        });
    }
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

function simulatePaste(textarea, text) {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.blur();
    // 可选：如果有发送按钮且需要自动点击发送
    /* const button = textarea.nextElementSibling;
    if (button && button.nodeName === 'BUTTON') {
        button.click();
    } */
}
