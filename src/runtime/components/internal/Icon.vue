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
    <component
        :is="h(data.wrapper)"
        :my-icon="data.name"
        :my-icon-type="data.type"
    >
        <svg :key>
            <defs v-if="data.type === 'inline'" v-html="data.symbol"></defs>
            <use
                :href="
                    (data.type === 'bundle' ? bundlePath : '') + '#' + data.href
                "
            />
        </svg>
    </component>
</template>

<style>
[my-icon] {
    line-height: 0;
}

[my-icon] > svg {
    width: 1em;
    height: 1em;
    color: currentColor;
    fill: currentColor;
}
</style>
