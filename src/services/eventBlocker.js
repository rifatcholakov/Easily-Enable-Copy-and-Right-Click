const blockedEvents = [
    'contextmenu', 'copy', 'cut', 'paste',
    'selectstart', 'dragstart', 'mousedown', 'mouseup'
];

const protectedKeys = ['c', 'x', 'v', 'a', 'p'];

export const initEventBlocker = (getIsExtensionActiveFunc) => {
    blockedEvents.forEach(eventName => {
        document.addEventListener(eventName, (event) => {
            if (getIsExtensionActiveFunc()) event.stopPropagation();
        }, true);
    });

    document.addEventListener('keydown', (event) => {
        if (!getIsExtensionActiveFunc()) return;
        const isModifierPressed = event.ctrlKey || event.metaKey;
        if (isModifierPressed && protectedKeys.includes(event.key.toLowerCase())) {
            event.stopPropagation();
        }
    }, true);
};
