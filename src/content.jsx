let isExtensionActive = true;

if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['extensionActive'], (result) => {
        isExtensionActive = result.extensionActive !== false;
        updateCssBlocking();
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'local' && changes.extensionActive) {
            isExtensionActive = changes.extensionActive.newValue;
            updateCssBlocking();
        }

    });
}

const blockedEvents = [
    'contextmenu',
    'copy',
    'cut',
    'paste',
    'selectstart',
    'dragstart',
    'mousedown',
    'mouseup'
];

blockedEvents.forEach(eventName => {
    document.addEventListener(eventName, (event) => {
        if (isExtensionActive) {
            event.stopPropagation();
        }
    }, true);
});


let styleElement = null;
const updateCssBlocking = () => {
    if (isExtensionActive) {
        if (!styleElement) {
            const css = `
                            * {
                                -webkit-user-select: auto !important;
                                -moz-user-select: auto !important;
                                -ms-user-select: auto !important;
                                user-select: auto !important;
                            }
                        `;

            styleElement = document.createElement('style');
            styleElement.appendChild(document.createTextNode(css));

            (document.head || document.documentElement).appendChild(styleElement);
        }
    } else {
        if (styleElement && styleElement.parentNode) {
            styleElement.parentNode.removeChild(styleElement);
            styleElement = null;
        }
    }
};

// Initial run
updateCssBlocking();
