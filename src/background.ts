// Background script for Chrome extension
console.log("Background script running");

// Handle messages from content scripts or popup
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received in background:", message);

//   if (message.type === "CHAT_MESSAGE") {
//     // Process chat messages, store in chrome.storage
//     chrome.storage.local.set({ latestMessage: message.content });
//     sendResponse({ status: "received" });
//   }

//   return true;
// });

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details.reason);

  chrome.storage.local.set({
    messages: [],
    settings: {
      notifications: true,
      theme: "light",
    },
  });
});

export {};
