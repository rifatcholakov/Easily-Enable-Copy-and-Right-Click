import { DEFAULT_ACTIVE_STATE, getSiteKey } from "./config";
import { initStorageListener } from "./services/chrome";
import { applyStyles, removeStyles } from "./services/cssManager";

/**
 * Manager Script (Isolated World)
 * -------------------------------
 * This script acts as the bridge between Chrome's settings and the page.
 * It maintains the "Single Source of Truth" in the DOM attribute.
 */

const siteKey = getSiteKey(window.location.hostname);

// updateState writes the state to the DOM and applies/removes styles.
const updateState = (isActive) => {
    // 1. Set the attribute (Single Source of Truth)
    document.documentElement.setAttribute('data-enable-copy-active', isActive);

    // 2. Synchronize visual fixes (CSS)
    isActive ? applyStyles() : removeStyles();
};

// --- Initialization ---

// Start with the default state defined in the config
updateState(DEFAULT_ACTIVE_STATE);

// Reactive listener: Update the source of truth whenever the user toggles the switch.
initStorageListener(siteKey, (newState) => {
    updateState(newState);
});
