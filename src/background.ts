chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script:", message);
    if (message.action === "fetchTweet") {
        console.log("pong");
        sendResponse({ status: "ok" });
    }
    return true;
});
