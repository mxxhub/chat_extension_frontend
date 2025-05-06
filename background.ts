console.log("Background script running");

// Check if extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");
  if (tab.id) {
    chrome.sidePanel.open({ tabId: tab.id });
  } else {
    chrome.windows.getCurrent((currentWindow) => {
      if (currentWindow.id) {
        chrome.sidePanel.open({ windowId: currentWindow.id });
      }
    });
  }
});

// Get current tab url
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(sender);
  console.log("Message received", request);
  if (request.type === "GET_CURRENT_TAB_URL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      console.log("Current tab: ", currentTab);
      if (currentTab?.url) {
        console.log("Current tab URL: ", currentTab.url);
        sendResponse({ url: currentTab.url });
      } else {
        sendResponse({ url: null });
      }
    });

    return true;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only send message when URL changes and is complete
  if (changeInfo.status === "complete" && tab.url) {
    console.log("Tab updated: ", tabId, tab.url);

    // Send message to content script or extension
    chrome.runtime.sendMessage({
      type: "TAB_URL_UPDATED",
      url: tab.url,
    });

    // If needed, you can also send to specific tabs
    chrome.tabs
      .sendMessage(tabId, {
        type: "TAB_URL_UPDATED",
        url: tab.url,
      })
      .catch((err) => console.log("Error sending message to tab", err));
  }
});

// Also listen for tab activation (switching between tabs)
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url) {
      console.log("Tab activated: ", activeInfo.tabId, tab.url);

      // Send message about tab activation
      chrome.runtime.sendMessage({
        type: "TAB_URL_UPDATED",
        url: tab.url,
      });
    }
  });
});
