import { STATE_ATTRIBUTE } from '../../constants';

/**
 * THE EXTENSION STATE (The Reactive Bridge)
 * -----------------------------------------
 * This module is like a "messenger" that tells the rest of the code 
 * whether the "Enable Copy" switch is turned ON or OFF in your popup.
 * 
 * It uses a "Single Source of Truth" pattern. It watches a specific 
 * attribute on the <html> tag. When that attribute changes, this code 
 * updates instantly!
 */

// A fast local variable to store the state.
// We initialize it by checking the <html> tag immediately.
let _isExtensionActive = document.documentElement.getAttribute(STATE_ATTRIBUTE) === 'true';

/**
 * START THE WATCHER
 * This function sets up a "MutationObserver" (a DOM spy). 
 * It waits and listens for any changes to our special state attribute.
 */
const startStateWatcher = () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // We only care if the 'data-enable-copy-active' attribute changed.
            if (mutation.type === 'attributes' && mutation.attributeName === STATE_ATTRIBUTE) {
                const newValue = document.documentElement.getAttribute(STATE_ATTRIBUTE);
                _isExtensionActive = newValue === 'true';

                console.log(`[Enable Copy] Extension is now ${_isExtensionActive ? 'ON' : 'OFF'}`);
            }
        });
    });

    // Start watching the top-level <html> element.
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: [STATE_ATTRIBUTE]
    });
};

// We start the watcher as soon as this script loads.
startStateWatcher();

/**
 * isExtensionTurnedOn()
 * ---------------------
 * This is a helper function that other parts of the extension call.
 * It's lightning fast because it just returns a true/false variable.
 * 
 * @returns {boolean} True if the extension is ON, False otherwise.
 */
export const isExtensionTurnedOn = () => _isExtensionActive;
