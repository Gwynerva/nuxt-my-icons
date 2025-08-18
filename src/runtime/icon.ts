import { type MyIconName } from '#my-icons';
import { MISSING_ICON_NAME } from './global';

//
// Icon Data
//

type IconDataType = 'bundle' | 'runtime' | 'inline';

interface BaseIconData {
    type: IconDataType;
    href: string;
}

export interface BundleIconData extends BaseIconData {
    type: 'bundle';
    name: string;
}

export interface RuntimeIconData extends BaseIconData {
    type: 'runtime';
}

export interface InlineIconData extends BaseIconData {
    type: 'inline';
    symbol: string;
}

export type IconData = BundleIconData | RuntimeIconData | InlineIconData;

//
// Icon Props
//

export interface BundleIconProps {
    name: MyIconName;
}
export interface RuntimeIconProps {
    svg: string;
}
export interface InlineIconProps {
    svg: string;
}

export function createBundleIconData(props: BundleIconProps): BundleIconData {
    return {
        type: 'bundle',
        name: props.name,
        href: props.name,
    };
}

export function createRuntimeIconData(
    props: RuntimeIconProps,
    href: string,
): RuntimeIconData {
    return {
        type: 'runtime',
        href,
    };
}

export function createInlineIconData(
    href: string,
    symbol: string,
): InlineIconData {
    return {
        type: 'inline',
        href,
        symbol: symbol,
    };
}

export function createMissingIconData(): IconData {
    return {
        type: 'bundle',
        name: MISSING_ICON_NAME,
        href: MISSING_ICON_NAME,
    };
}
