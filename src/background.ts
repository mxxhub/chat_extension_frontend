// Background script for the Chrome extension
console.log("Background script loaded");

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in background script:", message);

  // Handle different message types
  if (message.type === "GET_DATA") {
    // Example: Get data from storage and send it back
    chrome.storage.local.get(["userData"], (result) => {
      sendResponse({ data: result.userData });
    });
    return true; // Required for async sendResponse
  }

  // Add more message handlers as needed

  // Default response
  sendResponse({ status: "received" });
});
