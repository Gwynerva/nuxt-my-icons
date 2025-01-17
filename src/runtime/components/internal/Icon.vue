<script lang="ts" setup>
import { computed } from 'vue';
import type { IconData } from '../../icon';

const { data } = defineProps<{ data: IconData }>();

const symbol = computed(() => {
    if (data.type === 'inline')
        return data.symbol;

    return false;
});
</script>

<template>
    <component
        :is="data.wrapper"
        :my-icon="data.name"
        :my-icon-type="data.type">
        <svg>
            <defs v-if="symbol" v-html="symbol"></defs>
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