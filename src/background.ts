import { getTokenAdd } from "./utils/utils";

console.log("Background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (!tab.url) return;
    const data = getTokenAdd(tab.url);
    console.log("Tab changed, New URL: ", tab.url);
    console.log(data);
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log(tabId, tab);
  if (changeInfo.url) {
    const data = getTokenAdd(changeInfo.url);
    console.log(data);
    console.log("Tab URL updated: ", changeInfo.url);
  }
});
