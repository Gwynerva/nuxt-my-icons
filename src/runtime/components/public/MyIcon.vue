<script lang="ts" setup>
import { computed } from 'vue';
import { useHead } from '#imports';

import { isMyIcon } from '#my-icons';
import { iconBundleUrl, createBundleIconData, createMissingIconData, type BundleIconProps, type IconData } from '../../icon';
import { warn } from '../../logger';
import { MISSING_ICON_NAME } from '../../../global';

import Icon from '../internal/Icon.vue';

const props = defineProps<BundleIconProps>();

useHead({
    link: [
        // TODO: Due to an issue opened since 2020, browsers can't preload SVG files so we prefetch instead. @see https://github.com/whatwg/fetch/issues/1012
        { rel: 'prefetch', href: iconBundleUrl(), as: 'image', type: 'image/svg+xml', crossorigin: '' },
    ],
});

const iconData = computed<IconData>(() => {
    if (!isMyIcon(props.name) && props.name !== MISSING_ICON_NAME)
    {
        warn(`Unknown icon name "${props.name}"!`);
        return createMissingIconData(props);
    }

    return createBundleIconData(props);
});
</script>

<template>
    <Icon :data="iconData" />
</template>