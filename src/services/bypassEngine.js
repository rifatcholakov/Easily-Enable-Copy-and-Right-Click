import { SelectionSaver } from './bypass/selectionSaver';
import { ClickBlockerRemover } from './bypass/clickBlockerRemover';
import { EventWatcher } from './bypass/eventWatcher';
import { LiveGuardian } from './bypass/liveGuardian';
import { ShortcutProtector } from './bypass/shortcutProtector';
import { GlobalClickProtector } from './bypass/globalClickProtector';

/**
 * The "Bypass Engine"
 * -------------------
 * This script runs directly inside the websites you visit.
 * It coordinates our specific modules to "undo" blocking code.
 */
(function () {
    // --- START THE ENGINE ---

    // 1. Setup our individual bypass systems.
    SelectionSaver.setup();
    EventWatcher.setup();
    ShortcutProtector.setup();
    GlobalClickProtector.setup();
    LiveGuardian.setup();

    // 2. Immediately unlock the main window and the document.
    ClickBlockerRemover.applyTo(window);
    ClickBlockerRemover.applyTo(document);
})();
