const isChromeStorageAvailable = () =>
    typeof chrome !== 'undefined' && !!chrome.storage;

const isChromeTabsAvailable = () =>
    isChromeStorageAvailable() && !!chrome.tabs;

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

export const getSiteState = (siteKey) => {
    return new Promise((resolve) => {
        if (!isChromeStorageAvailable()) {
            return resolve(false);
        }

        chrome.storage.local.get([siteKey], (result) => {
            resolve(result[siteKey] === true);
        });
    });
};

export const setSiteState = (siteKey, value) => {
    if (!isChromeStorageAvailable()) {
        return;
    }

    chrome.storage.local.set({ [siteKey]: value });
};

export const onStateChange = (siteKey, callback) => {
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
    if (!isChromeStorageAvailable()) return;

    chrome.storage.local.get([siteKey], (result) => {
        onUpdate(result[siteKey] === true);
    });

    onStateChange(siteKey, onUpdate);
};
