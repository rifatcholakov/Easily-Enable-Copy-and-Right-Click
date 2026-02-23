import { DEFAULT_ACTIVE_STATE, getSiteKey } from "./config";
import { applyCssBlocking, removeCssBlocking } from "./services/cssBlocker";
import { initEventBlocker } from "./services/eventBlocker";
import { initStorageListener } from "./services/chrome";

let isExtensionActive = DEFAULT_ACTIVE_STATE;
const siteKey = getSiteKey(window.location.hostname);

const getIsExtensionActive = () => isExtensionActive;

const updateCssBlockingState = () => {
    isExtensionActive ? applyCssBlocking() : removeCssBlocking();
};

initEventBlocker(getIsExtensionActive);
updateCssBlockingState();

initStorageListener(siteKey, (newState) => {
    isExtensionActive = newState;
    updateCssBlockingState();
});

