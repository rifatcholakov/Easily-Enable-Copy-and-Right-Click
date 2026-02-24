/**
 * CSS Manager
 * -----------
 * Manages the injection and removal of CSS rules that disable CSS-based text selection blockers.
 */

const cssRules = `
    * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        cursor: auto !important;
    }
    ::selection {
        background: #3b82f6 !important;
        color: white !important;
    }
    ::-moz-selection {
        background: #3b82f6 !important;
        color: white !important;
    }
    html, body {
        pointer-events: auto !important;
        -webkit-user-drag: none !important;
    }
    a, a *, button, button *, [role="button"] {
        cursor: pointer !important;
    }
`;

let styleElement = null;

export const applyStyles = () => {
    if (styleElement) return;
    styleElement = document.createElement('style');
    styleElement.id = 'enable-copy-styles';
    styleElement.textContent = cssRules;
    (document.head || document.documentElement).appendChild(styleElement);
};

export const removeStyles = () => {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
        styleElement = null;
    }
};
