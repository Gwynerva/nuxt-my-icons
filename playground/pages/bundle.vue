<script lang="ts" setup>
import { type MyIconName } from '#my-icons';

const plusIconName: MyIconName = 'plus';
</script>

<template>
    <h2>Bundled Icons</h2>
    <NuxtLink to="/">Index</NuxtLink>
    <div class="block-icons">
        <h3>Block icons:</h3>
        <MyIcon name="house" />
        <MyIcon name="human" class="overrideDefaults" />
        <MyIcon :name="plusIconName" />
        <MyIcon name="arrow/left" />
    </div>
    <div>
        <h3>Inline icons:</h3>
        <p>
            This <MyIcon name="house" /> is some
            <MyIcon name="plus" /> paragraph text.
        </p>
    </div>
    <div>
        <h3>Unknown icon:</h3>
        <MyIcon name="css" />
    </div>
</template>

<style>
.overrideDefaults {
    width: 25px;
    height: 25px;
    color: red;
}
</style>
