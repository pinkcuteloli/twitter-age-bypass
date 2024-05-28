const url = chrome.runtime.getURL("main.js");
const script = document.createElement("script");
script.src = url;
script.addEventListener("load", () => {
    script.remove();
});
document.body.appendChild(script);

window.addEventListener("newTweet", (event) => {
    const customEvent = event as CustomEvent<{ entryId: string }>;

    chrome.runtime.sendMessage({ action: "fetchTweet", entryId: customEvent.detail.entryId }, (response) => {
        console.log("Response from background:", response);
    });
});