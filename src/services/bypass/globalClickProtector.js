import { isExtensionTurnedOn } from './state';

/**
 * THE GLOBAL CLICK PROTECTOR (Isolated Backup)
 * ----------------------------------------------
 * As a final layer of defense, we listen for clicks and right-clicks 
 * on the window and document to ensure no site script accidentally catches them.
 */
export const GlobalClickProtector = {
    events: ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'dragstart', 'mousedown', 'mouseup'],

    setup() {
        this.events.forEach(eventName => {
            window.addEventListener(eventName, (e) => this.handleEvent(e), true);
            document.addEventListener(eventName, (e) => this.handleEvent(e), true);
        });
    },

    handleEvent(event) {
        if (isExtensionTurnedOn()) {
            // We stop the event from reaching any of the site's blockers.
            event.stopImmediatePropagation();
            event.stopPropagation();
        }
    }
};
