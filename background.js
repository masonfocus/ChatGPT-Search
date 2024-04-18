chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        openGuidePage();
    }
});

chrome.action.onClicked.addListener(() => {
    openGuidePage();
});

function openGuidePage() {
    chrome.tabs.create({
        url: chrome.runtime.getURL('addsearch.html')
    });
}
