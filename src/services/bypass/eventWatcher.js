import { isExtensionTurnedOn } from './extensionState';
import { INTERCEPTOR_EVENTS } from '../../constants';

/**
 * THE EVENT WATCHER (The Anti-Blocker)
 * ------------------------------------
 * Think of this as a "Filter" at the browser's front door. 
 * Whenever a website tries to add a brand new blocker—like saying 
 * "Hey browser, let me know when the user Right-Clicks"—this module 
 * intercepts that request and quietly ignores it.
 */
export const EventWatcher = {
    /**
     * setup()
     * We wrap the browser's built-in 'addEventListener' function.
     */
    setup() {
        const originalAddListener = EventTarget.prototype.addEventListener;

        EventTarget.prototype.addEventListener = function (eventName, listener, options) {

            // If the extension is ON and the site is trying to listen for 
            // a "blocked" event (like 'contextmenu'), we just say "No thanks."
            if (isExtensionTurnedOn() && INTERCEPTOR_EVENTS.includes(eventName)) {
                // By returning early, the site's blocker script is never actually attached.
                return;
            }

            // For all other normal events (like clicking a link), we let them through.
            return originalAddListener.apply(this, arguments);
        };
    }
};
