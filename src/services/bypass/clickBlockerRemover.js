import { isExtensionTurnedOn } from './state';

/**
 * 2. THE CLICK-BLOCKER REMOVER
 * ---------------------------
 * Sites often block right-clicks by setting properties like "oncontextmenu".
 * This part "locks" those properties so they always stay "Allowed" (null).
 */
export const ClickBlockerRemover = {
    // These are the common "traps" sites use to block you.
    traps: [
        'oncontextmenu', 'oncopy', 'oncut', 'onpaste',
        'onselectstart', 'ondragstart', 'onmousedown', 'onmouseup'
    ],

    unlock(target, trapName) {
        try {
            // We redefine how the property works using "Object.defineProperty".
            // We make it so it ALWAYS returns "null" (which means Allowed).
            Object.defineProperty(target, trapName, {
                get: () => null,
                set: function (newValue) {
                    // If the extension is OFF, let the site do what it wants.
                    if (!isExtensionTurnedOn()) {
                        Object.defineProperty(this, trapName, {
                            value: newValue,
                            writable: true,
                            configurable: true
                        });
                    }
                    // If the extension is ON, we simply ignore the site's attempt to block.
                },
                configurable: true
            });
        } catch (error) {
            // If the browser blocks us from unlocking a specific part, we just move on safely.
        }
    },

    applyTo(target) {
        if (!target) return;
        this.traps.forEach(trap => this.unlock(target, trap));
    }
};
