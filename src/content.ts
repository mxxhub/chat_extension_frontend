// Content script for the Chrome extension
console.log("Content script loaded");

// Example: Send a message to the background script
function sendMessageToBackground() {
  chrome.runtime.sendMessage({ type: "GET_DATA" }, (response) => {
    console.log("Response from background script:", response);
  });
}

// Example: Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received in content script:", message);

  // Handle different message types
  if (message.type === "UPDATE_UI") {
    // Example: Update the UI based on the message
    console.log("Updating UI with data:", message.data);
  }

  // Default response
  sendResponse({ status: "received" });
});

// Example: Inject a button into the page
function injectButton() {
  const button = document.createElement("button");
  button.textContent = "Open Chat";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.zIndex = "10000";
  button.style.padding = "10px";
  button.style.backgroundColor = "#526fff";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.cursor = "pointer";

  button.addEventListener("click", () => {
    // Open the extension popup
    chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
  });

  document.body.appendChild(button);
}

// Run when the content script is loaded
injectButton();
