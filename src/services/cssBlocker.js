let styleElement = null;

const css = `
    * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        cursor: auto !important;
        pointer-events: auto !important;
    }
    
    a, a *, button, button *, [role="button"], input[type="button"], input[type="submit"] {
        cursor: pointer !important;
    }

    ::selection {
        background: #b3d4fc !important;
        color: #000 !important;
    }

    ::-moz-selection {
        background: #b3d4fc !important;
        color: #000 !important;
    }

    [style*="user-select"], [style*="pointer-events:none"], [unselectable="on"] {
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
    }
`;

export const applyCssBlocking = () => {
    if (styleElement) return;
    styleElement = document.createElement('style');
    styleElement.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(styleElement);
};

export const removeCssBlocking = () => {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
        styleElement = null;
    }
};
