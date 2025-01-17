<script lang="ts" setup>
import { computed } from 'vue';

import { createInlineIconData, createMissingIconData, type IconData, type InlineIconProps } from '../../icon';
import { createSvgSymbol, getSvgHash, parseSvg } from '../../../utils/svg';
import { warn } from '../../logger';

import Icon from '../internal/Icon.vue';

const props = defineProps<InlineIconProps>();

const iconData = computed<IconData>(() => {
    try
    {
        const parsedSvg = parseSvg(props.svg);
        const hash = getSvgHash(parsedSvg);
        const href = `__my-icons-inline__${hash}`;
        const symbol = createSvgSymbol(parsedSvg, href);

        return createInlineIconData(props, '#' + href, symbol);
    }
    catch (_error: any)
    {
        warn(`Failed to resolve inline icon "${props.name}"!\nReason: ${_error?.message || _error}`);
        return createMissingIconData(props);
    }
});
</script>

<template>
    <Icon :data="iconData" />
</template>