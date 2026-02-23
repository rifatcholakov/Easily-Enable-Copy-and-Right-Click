// src/hooks/useSiteState.js
import { useState, useEffect } from 'react';
import { DEFAULT_ACTIVE_STATE, getSiteKey } from '../config';
import { getCurrentHostname, getExtensionStateForSite, setExtensionStateForSite } from '../services/chrome';

export function useSiteState() {
    const [state, setState] = useState({
        hostname: null,
        siteKey: null,
        isActive: DEFAULT_ACTIVE_STATE,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const initializeState = async () => {
            try {
                const host = await getCurrentHostname();
                if (!host) {
                    if (isMounted) setState(s => ({ ...s, isLoading: false, error: 'Could not determine hostname' }));
                    return;
                }

                const key = getSiteKey(host);
                const isExtensionActiveForSite = await getExtensionStateForSite(key);

                if (isMounted) {
                    setState({
                        hostname: host,
                        siteKey: key,
                        isActive: isExtensionActiveForSite,
                        isLoading: false,
                        error: null,
                    });
                }
            } catch (err) {
                if (isMounted) setState(s => ({ ...s, isLoading: false, error: err.message }));
            }
        };

        initializeState();

        return () => {
            isMounted = false; // Cleanup to prevent state updates if component unmounts early
        };
    }, []);

    const toggleSiteExtension = () => {
        if (!state.siteKey || state.isLoading) return;

        const newState = !state.isActive;

        setState(s => ({ ...s, isActive: newState }));

        setExtensionStateForSite(state.siteKey, newState);
    };

    return {
        ...state,
        toggleSiteExtension
    };
}
