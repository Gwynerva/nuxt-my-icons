import { readdirSync, readFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';

import { MISSING_ICON_NAME } from './runtime/global';
import { PATH } from './path';
import { LOGGER } from './logger';
import { META } from './meta';
import { removeCarriageReturns } from './runtime/utils/str';
import { createSvgSymbol, parseSvg } from './runtime/utils/svg';
import { fnv1a64 } from './runtime/utils/hash';

export interface IconData {
    /** Absolute fs path to the icon file. */
    path: string;
}

export type IconsData = { [iconName: string]: IconData };

class IconsSingleton {
    /**
     * Hash of public `icons.svg` file.
     *
     * In `dev` environment it is random and change each time icons update.
     * In `prod` it is a real hash of generated <symbol> tags to guarantee users will load a new version of `icons.svg` only if icons did really change since last Nuxt app build.
     */
    _hash: string;

    /**
     * An object containing all icons data.
     *
     * Key — icon name (e.g. `arrow-right`).
     * Value — icon data (path to file and etc.)
     */
    _data: IconsData;

    /**
     * Generated code of all icons as <symbol> tags.
     */
    _symbols: string;

    get names() {
        return Object.keys(this._data);
    }

    get count() {
        return this.names.length;
    }

    get hash() {
        return this._hash;
    }

    get symbols() {
        return this._symbols;
    }

    getDataFor(iconName: string) {
        return this._data[iconName];
    }
}

export const ICONS = new IconsSingleton();

export function updateIconsData() {
    ICONS._data = createIconsData();
    ICONS._symbols = createSymbolsCode();
    ICONS._hash = META.development
        ? `dev_${Date.now()}`
        : fnv1a64(ICONS._symbols).slice(0, 10);
}

//
//
//

function createIconsData() {
    const newData: IconsData = {};

    let _paths: string[] = [];
    try {
        _paths = readdirSync(PATH.ICONS_DIR, {
            encoding: 'utf-8',
            recursive: true,
        });
    } catch {}

    for (const _path of _paths) {
        const { dir, name, ext } = parse(_path);

        if (ext !== '.svg') continue;

        newData[(dir ? `${dir}/` : '') + name] = {
            path: resolve(PATH.ICONS_DIR, _path),
        };
    }

    return newData;
}

function createSymbolsCode() {
    let symbols = '';

    symbols += missingIconSymbolCode() + '\n';

    for (const iconName of ICONS.names) {
        try {
            const svgCode = removeCarriageReturns(
                readFileSync(ICONS._data[iconName]!.path, 'utf-8'),
            );
            const symbolCode = createSvgSymbol(parseSvg(svgCode), iconName);
            symbols += symbolCode + '\n';
        } catch (_error: any) {
            delete ICONS._data[iconName];
            LOGGER.warn(
                `Error when creating <symbol> code for icon "${iconName}"! Skipping!\nReason: ${_error.message || _error}`,
            );
        }
    }

    symbols = symbols.trim();

    return symbols;
}

function missingIconSymbolCode() {
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
    <path d="M64 390.3L153.5 256 64 121.7l0 268.6zM102.5 448l179.1 0L192 313.7 102.5 448zm128-192L320 390.3l0-268.6L230.5 256zM281.5 64L102.5 64 192 198.3 281.5 64zM0 48C0 21.5 21.5 0 48 0L336 0c26.5 0 48 21.5 48 48l0 416c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 48z" />
</svg>
    `.trim();
    return createSvgSymbol(parseSvg(svg), MISSING_ICON_NAME);
}
