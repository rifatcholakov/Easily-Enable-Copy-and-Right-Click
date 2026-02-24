import { isExtensionTurnedOn } from './extensionState';
import { ClickBlockerRemover } from './clickBlockerRemover';
import { STATE_ATTRIBUTE } from '../../constants';

/**
 * THE LIVE GUARDIAN (The Efficient Sentry)
 * -----------------------------------------
 * This module ensures that even if a website adds new elements or content 
 * after the page has loaded, our bypass is applied to them instantly.
 * 
 * DESIGN: We only scan NEWLY added nodes to keep the extension lightning fast.
 * We also perform a single full scan when the extension is first toggled ON.
 */
export const LiveGuardian = {
    /**
     * setup()
     * Attaches a watcher to the page that looks for new content and state changes.
     */
    setup() {
        const observer = new MutationObserver((mutations) => {
            // 1. REACTIVITY: If our "Enable Copy" state attribute changed...
            const stateChanged = mutations.some(m => m.type === 'attributes' && m.attributeName === STATE_ATTRIBUTE);
            if (stateChanged) {
                // If it just turned ON, we do a full sweep of the page.
                if (isExtensionTurnedOn()) {
                    this.performFullSweep();
                } else {
                    // If it turned OFF, we don't need to do anything immediately.
                }
            }

            // 2. PERFORMANCE: Only scan the specific nodes that were just added to the page.
            if (isExtensionTurnedOn()) {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.unlockElementAndShadows(node);
                        }
                    });
                });
            }
        });

        // We watch for both element changes AND the state attribute on the html tag.
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [STATE_ATTRIBUTE]
        });

        // Run an initial sweep if we start in the ON state.
        if (isExtensionTurnedOn()) {
            this.performFullSweep();
        }
    },

    /**
     * performFullSweep()
     * Performs a one-time full scan of the page and all shadow DOMs.
     * This is called when the extension is first activated.
     */
    performFullSweep() {
        console.log("[Enable Copy] Performing a full page unlock sweep...");

        // 1. Unlock the window and document objects.
        ClickBlockerRemover.applyTo(window);
        ClickBlockerRemover.applyTo(document);

        // 2. Walk the entire DOM tree once.
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => this.unlockElementAndShadows(el));
    },

    /**
     * unlockElementAndShadows()
     * Unlocks a specific element and pierces its shadow root if it has one.
     * 
     * @param {HTMLElement} element - The element to unlock.
     */
    unlockElementAndShadows(element) {
        if (!element) return;

        // Unlock the element itself.
        ClickBlockerRemover.applyTo(element);

        // Pierce Shadow DOM if present.
        if (element.shadowRoot) {
            // Unlock the shadow root itself.
            ClickBlockerRemover.applyTo(element.shadowRoot);

            // Recursively find elements inside the shadow root.
            const shadowElements = element.shadowRoot.querySelectorAll('*');
            shadowElements.forEach(el => this.unlockElementAndShadows(el));
        }
    }
};
