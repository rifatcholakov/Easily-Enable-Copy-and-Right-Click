/**
 * THE CHROME HELPER (Storage Bridge)
 * ----------------------------------
 * This module handles all the communication with Chrome's built-in 
 * systems like "Storage" and "Tabs". 
 * 
 * It acts as a set of "Dumb Pipes" that just move data from one place 
 * to another so the rest of the extension doesn't have to worry about it.
 */

const isChromeStorageAvailable = () =>
    typeof chrome !== 'undefined' && !!chrome.storage;

const isChromeTabsAvailable = () =>
    isChromeStorageAvailable() && !!chrome.tabs;

/**
 * getCurrentHostname()
 * Gets the address of the website you are currently looking at.
 */
export const getCurrentHostname = () => {
    return new Promise((resolve) => {
        if (!isChromeTabsAvailable()) {
            return resolve(null);
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs[0]?.url) {
                return resolve(null);
            }

            try {
                const hostname = new URL(tabs[0].url).hostname;
                resolve(hostname);
            } catch (error) {
                resolve(null);
            }
        });
    });
};

/**
 * getExtensionStateForSite()
 * Checks if you turned the extension ON specifically for this site.
 */
export const getExtensionStateForSite = (siteKey) => {
    return new Promise((resolve) => {
        if (!isChromeStorageAvailable()) {
            return resolve(false);
        }

        chrome.storage.local.get([siteKey], (result) => {
            resolve(result[siteKey] === true);
        });
    });
};

/**
 * setExtensionStateForSite()
 * Saves your settings when you flip the switch in the popup.
 */
export const setExtensionStateForSite = (siteKey, value) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    chrome.storage.local.set({ [siteKey]: value });
};

/**
 * initStorageListener()
 * This is the magic part for the Content Script. It sets up a 
 * "Telephone Line" that alerts the script whenever you toggle 
 * the switch in the popup.
 */
export const initStorageListener = (siteKey, onUpdate) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    // 1. Get the current saved state right now.
    chrome.storage.local.get([siteKey], (result) => {
        onUpdate(result[siteKey] === true);
    });

    // 2. Start listening for any future changes.
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes[siteKey] !== undefined) {
            onUpdate(changes[siteKey].newValue);
        }
    });
};
