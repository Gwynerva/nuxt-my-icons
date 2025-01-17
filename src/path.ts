import { MODULE_INTERNAL_PREFIX } from './global';

export const PATH = {
    /** Path to module assets directory */
    MODULE_ASSETS_DIR: '',

    /** Directory, where module looks for `.svg` icons. */
    ICONS_DIR: '',

    /** Path to public directory relative to module build directory. */
    PUBLIC_RELATIVE: '',
}

export function templatePath(relativePath?: string)
{
    return MODULE_INTERNAL_PREFIX + (relativePath ? '/' + relativePath : '');
}

export function templatePublicPath(relativePath?: string)
{
    return templatePath('public/' + PATH.PUBLIC_RELATIVE + (relativePath ? '/' + relativePath : ''));
}