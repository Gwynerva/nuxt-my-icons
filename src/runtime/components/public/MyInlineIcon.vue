<script lang="ts" setup>
import { computed } from 'vue';

import { createInlineIconData, createMissingIconData, type IconData, type InlineIconProps } from '#my-icons-runtime/icon';
import { createSvgSymbol, getSvgHash, makeIdsUnique, parseSvg } from '#my-icons-runtime/utils/svg';
import { warn } from '#my-icons-runtime/logger';

import Icon from '../internal/Icon.vue';

const props = defineProps<InlineIconProps>();

const iconData = computed<IconData>(() => {
    try
    {
        const parsedSvg = parseSvg(props.svg);
        const hash = getSvgHash(parsedSvg);

        parsedSvg.template = makeIdsUnique(parsedSvg.template);

        const href = `__my-icons-inline__${hash}`;
        const symbol = createSvgSymbol(parsedSvg, href);

        return createInlineIconData(props, href, symbol);
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