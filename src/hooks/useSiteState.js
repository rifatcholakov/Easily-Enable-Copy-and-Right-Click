import { useState, useEffect } from 'react';
import { DEFAULT_ACTIVE_STATE, getSiteKey } from '../config';
import { getCurrentHostname, getSiteState, setSiteState } from '../services/chrome';

export function useSiteState() {
    const [isActive, setIsActive] = useState(DEFAULT_ACTIVE_STATE);
    const [siteKey, setSiteKey] = useState(null);
    const [hostname, setHostname] = useState(null);

    useEffect(() => {
        getCurrentHostname().then((host) => {
            if (!host) return;

            const key = getSiteKey(host);
            setHostname(host);
            setSiteKey(key);

            getSiteState(key).then(setIsActive);
        });
    }, []);

    const toggleActive = () => {
        if (!siteKey) return;

        const newState = !isActive;
        setIsActive(newState);
        setSiteState(siteKey, newState);
    };

    return {
        isActive,
        hostname,
        isReady: !!siteKey,
        toggleActive
    };
}
