import { isExtensionTurnedOn } from './extensionState';
import { PROTECTED_SHORTCUT_KEYS } from '../../constants';

/**
 * THE SHORTCUT PROTECTOR (Keyboard Hero)
 * ---------------------------------------
 * Some sites try to block common keys like "Ctrl+C" (Copy) or "Ctrl+A" (Select All).
 * This module ensures your keyboard shortcuts stay working perfectly.
 */
export const ShortcutProtector = {
    /**
     * setup()
     * We add a "Capturing" listener for key presses. 
     * This lets us catch the "C" or "A" key before the website's blocker can.
     */
    setup() {
        document.addEventListener('keydown', (event) => this.handleKey(event), true);
    },

    /**
     * handleKey()
     * Decides whether to protect a specific key combination.
     * 
     * @param {KeyboardEvent} event - The keydown event from the keyboard.
     */
    handleKey(event) {
        // If the extension is off, we don't interfere.
        if (!isExtensionTurnedOn()) return;

        // Check if the user is holding down "Ctrl" (Windows/Linux) or "Cmd" (Mac).
        const isModifierPressed = event.ctrlKey || event.metaKey;

        // If a modifier is pressed AND the key is one of our protected ones (like 'C')...
        if (isModifierPressed && PROTECTED_SHORTCUT_KEYS.includes(event.key.toLowerCase())) {

            // ...we stop the event from ever reaching the website.
            // This prevents the site from "cancelling" your copy command.
            event.stopImmediatePropagation();
            event.stopPropagation();

            // Note: We do NOT call preventDefault() here, because we WANT 
            // the browser's natural Copy/Select-All function to happen!
        }
    }
};
