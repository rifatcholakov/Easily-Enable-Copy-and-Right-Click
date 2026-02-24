/**
 * THE CENTRAL BLUEPRINT (Constants)
 * --------------------------------
 * This file is the "Master Blueprint" for the extension. 
 * Instead of hiding confusing names and numbers deep in the code, 
 * we keep all the "Magic Strings" here so they are easy to find and change.
 */

// 1. THE PROPERTY TRAPS
// These are the specific names browser tools use when a site tries to 
// block your mouse. e.g. 'oncontextmenu' is the right-click trap.
export const BYPASS_TRAPS = [
    'oncontextmenu', 'oncopy', 'oncut', 'onpaste',
    'onselectstart', 'ondragstart', 'onmousedown', 'onmouseup',
    'onauxclick', 'onpointerdown', 'onpointerup'
];

// 2. THE EVENT LIST
// These are the signals sent by the mouse or keyboard. 
// We intercept these to keep the site's "Blocker" scripts from running.
export const BLOCKED_EVENTS = [
    'contextmenu', 'copy', 'cut', 'paste',
    'selectstart', 'dragstart', 'mousedown', 'mouseup',
    'auxclick', 'pointerdown', 'pointerup'
];

// 3. THE INTERCEPTOR WATCH-LIST
// These are the high-level events that our 'EventWatcher' stops 
// as soon as a site tries to listen for them.
export const INTERCEPTOR_EVENTS = [
    'contextmenu', 'copy', 'cut', 'paste',
    'selectstart', 'dragstart', 'auxclick',
    'pointerdown', 'pointerup'
];

// 4. THE KEYBOARD HEROES
// These are the keys we protect (C=Copy, X=Cut, V=Paste, A=SelectAll, P=Print).
export const PROTECTED_SHORTCUT_KEYS = ['c', 'x', 'v', 'a', 'p'];

// 5. THE CSS STYLE RULES
// This is a giant string of CSS that we inject into every page.
// It overrides the site's styles to make text selectable and menus visible.
export const CSS_BYPASS_RULES = `
    /* Force text to be selectable everywhere */
    * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        cursor: auto !important;
    }

    /* Professional highlight color (Blue) */
    ::selection {
        background: #3b82f6 !important;
        color: white !important;
    }
    ::-moz-selection {
        background: #3b82f6 !important;
        color: white !important;
    }

    /* Ensure pointer events work on the main page */
    html, body {
        pointer-events: auto !important;
        -webkit-user-drag: none !important;
    }

    /* ANTI-MASK NEUTRALIZER (For sites like RatzillaCosme) */
    /* Some sites use invisible "masks" to block your clicks. 
       We target common mask names and force them to be non-blocking. */
    [id*="mask"], [class*="mask"], [id*="overlay"], [class*="overlay"],
    [id*="wpcp"], [class*="wpcp"], [id*="wccp"], [class*="wccp"],
    #wccp_pro_mask, #wpcp-error-message {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
        z-index: -1 !important;
    }

    /* Ensure links and buttons always show the hand cursor */
    a, a *, button, button *, [role="button"] {
        cursor: pointer !important;
        pointer-events: auto !important;
    }
`;

// 6. THE STATE BRIDGE ATTRIBUTE
// This is the special "ID Card" we put on the <html> tag to sync settings.
export const STATE_ATTRIBUTE = 'data-enable-copy-active';
