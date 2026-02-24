import { isExtensionTurnedOn } from './extensionState';

/**
 * THE SELECTION SAVER (The Unstoppable Text)
 * -------------------------------------------
 * Some sites try to be clever: as soon as you highlight text, 
 * they run a script to "clear" your selection so you can't copy it.
 * 
 * This module is a "Saboteur". It wraps the browser's selection tool 
 * and simply ignores any requests from the website to clear your text.
 */
export const SelectionSaver = {
    /**
     * setup()
     * We replace the browser's built-in 'getSelection' function with our own.
     */
    setup() {
        const originalGetSelection = window.getSelection;
        const self = this;

        window.getSelection = function () {
            const selection = originalGetSelection.apply(this, arguments);

            // If the extension is ON, we "harden" the selection object.
            if (isExtensionTurnedOn()) {
                self.makeSelectionUnstoppable(selection);
            }
            return selection;
        };

        // We do the same for the document-level selection tool.
        document.getSelection = window.getSelection;
    },

    /**
     * makeSelectionUnstoppable()
     * This takes a selection object and breaks its "clear" buttons.
     * 
     * @param {Selection} selection - The selection object to protect.
     */
    makeSelectionUnstoppable(selection) {
        // If it's already protected, we don't need to do it again.
        if (!selection || selection._alreadyProtected) return;

        const originalClear = selection.removeAllRanges;
        const originalEmpty = selection.empty;

        // When the site calls 'removeAllRanges()' (Clear)...
        selection.removeAllRanges = function () {
            if (isExtensionTurnedOn()) {
                // ...we just do nothing! The text stays highlighted.
                return;
            }
            return originalClear.apply(this, arguments);
        };

        // When the site calls 'empty()'...
        selection.empty = function () {
            if (isExtensionTurnedOn()) {
                // ...we also do nothing.
                return;
            }
            return originalEmpty.apply(this, arguments);
        };

        // Mark it as protected so we don't loop forever.
        selection._alreadyProtected = true;
    }
};
