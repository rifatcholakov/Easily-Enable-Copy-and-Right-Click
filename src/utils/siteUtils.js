export const formatHostname = (hostname, url = '') => {
    if (!hostname && url?.startsWith('file:')) {
        try {
            const fileName = url.split('/').pop() || 'local-file';
            return `File: ${fileName}`;
        } catch (e) {
            return 'Local File';
        }
    }
    return hostname || 'Unknown Site';
};

export const getSiteKey = (hostname) => `enableCopyExtension_${hostname}`;
