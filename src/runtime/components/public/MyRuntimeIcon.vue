<script lang="ts" setup>
import { computed } from 'vue';
import { useNuxtApp } from '#app';

import { warn } from '../../logger';
import { createMissingIconData, createRuntimeIconData, type RuntimeIconProps } from '../../icon';
import { createSvgSymbol, getSvgHash, parseSvg } from '../../../utils/svg';
import { MODULE_INTERNAL_PREFIX } from '../../../global';
import { createStorageElement, getStorageElement, storeRuntimeIcon } from '../../storage';

import Icon from '../internal/Icon.vue';

const props = defineProps<RuntimeIconProps>();
const nuxt = useNuxtApp();

const iconData = computed(() => {
    try
    {
        const parsedSvg = parseSvg(props.svg);
        const hash = getSvgHash(parsedSvg);
        const href = `__my-icons-runtime__${hash}`;
        const symbol = createSvgSymbol(parsedSvg, href);

        if (import.meta.server)
        {
            // Temporarily adding icon data to nuxt payload to read it in plugin and prerender icons
            const ssrRuntimeIcons = nuxt.payload.data[MODULE_INTERNAL_PREFIX] ||= {};
            ssrRuntimeIcons[href] = symbol;
        }
        else
        {
            if (!getStorageElement())
                createStorageElement();

            storeRuntimeIcon(href, symbol);
        }

        return createRuntimeIconData(props, '#' + href);
    }
    catch (_error: any)
    {
        warn(`Failed to resolve runtime icon "${props.name}"!\nReason: ${_error?.message || _error}`);
        return createMissingIconData(props);
    }
});
</script>

<template>
    <Icon :data="iconData" />
</template>