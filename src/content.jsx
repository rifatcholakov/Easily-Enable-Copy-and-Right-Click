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
        event.stopPropagation();
    }, true);
});

const enableCssSelection = () => {
    const css = `
        * {
            -webkit-user-select: auto !important;
            -moz-user-select: auto !important;
            -ms-user-select: auto !important;
            user-select: auto !important;
        }
    `;

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));

    (document.head || document.documentElement).appendChild(style);
};

enableCssSelection();