<script lang="ts" setup>
import { computed } from 'vue';
import { useNuxtApp } from '#imports';

import { warn } from '#my-icons-runtime/logger';
import {
    createMissingIconData,
    createRuntimeIconData,
    type RuntimeIconProps,
} from '#my-icons-runtime/icon';
import {
    createSvgSymbol,
    getSvgHash,
    parseSvg,
} from '#my-icons-runtime/utils/svg';
import { MODULE_INTERNAL_PREFIX } from '#my-icons-runtime/global';
import {
    createStorageElement,
    getStorageElement,
    storeRuntimeIcon,
} from '#my-icons-runtime/storage';

import Icon from '../internal/Icon.vue';

const props = defineProps<RuntimeIconProps>();
const nuxt = useNuxtApp();

const iconData = computed(() => {
    try {
        const parsedSvg = parseSvg(props.svg);
        const hash = getSvgHash(parsedSvg);
        const href = `__my-icons-runtime__${hash}`;
        const symbol = createSvgSymbol(parsedSvg, href);

        if (import.meta.server) {
            // Temporarily adding icon data to nuxt payload to read it in plugin and prerender icons
            const ssrRuntimeIcons = (nuxt.payload.data[
                MODULE_INTERNAL_PREFIX
            ] ||= {});
            ssrRuntimeIcons[href] = symbol;
        } else {
            if (!getStorageElement()) createStorageElement();

            storeRuntimeIcon(href, symbol);
        }

        return createRuntimeIconData(props, href);
    } catch (_error: any) {
        warn(
            `Failed to resolve runtime icon!\nReason: ${_error?.message || _error}`,
        );
        return createMissingIconData();
    }
});
</script>

<template>
    <Icon :data="iconData" />
</template>
