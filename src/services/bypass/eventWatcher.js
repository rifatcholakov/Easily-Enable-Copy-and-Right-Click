import { isExtensionTurnedOn } from './state';

/**
 * 3. THE EVENT WATCHER
 * --------------------
 * Some sites add "listeners" that wait for you to right-click.
 * This part stops those blockers before they can even start listening.
 */
export const EventWatcher = {
    blockedEvents: ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'dragstart'],

    setup() {
        const originalAddListener = EventTarget.prototype.addEventListener;
        const self = this;

        // We "intercept" the tool sites use to add blockers.
        EventTarget.prototype.addEventListener = function (eventName, listener, options) {
            // If the site tries to listen for a "Copy" or "Right Click" event...
            if (isExtensionTurnedOn() && self.blockedEvents.includes(eventName)) {
                // ...we just return early! The listener is never actually added.
                return;
            }
            return originalAddListener.apply(this, arguments);
        };
    }
};
