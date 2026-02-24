import { isExtensionTurnedOn } from './extensionState';
import { ClickBlockerRemover } from './clickBlockerRemover';

/**
 * THE LIVE GUARDIAN (The Dynamic Sentry)
 * ---------------------------------------
 * Websites are alive! They often load new content, articles, or popups 
 * while you are reading. 
 * 
 * This module is a "Sentry" that watches the page for these changes. 
 * Whenever something new appears, it immediately applies our bypass to it.
 */
export const LiveGuardian = {
    /**
     * setup()
     * We use a "MutationObserver"—think of it as a security camera for the HTML.
     */
    setup() {
        // Whenever the page changes, we call 'checkForNewContent'.
        const observer = new MutationObserver(() => this.checkForNewContent());

        // We watch the entire document tree for any new "child" elements.
        observer.observe(document.documentElement, { childList: true, subtree: true });

        // We also run one initial check to catch anything already on the page.
        this.checkForNewContent();
    },

    /**
     * checkForNewContent()
     * This function scans the page and applies our "Universal Keys" to everyone.
     */
    checkForNewContent() {
        if (!isExtensionTurnedOn()) return;

        // Apply to the main Window and Document.
        ClickBlockerRemover.applyTo(window);
        ClickBlockerRemover.applyTo(document);

        // Then, dive deep into the page to find every single element.
        this.unlockDeep(document.documentElement);
    },

    /**
     * unlockDeep()
     * This is a "Recursive" function. It looks at an element, unlocks it, 
     * and then does the same for all its children. It even "pierces" 
     * through Shadow DOMs (private parts of elements).
     * 
     * @param {Node} target - The starting point for our scan.
     */
    unlockDeep(target) {
        if (!target) return;

        // 1. Apply the bypass to this element.
        ClickBlockerRemover.applyTo(target);

        // 2. If it's a Shadow Root (a hidden part of a web component), go inside!
        if (target.shadowRoot) {
            this.unlockDeep(target.shadowRoot);
        }

        // 3. Find every sub-element and unlock it too.
        // We use '*' to find all elements at once for speed.
        const allChildren = target.querySelectorAll?.('*') || [];
        allChildren.forEach(child => {
            ClickBlockerRemover.applyTo(child);

            // If the child has its own Shadow DOM, we dive into that too.
            if (child.shadowRoot) {
                this.unlockDeep(child.shadowRoot);
            }
        });
    }
};
