import { addTemplate } from '@nuxt/kit';

import { MISSING_ICON_NAME, MODULE_ALIAS } from '../runtime/global';
import { PATH, templatePath } from '../path';
import { ICONS } from '../state';

export function createMainTemplate() {
    const tsFilename = templatePath('main.ts');

    const relativeUrl = PATH.PUBLIC_RELATIVE.replaceAll(/^\/|\/$/gm, '');

    const getContents = () => `
        export const myMissingIconName = '${MISSING_ICON_NAME}';
        export const myIconSetRelativeUrl = '${relativeUrl}';
        export const myIconSetHash = '${ICONS.hash}';
        export const myIconNames = ${JSON.stringify(Object.fromEntries(ICONS.names.map((name) => [name, 0])))} as const;

        export function isMyIcon(name: string) {
            return name in myIconNames;
        }

        export function myIconName(name: MyIconName) {
            return name;
        }

        export type MyIconName = (keyof typeof myIconNames) | typeof myMissingIconName;
    `;

    addTemplate({
        filename: tsFilename,
        write: true,
        getContents,
    });

    return {
        aliasKey: MODULE_ALIAS,
        aliasValue: tsFilename,
    };
}
