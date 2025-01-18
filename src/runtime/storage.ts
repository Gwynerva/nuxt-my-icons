import { MODULE_PACKAGE_NAME } from './global';
import { indent } from './utils/str';

export function getStorageElement()
{
    return document.getElementById(MODULE_PACKAGE_NAME);
}

export function createStorageElement(initialIcons?: Record<string, string>)
{
    document.body.insertAdjacentHTML('beforeend', createStorageHtml(initialIcons));
}

export function storeRuntimeIcon(iconId: string, symbolSvg: string)
{
    if (document.getElementById(iconId))
        return;

    const storageElement = getStorageElement();

    if (!storageElement)
        return;

    storageElement.insertAdjacentHTML('beforeend', symbolSvg);
}

export function createStorageHtml(initialIcons?: Record<string, string>)
{
    let symbolsCode = '';

    if (initialIcons)
        for (const symbolSvg of Object.values(initialIcons))
            symbolsCode += symbolSvg + '\n';

    return `\n<svg id="${MODULE_PACKAGE_NAME}">\n    <style>#${MODULE_PACKAGE_NAME} { position: fixed; opacity: 0; width: 0; height: 0; }</style>${symbolsCode ? `\n` + indent(symbolsCode.trim()) + '\n' : ''}</svg>\n`;
}