import { defineNuxtPlugin } from '#imports';

import { MODULE_INTERNAL_PREFIX } from '#my-icons-runtime/global';
import { createStorageHtml } from '#my-icons-runtime/storage';

export default defineNuxtPlugin((_nuxtApp) => {
    _nuxtApp.hook('app:rendered', (_context) => {
        if (!_context.renderResult) return;

        const initialIcons =
            _nuxtApp.payload.data[MODULE_INTERNAL_PREFIX] || {};
        const storageHtml = createStorageHtml(initialIcons);
        _context.renderResult.html += storageHtml;

        // Do not pollute the payload
        delete _nuxtApp.payload.data[MODULE_INTERNAL_PREFIX];
    });
});
