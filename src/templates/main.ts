import { addTemplate, addTypeTemplate } from '@nuxt/kit';

import { MISSING_ICON_NAME, MODULE_ALIAS } from '../global';
import { PATH, templatePath } from '../path';
import { ICONS } from '../state';

export function createMainTemplate()
{
    const tsFilename = templatePath('main.ts');
    const dtsFilename = templatePath('main.d.ts');

    const getContents = () => `
        export const myMissingIconName = '${MISSING_ICON_NAME}';
        export const myIconSetRelativeUrl = '${PATH.PUBLIC_RELATIVE}';
        export const myIconSetHash = '${ICONS.hash}';
        export const myIconNames = ${JSON.stringify(Object.fromEntries(ICONS.names.map(name => [name, 0])))} as const;

        export function isMyIcon(name: string) {
            return name in myIconNames;
        }

        export type MyIconName = (keyof typeof myIconNames) | typeof myMissingIconName;
    `;

    addTemplate({
        filename: tsFilename,
        write: false, // TODO: Set to `true` when https://github.com/nuxt/nuxt/issues/30575 is fixed */
        getContents,
    });

    // TODO: Remove this template when https://github.com/nuxt/nuxt/issues/30575 is fixed
    addTypeTemplate({
        filename: dtsFilename as any,
        getContents: () => `
            declare module '#my-icons' {
                ${getContents()}
            }
        `,
    });

    return {
        aliasKey:   MODULE_ALIAS,
        aliasValue: tsFilename,
    }
}