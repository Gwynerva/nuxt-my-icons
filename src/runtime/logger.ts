import { MODULE_TITLE } from './global';

export function log(message: string) {
    console.log(`[${MODULE_TITLE}] ${message}`);
}

export function warn(message: string) {
    console.warn(`[${MODULE_TITLE}] ${message}`);
}
