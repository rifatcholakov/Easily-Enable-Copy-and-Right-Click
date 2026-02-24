import { CSS_BYPASS_RULES } from '../constants';

/**
 * CSS Manager
 * -----------
 * Injects and removes the CSS rules that disable text-selection blockers.
 */

let styleElement = null;

/**
 * Injects the bypass style sheet into the document.
 */
export const applyStyles = () => {
    if (styleElement) return;
    styleElement = document.createElement('style');
    styleElement.id = 'enable-copy-styles';
    styleElement.textContent = CSS_BYPASS_RULES;
    (document.head || document.documentElement).appendChild(styleElement);
};

/**
 * Removes the bypass style sheet from the document.
 */
export const removeStyles = () => {
    if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
        styleElement = null;
    }
};
