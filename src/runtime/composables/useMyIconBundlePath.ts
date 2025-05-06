import { useRuntimeConfig } from '#imports';
import { myIconSetRelativeUrl, myIconSetHash } from '#my-icons';

export default function () {
    const runtimeConfig = useRuntimeConfig();
    return (
        runtimeConfig.app.baseURL +
        myIconSetRelativeUrl +
        '/icons.svg?' +
        myIconSetHash
    );
}
