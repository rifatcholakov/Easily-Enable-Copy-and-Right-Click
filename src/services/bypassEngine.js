import { SelectionSaver } from './bypass/selectionSaver';
import { ClickBlockerRemover } from './bypass/clickBlockerRemover';
import { EventWatcher } from './bypass/eventWatcher';
import { LiveGuardian } from './bypass/liveGuardian';
import { ShortcutProtector } from './bypass/shortcutProtector';
import { GlobalClickProtector } from './bypass/globalClickProtector';

/**
 * THE BYPASS ENGINE (Page Context)
 * --------------------------------
 * This script is the "Soul" of the extension inside the website.
 * It coordinates all our experts to perform a complete bypass. 
 * 
 * We use an "IIFE" (Immediately Invoked Function Expression) here to 
 * keep our code private and safe from the website's own scripts.
 */
(function () {
    console.log("[Enable Copy] Starting the Bypass Engine...");

    // --- STEP 1: INITIALIZE THE EXPERTS ---

    // Protect your text selection from being cleared.
    SelectionSaver.setup();

    // Stop the site from adding new "Blocker" event listeners.
    EventWatcher.setup();

    // Ensure your "Ctrl+C" and "Ctrl+A" shortcuts always work.
    ShortcutProtector.setup();

    // The "Last Line of Defense" to catch events at the top level.
    GlobalClickProtector.setup();

    // The "Dynamic Sentry" that watches for new content loading in.
    LiveGuardian.setup();

    // --- STEP 2: OPEN THE UNIVERSAL LOCKS ---

    // We immediately unlock the main Window and the entire Document.
    // This allows right-clicking to start working right away!
    ClickBlockerRemover.applyTo(window);
    ClickBlockerRemover.applyTo(document);

    console.log("[Enable Copy] Bypass Engine fully operational 🚀");
})();
