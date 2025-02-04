import { useNuxtApp } from '#app';
import { type MyIconName, myIconSetHash, myIconSetRelativeUrl } from '#my-icons';
import { MISSING_ICON_NAME } from './global';

//
// Icon Data
//

type IconDataType = 'bundle' | 'runtime' | 'inline';

interface BaseIconData
{
    type: IconDataType;
    name: string;
    href: string;
    wrapper: 'div' | 'span';
    forceRerender: boolean;
}

export interface BundleIconData extends BaseIconData
{
    type: 'bundle';
}

export interface RuntimeIconData extends BaseIconData
{
    type: 'runtime';
}

export interface InlineIconData extends BaseIconData
{
    type: 'inline';
    symbol: string;
}

export type IconData = BundleIconData | RuntimeIconData | InlineIconData;

//
// Icon Props
//

interface BaseIconProps
{
    name: string;
    wrapper?: 'div' | 'span';
}

export interface BundleIconProps extends BaseIconProps { name: MyIconName; }
export interface RuntimeIconProps extends BaseIconProps { svg: string; }
export interface InlineIconProps extends BaseIconProps { svg: string; }

type IconProps = BundleIconProps | RuntimeIconProps | InlineIconProps;

export function iconBundleUrl()
{
    const nuxtApp = useNuxtApp();
    return nuxtApp.$config.app.baseURL + myIconSetRelativeUrl + '/icons.svg?' + myIconSetHash;
}

function bundleIconHref(name: string)
{
    return `${iconBundleUrl()}#${name}`;
}

function createBaseIconData(props: IconProps): Omit<BaseIconData, 'type' | 'href'>
{
    return {
        name: props.name,
        wrapper: props.wrapper || 'div',
        forceRerender: false,
    }
}

export function createBundleIconData(props: BundleIconProps): BundleIconData
{
    return {
       ...createBaseIconData(props),
       type: 'bundle',
       href: bundleIconHref(props.name),
    }
}

export function createRuntimeIconData(props: RuntimeIconProps, href: string): RuntimeIconData
{
    return {
       ...createBaseIconData(props),
       type: 'runtime',
       href,
    }
}

export function createInlineIconData(props: InlineIconProps, href: string, symbol: string): InlineIconData
{
    return {
       ...createBaseIconData(props),
       type: 'inline',
       href,
       symbol: symbol,
       forceRerender: true,
    }
}

export function createMissingIconData(props: IconProps): IconData
{
    return {
        ...createBaseIconData(props),
        type: 'bundle',
        name: MISSING_ICON_NAME,
        href: bundleIconHref(MISSING_ICON_NAME),
    }
}