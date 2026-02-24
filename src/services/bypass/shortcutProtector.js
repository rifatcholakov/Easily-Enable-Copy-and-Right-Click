import { isExtensionTurnedOn } from './state';

/**
 * THE SHORTCUT PROTECTOR
 * ------------------------
 * Some sites try to block keys like "Ctrl+C" (Copy) or "Ctrl+A" (Select All).
 * This part ensures your keyboard shortcuts stay working perfectly.
 */
export const ShortcutProtector = {
    protectedKeys: ['c', 'x', 'v', 'a', 'p'], // C=Copy, X=Cut, V=Paste, A=SelectAll, P=Print

    setup() {
        // We use 'true' (Capture mode) to catch the key press before the site does.
        document.addEventListener('keydown', (event) => this.handleKey(event), true);
    },

    handleKey(event) {
        if (!isExtensionTurnedOn()) return;

        // Check if Ctrl (Windows/Linux) or Command (Mac) is being held.
        const isModifierPressed = event.ctrlKey || event.metaKey;

        // If it's one of our protected shortcuts...
        if (isModifierPressed && this.protectedKeys.includes(event.key.toLowerCase())) {
            // ...we stop the site from blocking the event.
            event.stopImmediatePropagation();
            event.stopPropagation();
            // Note: We DON'T call event.preventDefault() because we WANT the copy to happen!
        }
    }
};
