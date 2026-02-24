import { isExtensionTurnedOn } from './extensionState';
import { BYPASS_TRAPS } from '../../constants';

/**
 * THE CLICK-BLOCKER REMOVER (The Universal Key)
 * --------------------------------------------
 * Websites often try to block you by setting "traps" in their code, 
 * like 'oncontextmenu = return false;'.
 * 
 * This module acts as a "Universal Key". It does two things:
 * 1. It "Locks" properties so the site can't turn them into blockers.
 * 2. It "Cleans" the HTML attributes to remove any existing blocks.
 */
export const ClickBlockerRemover = {
    /**
     * unlock()
     * This is the magic part. It takes an element (like a button or the whole page) 
     * and ensures the site can't use it to block your right-click.
     * 
     * @param {Object} target - The element or window we want to unlock.
     * @param {string} trapName - The name of the trap (e.g., 'oncontextmenu').
     */
    unlock(target, trapName) {
        if (!target) return;

        // --- PART 1: THE CLEANER ---
        // If the element has a physical attribute in the HTML (like <div oncontextmenu="...">), 
        // we strip it away so the block is gone forever.
        if (target.removeAttribute && trapName.startsWith('on')) {
            const attrName = trapName.toLowerCase();
            if (target.hasAttribute?.(attrName)) {
                target.removeAttribute(attrName);
            }
        }

        // --- PART 2: THE LOCK ---
        // We use 'Object.defineProperty' to "freeze" this property. 
        // If the site tries to set it to a blocker function, we simply say "No, keep it null."
        try {
            Object.defineProperty(target, trapName, {
                get: () => null,
                set: function (newValue) {
                    // We only allow the site to set its own logic if our extension is turned OFF.
                    if (!isExtensionTurnedOn()) {
                        Object.defineProperty(this, trapName, {
                            value: newValue,
                            writable: true,
                            configurable: true
                        });
                    }
                },
                configurable: true
            });
        } catch (error) {
            // Some things are too protected to be changed. We just skip them if we can't unlock them.
        }
    },

    /**
     * applyTo()
     * A helper that applies all our "Universal Keys" to a single target.
     * 
     * @param {Object} target - The target to unlock.
     */
    applyTo(target) {
        if (!target) return;
        BYPASS_TRAPS.forEach(trap => this.unlock(target, trap));
    }
};
