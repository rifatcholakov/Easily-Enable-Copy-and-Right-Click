let styleElement = null;

const css = `
    * {
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
        cursor: auto !important;
    }
    a, a *, button, button *, [role="button"] {
        cursor: pointer !important;
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
