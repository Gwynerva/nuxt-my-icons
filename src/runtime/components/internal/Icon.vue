<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { IconData } from '../../icon';

const props = defineProps<{ data: IconData }>();
const key = ref(0);

watch(props, () => {
    if (props.data.forceRerender)
        key.value++;
});
</script>

<template>
    <component
        :is="data.wrapper"
        :my-icon="data.name"
        :my-icon-type="data.type">
        <svg :key>
            <defs v-if="data.type === 'inline'" v-html="data.symbol"></defs>
            <use :href="data.href" />
        </svg>
    </component>
</template>

<style>
[my-icon]
{
    line-height: 0;
}

[my-icon] > svg
{
    width: 1em;
    height: 1em;
    color: currentColor;
    fill: currentColor;
}
</style>