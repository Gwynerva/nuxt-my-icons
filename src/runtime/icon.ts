import { type MyIconName } from '#my-icons';
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

function createBaseIconData(props: IconProps): Omit<BaseIconData, 'type' | 'href'>
{
    return {
        name: props.name,
        wrapper: props.wrapper || 'div',
    }
}

export function createBundleIconData(props: BundleIconProps): BundleIconData
{
    return {
       ...createBaseIconData(props),
       type: 'bundle',
       href: props.name,
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
    }
}

export function createMissingIconData(props: IconProps): IconData
{
    return {
        ...createBaseIconData(props),
        type: 'bundle',
        name: MISSING_ICON_NAME,
        href: MISSING_ICON_NAME,
    }
}