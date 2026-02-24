import { isExtensionTurnedOn } from './state';

/**
 * THE SELECTION SAVER
 * ---------------------
 * Some sites use code to "clear" your highlight as soon as you select text.
 * This part tells the browser: "If a site asks to clear the selection, ignore them if our extension is ON."
 */
export const SelectionSaver = {
    setup() {
        const originalGetSelection = window.getSelection;
        const self = this;

        // We "wrap" the browser's selection tool so we can control it.
        window.getSelection = function () {
            const selection = originalGetSelection.apply(this, arguments);
            if (isExtensionTurnedOn()) self.makeSelectionUnstoppable(selection);
            return selection;
        };
        document.getSelection = window.getSelection;
    },

    makeSelectionUnstoppable(selection) {
        // We only need to protect a selection once.
        if (!selection || selection._alreadyProtected) return;

        // Save the original "clear" functions.
        const originalClear = selection.removeAllRanges;
        const originalEmpty = selection.empty;

        // Rewrite them to do NOTHING if our extension is active.
        selection.removeAllRanges = function () {
            if (isExtensionTurnedOn()) return; // Sabotaged! The site can't clear your highlight.
            return originalClear.apply(this, arguments);
        };

        selection.empty = function () {
            if (isExtensionTurnedOn()) return; // Sabotaged! 
            return originalEmpty.apply(this, arguments);
        };

        selection._alreadyProtected = true;
    }
};
