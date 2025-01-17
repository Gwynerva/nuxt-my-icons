import { defineNuxtModule, createResolver, updateTemplates, type Resolver, addComponentsDir, addPlugin, addComponent } from '@nuxt/kit'

import { createModuleError, MODULE_PACKAGE_NAME, MODULE_INTERNAL_PREFIX } from './global';
import { ICONS, updateIconsData } from './state';
import { PATH, templatePath, templatePublicPath } from './path';
import { LOGGER } from './logger';
import { META } from './meta';
import { createMainTemplate } from './templates/main';
import { createIconsTemplate } from './templates/icons';

export interface ModuleOptions {
    /**
     * Directory **relative** to the Nuxt `<rootDir>` where `.svg` icons to use with this module are located.
     *
     * @default "assets/icons"
     */
    iconsDir: string;

    /**
     * Directory **relative** to the `<rootDir>/public` Nuxt directory for static assets generated by this module.
     *
     * @default "_my-icons"
     */
    publicDir: string;
}

let RESOLVER: Resolver;
let OPTIONS: ModuleOptions;

let NUXT_BUILD_DIR_PATH: string;
let MODULE_BUILD_DIR_PATH: string;

/**
 * Used to delay reaction on watch events in order to avoid spamming updates.
 * For example, spamming updates can occur when renaming icon which simultaneously tirggers 'unlink' and 'add' watch events!
 */
let UPDATE_DELAY: any = null;

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: MODULE_PACKAGE_NAME,
        configKey: 'myicons',
        compatibility: {
            nuxt: '>=3.15.1'
        }
    },
    defaults: {
        iconsDir: 'assets/icons',
        publicDir: '_my-icons',
    },
    async setup(_options, _nuxt) {
        META.development = _nuxt.options.dev;
        META.production = !META.development;

        OPTIONS = _options;
        RESOLVER = createResolver(import.meta.url);

        NUXT_BUILD_DIR_PATH = await RESOLVER.resolvePath('#build');
        MODULE_BUILD_DIR_PATH = await RESOLVER.resolvePath('#build/' + MODULE_INTERNAL_PREFIX);

        PATH.ICONS_DIR = await RESOLVER.resolvePath(`~~/${_options.iconsDir}`);
        PATH.PUBLIC_RELATIVE = _options.publicDir;
        PATH.MODULE_ASSETS_DIR = RESOLVER.resolve('./assets');

        await ensurePathsAreSafe();

        updateIconsData();
        createIconsTemplate();
        const mainTemplate = createMainTemplate();

        _nuxt.options.alias ||= {};
        _nuxt.options.alias[mainTemplate.aliasKey] = await RESOLVER.resolvePath('#build/' + mainTemplate.aliasValue);

        // Registering components users can use to insert icons
        addComponentsDir({
            path: RESOLVER.resolve('./runtime/components/public'),
            global: true,
        });

        // Prerendering runtime icons when SSR is enabled
        addPlugin({
            src: RESOLVER.resolve('./runtime/plugins/ssrRuntimeIcons.ts'),
            mode: 'server',
        });

        logBuildFinish();
    },
    hooks: {
        'nitro:config': _config => {
            // Registering module public directory with static assets
            _config.publicAssets ||= [];
            _config.publicAssets.push({
                dir: MODULE_BUILD_DIR_PATH + '/public',
                maxAge: META.development ? 0 : 60 * 60 * 24 * 30,
            });
        },
        'builder:watch': (_event, _path) => {
            // Watching changes to icons and updating icons data, then templates (which rely on icons data)
            clearTimeout(UPDATE_DELAY);
            UPDATE_DELAY = setTimeout(async () => {
                if (_path.startsWith(OPTIONS.iconsDir))
                {
                    LOGGER.info('Icons directory changed! Updating icons data...');
                    updateIconsData();
                    await updateModuleTemplates();
                    logBuildFinish();
                }
            }, 200);
        },
        // Hook into app init and add prefetch of `icons.svg?hash` file so icons would load immediately!
    }
});

async function ensurePathsAreSafe()
{
    const prohibitedPathMatch = OPTIONS.publicDir.match(/(^\/|^\.\/|^\.\.\/|\/\.\/|\/\.\.\/)/);

    if (prohibitedPathMatch)
        throw createModuleError(`The public directory path for icons "${OPTIONS.publicDir}" cannot be absolute or contain relative path symbols!`);

    // Never let module working directory path leave Nuxt <buildDir> or valuable project files can be deleted!
    // This should not happen, but I leave it here just to make sure...

    const moduleBuildDirPath = await RESOLVER.resolvePath('#build/' + templatePath());
    const modulePublicDirPath = await RESOLVER.resolvePath('#build/' + templatePublicPath());

    if (!moduleBuildDirPath.startsWith(NUXT_BUILD_DIR_PATH))
        throw createModuleError(`The module working directory "${moduleBuildDirPath}" must be within Nuxt "<buildDir>" directory: "${NUXT_BUILD_DIR_PATH}"!`);

    if (!modulePublicDirPath.startsWith(NUXT_BUILD_DIR_PATH))
        throw createModuleError(`The module static assets directory "${modulePublicDirPath}" must be within Nuxt "<buildDir>" directory: "${NUXT_BUILD_DIR_PATH}"!`);
}

async function updateModuleTemplates()
{
    await updateTemplates({
        filter: template => template.filename.startsWith(MODULE_INTERNAL_PREFIX),
    });
}

function logBuildFinish()
{
    if (ICONS.count === 0) LOGGER.warn(`No icons registered!`);
    else LOGGER.success(ICONS.count + ' ' + (ICONS.count === 1 ? 'icon' : 'icons') + ' registered!');
}