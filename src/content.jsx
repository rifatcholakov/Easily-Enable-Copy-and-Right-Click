import { DEFAULT_ACTIVE_STATE } from "./config";
import { getSiteKey, formatHostname } from "./utils/siteUtils";
import { applyCssBlocking, removeCssBlocking } from "./services/cssBlocker";
import { initEventBlocker } from "./services/eventBlocker";
import { initStorageListener } from "./services/chrome";

let isExtensionActive = DEFAULT_ACTIVE_STATE;
const displayHost = formatHostname(window.location.hostname, window.location.href);
const siteKey = getSiteKey(displayHost);

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

