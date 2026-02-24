/**
 * Helper to check if the user has turned the "Enable Copy" switch ON.
 * Looks for the secret signal set by the Manager script.
 */
export const isExtensionTurnedOn = () => {
    return document.documentElement.getAttribute('data-enable-copy-active') === 'true';
};
