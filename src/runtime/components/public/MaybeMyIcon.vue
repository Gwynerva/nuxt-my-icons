<script lang="ts" setup>
import { isMyIcon, type MaybeMyIconName } from '#my-icons';

import MyIcon from './MyIcon.vue';
import MyInlineIcon from './MyInlineIcon.vue';
import MyRuntimeIcon from './MyRuntimeIcon.vue';

defineProps<{
    name: MaybeMyIconName;
    fallback?: 'runtime' | 'inline';
}>();
</script>

<template>
    <MyIcon v-if="isMyIcon(name)" :name />
    <MyInlineIcon v-else-if="fallback === 'inline'" :svg="name" />
    <MyRuntimeIcon v-else :svg="name" />
</template>
