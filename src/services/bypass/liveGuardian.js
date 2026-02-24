import { isExtensionTurnedOn } from './state';
import { ClickBlockerRemover } from './clickBlockerRemover';

/**
 * THE LIVE GUARDIAN
 * --------------------
 * Web pages change! If a site loads a new article or a new box, 
 * this Guardian ensures the protection-breaker is applied to the new parts too.
 */
export const LiveGuardian = {
    setup() {
        // This tool watches for any changes to the HTML structure (the DOM).
        const observer = new MutationObserver(() => this.checkForNewContent());
        observer.observe(document.documentElement, { childList: true, subtree: true });
    },

    checkForNewContent() {
        // If the extension is off, we don't need to do any work.
        if (!isExtensionTurnedOn()) return;

        // Ensure the main page body stays unlocked as things change.
        if (document.body) {
            ClickBlockerRemover.applyTo(document.body);
        }
    }
};
