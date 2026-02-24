const isChromeStorageAvailable = () =>
    typeof chrome !== 'undefined' && !!chrome.storage;

const isChromeTabsAvailable = () =>
    isChromeStorageAvailable() && !!chrome.tabs;

import { formatHostname } from '../utils/siteUtils';

export const getCurrentHostname = () => {
    return new Promise((resolve) => {
        if (!isChromeTabsAvailable()) {
            return resolve(null);
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab?.url) {
                return resolve(null);
            }

            try {
                const urlObj = new URL(tab.url);
                const displayHost = formatHostname(urlObj.hostname, tab.url);
                resolve(displayHost);
            } catch (error) {
                resolve(null);
            }
        });
    });
};

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

export const setExtensionStateForSite = (siteKey, value) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    chrome.storage.local.set({ [siteKey]: value });
};

const onStorageStateChange = (siteKey, callback) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes[siteKey] !== undefined) {
            callback(changes[siteKey].newValue);
        }
    });
};

export const initStorageListener = (siteKey, onUpdate) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    chrome.storage.local.get([siteKey], (result) => {
        onUpdate(result[siteKey] === true);
    });

    onStorageStateChange(siteKey, onUpdate);
};
