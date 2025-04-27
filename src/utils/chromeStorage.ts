// src/utils/chromeStorage.ts
// Utility functions for working with Chrome storage

/**
 * Get data from Chrome storage
 */
export const getStorageData = <T>(key: string): Promise<T> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] as T);
    });
  });
};

/**
 * Set data in Chrome storage
 */
export const setStorageData = <T>(key: string, data: T): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: data }, () => {
      resolve();
    });
  });
};
