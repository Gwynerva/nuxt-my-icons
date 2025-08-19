<script lang="ts" setup>
import { h, ref, watch } from 'vue';

import type { IconData } from '#my-icons-runtime/icon';
import useMyIconBundlePath from '#my-icons-runtime/composables/useMyIconBundlePath';

const props = defineProps<{ data: IconData }>();
const key = ref(0);

const bundlePath = useMyIconBundlePath();

watch(props, () => {
    if (props.data.type === 'inline') key.value++;
});
</script>

<template>
    <svg
        :key
        my-icon
        :my-icon-type="data.type"
        :my-icon-name="data.type === 'bundle' && data.name"
    >
        <defs v-if="data.type === 'inline'" v-html="data.symbol"></defs>
        <use
            :href="(data.type === 'bundle' ? bundlePath : '') + '#' + data.href"
        />
    </svg>
</template>
