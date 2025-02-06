import { useRuntimeConfig } from '#imports';
import { myIconSetHash, myIconSetRelativeUrl } from '#my-icons';

export function useMyIconBundlePath()
{
    const runtimeConfig = useRuntimeConfig();
    return runtimeConfig.app.baseURL + myIconSetRelativeUrl + '/icons.svg?' + myIconSetHash;
}