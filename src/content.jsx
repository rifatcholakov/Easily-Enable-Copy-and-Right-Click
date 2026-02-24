import { DEFAULT_ACTIVE_STATE, getSiteKey } from "./config";
import { initStorageListener } from "./services/chrome";
import { applyStyles, removeStyles } from "./services/cssManager";
import { STATE_ATTRIBUTE } from "./constants";

/**
 * THE MANAGER SCRIPT (Isolated World)
 * -----------------------------------
 * This script acts as the "Manager" for the entire extension. 
 * It bridges the gap between your Chrome settings (the Popup) 
 * and the actual website you are visiting.
 * 
 * It runs in an "Isolated World," which means it's invisible 
 * to the website's own code for maximum security.
 */

// 1. Identify which site we are on to load the correct settings.
const siteKey = getSiteKey(window.location.hostname);

/**
 * updateState()
 * This is the central command to turn the bypass ON or OFF.
 * 
 * @param {boolean} isActive - Whether the extension should be active.
 */
const updateState = (isActive) => {
    // A. SYNC THE STATE: We write a "Signal" (an attribute) to the <html> tag.
    // This attribute acts as our "Single Source of Truth."
    document.documentElement.setAttribute(STATE_ATTRIBUTE, isActive);

    // B. APPLY VISUAL FIXES: If active, we inject our "Blueprint" CSS styles.
    if (isActive) {
        applyStyles();
    } else {
        removeStyles();
    }
};

// --- INITIALIZATION ---

// Start with the default state (usually OFF) when the page first loads.
updateState(DEFAULT_ACTIVE_STATE);

/**
 * RE-INITIALIZATION LISENTER
 * We listen for whenever you toggle the switch in the Extension Popup.
 * When you click the switch, this code runs instantly!
 */
initStorageListener(siteKey, (newState) => {
    updateState(newState);
});
