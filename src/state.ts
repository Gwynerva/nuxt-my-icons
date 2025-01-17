import { readdirSync, readFileSync } from 'node:fs';
import { parse, resolve } from 'node:path';

import { MISSING_ICON_NAME } from './global';
import { PATH } from './path';
import { LOGGER } from './logger';
import { META } from './meta';
import { removeCarriageReturns } from './utils/str';
import { createSvgSymbol, parseSvg } from './utils/svg';
import { fnv1a64 } from './utils/hash';

export interface IconData
{
    /** Absolute fs path to the icon file. */
    path: string;
}

export type IconsData = { [iconName: string]: IconData };

class IconsSingleton
{
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

    get names()
    { return Object.keys(this._data); }

    get count()
    { return this.names.length; }

    get hash()
    { return this._hash; }

    get symbols()
    { return this._symbols; }

    getDataFor(iconName: string)
    { return this._data[iconName]; }
}

export const ICONS = new IconsSingleton;

export function updateIconsData()
{
    ICONS._data =       createIconsData();
    ICONS._symbols =    createSymbolsCode();
    ICONS._hash =       META.development ? `dev_${Date.now()}` : fnv1a64(ICONS._symbols).slice(0, 10);
}

//
//
//

function createIconsData()
{
    const newData: IconsData = {};

    let _paths: string[] = [];
    try {
        _paths = readdirSync(PATH.ICONS_DIR, {
            encoding: 'utf-8',
            recursive: true,
        });
    } catch {}

    for (const _path of _paths)
    {
        const { dir, name, ext } = parse(_path);

        if (ext !== '.svg')
            continue;

        newData[(dir ? `${dir}/` : '') + name] = {
            path: resolve(PATH.ICONS_DIR, _path),
        };
    }

    return newData;
}

function createSymbolsCode()
{
    let symbols = '';

    symbols += missingIconSymbolCode() + '\n';

    for (const iconName of ICONS.names)
    {
        try
        {
            const svgCode = removeCarriageReturns(readFileSync(ICONS._data[iconName].path, 'utf-8'));
            const symbolCode = createSvgSymbol(parseSvg(svgCode), iconName);
            symbols += symbolCode + '\n';
        }
        catch (_error: any)
        {
            delete ICONS._data[iconName];
            LOGGER.warn(`Error when creating <symbol> code for icon "${iconName}"! Skipping!\nReason: ${_error.message || _error}`);
        }
    }

    symbols = symbols.trim();

    return symbols;
}

function missingIconSymbolCode()
{
    const missingIconSvg = readFileSync(PATH.MODULE_ASSETS_DIR + '/missing.svg', 'utf-8');
    return createSvgSymbol(parseSvg(removeCarriageReturns(missingIconSvg)), MISSING_ICON_NAME);
}