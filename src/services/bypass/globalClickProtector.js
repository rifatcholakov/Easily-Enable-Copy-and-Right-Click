import { isExtensionTurnedOn } from './extensionState';
import { BLOCKED_EVENTS } from '../../constants';

/**
 * THE GLOBAL CLICK PROTECTOR (The Precision Shield)
 * --------------------------------------------------
 * This is our "Last Line of Defense". It catches events at the very top 
 * level (the Window and Document) before they can reach the site's scripts.
 * 
 * IMPORTANT: We use a "Precision Shield" here. We only block events 
 * if you are using the Right-Click button. If we blocked everything, 
 * normal buttons and links on the site would STOP WORKING!
 */
export const GlobalClickProtector = {
    /**
     * setup()
     * We attach "Capturing" listeners to the entire page. 
     * Capturing means we see the event BEFORE the website does.
     */
    setup() {
        BLOCKED_EVENTS.forEach(eventName => {
            window.addEventListener(eventName, (e) => this.handleEvent(e), true);
            document.addEventListener(eventName, (e) => this.handleEvent(e), true);
        });
    },

    /**
     * handleEvent()
     * This is the logic that decides whether to stop an event or let it pass.
     * 
     * @param {Event} event - The mouse or pointer event.
     */
    handleEvent(event) {
        // If the user turned the extension OFF, we let everything through.
        if (!isExtensionTurnedOn()) return;

        // THE PRECISION SHIELD:
        // We only care about Right-Clicks (which usually have code 'button 2').
        // If you are Left-Clicking (button 0) to follow a link, we stay out of the way!
        const isMouseEvent = event instanceof MouseEvent || (window.PointerEvent && event instanceof PointerEvent);
        if (isMouseEvent && ['mousedown', 'mouseup', 'pointerdown', 'pointerup', 'auxclick'].includes(event.type)) {
            if (event.button !== 2) return; // "Pass Friend, you are a normal click."
        }

        // If we got here, it's a right-click or a blocked event (like 'contextmenu').
        // We stop it instantly so the site's "Blocker" script never even knows it happened.
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
};
