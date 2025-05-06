<script lang="ts" setup>
import * as iconData from '#my-icons';
</script>

<template>
    <h2>Import Data</h2>
    <NuxtLink to="/">Index</NuxtLink>
    <pre
        >{{ JSON.stringify(iconData, null, 4) }}
    </pre>
</template>
