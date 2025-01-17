<template>
    <h2>Bundled Icons</h2>
    <NuxtLink to="/">Index</NuxtLink>
    <div class="block-icons">
        <h3>Block icons:</h3>
        <MyIcon name="house" />
        <MyIcon name="human" class="my-icon" />
        <MyIcon name="plus" />
        <MyIcon name="arrow/left" />
    </div>
    <div>
        <h3>Inline icons:</h3>
        <p>This <MyIcon name="house" wrapper="span" /> is some <MyIcon name="plus" wrapper="span" /> paragraph text.</p>
    </div>
    <div>
        <h3>Unknown icon:</h3>
        <MyIcon name="css" />
    </div>
</template>
