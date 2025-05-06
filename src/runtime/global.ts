export const MODULE_TITLE = 'My Icons';
export const MODULE_PACKAGE_NAME = 'nuxt-my-icons';
export const MODULE_ALIAS = '#my-icons';
export const MODULE_INTERNAL_PREFIX = '_my-icons';
export const MISSING_ICON_NAME = '__missing';

export function createModuleError(message?: string) {
    return new Error(`[${MODULE_TITLE}] ${message}`);
}
