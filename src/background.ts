chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchTweet") {
        fetch(`https://api.fxtwitter.com/status/${message.entryId}`)
            .then(response => response.json())
            .then(data => sendResponse({ success: true, data }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});