console.log("Background script running");

// Check if extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Get current tab url
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received", request);
  if (request.type === "GET_CURRENT_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab?.url) {
        sendResponse({ url: currentTab.url });
      } else {
        sendResponse({ url: null });
      }
    });

    return true;
  }
});
