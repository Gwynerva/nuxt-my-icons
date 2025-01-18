<p align="center" style="text-align: center;">
<img src="./logotype.svg" width="100px" style="border-radius: 10px;" />
</p>

<h1>My Icons</h1>

All-in-one toolkit for using SVG icons in your Nuxt site!

* No SVG code duplication at all.
* Automatic bundling separate icons into a single icon set file.
* Full SSR support. Prerenders even icons created at runtime!
* Typescript type-hints for icon names.
* Auto detection of non-existing/invalid icon names.
* Registering new icons in runtime optimised for repeated use.

See it in action in [demo](https://gwynerva.github.io/nuxt-my-icons) page or play with the module in live [playground](https://stackblitz.com/edit/nuxt-starter-opz1f7xj?file=app.vue) in browser!

## Installation

### Manual

Install module from npm:

```bash
npm i nuxt-my-icons -D
```

Add module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    modules: [
        'nuxt-my-icons',
    ],
});
```

### Using `nuxi`

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-my-icons
```

## How to use

### `<MyIcon>`

By default "My Icons" module will scan `/assets/icons` folder for any `.svg` files (including subfolders) and bundle all of them into single icon set file.<br>
Consider the following file structure:

```
📁 assets/icons/
├── 📁 arrow/
│   └── ⬅️ left.svg
├── ➕ plus.svg
└── 🏠 home.svg
```

This registers three icons which you can use anywhere in your site with globally accessible `<MyIcon>` component:

```html
<template>
    <MyIcon name="arrow/left" />
    <MyIcon name="plus" />
    <MyIcon name="home" />
</template>
```

By default all icons are wrapped in `<div>` tag.
Use `wrapper` prop to change the wrapper tag.

```html
<p>I like my <MyIcon name="home" wrapper="span" /> house!</p>
```

Keep in mind that all `.svg` files in icons folder (`/assets/icons` by default) will be bundled into a single icon set file, no matter whether you use them or not!
This icon set file is loaded (actually, prefetched) on each page load!
That is why you should only bundle icons you sure **will** be used in your site.
**Never** just throw a bunch of icons to choose from later!
Carefully craft your icon set icon by icon!

If this is not for you and you just want to have a direct access too 200,000+ ready to use icons, feel free to use [Nuxt Icon](https://github.com/nuxt/icon) or similar modules that provide thousands of icons out of the box.

### `<MyInlineIcon>`

Sometimes you need to use an external icon that is not present in your icon set.
For example, you can receive it from fetch calls or a third party package.
If you plan to use the icon once or twice use `<MyInlineIcon>` component:

```vue
<script lang="ts" setup>
const svg = await $fetch<string>('https://api.iconify.design/svg-spinners:270-ring-with-bg.svg', { responseType: 'text' });
</script>

<template>
    <MyInlineIcon name="loading-spinner" :svg />
</template>
```

The `name` prop is required but does not have to be unique and purely cosmetic. Name however you want, but I suggest you to give a descriptive name that tells, what the icon is or what it does.

Keep in mind that each inline icon holds it's own SVG content!
**100 inline icons = 100 separate SVG contents**, even if all of icons are the same!
Only insert inline icons if you are 100% sure the external icon will be used once or twice in the page.

### `<MyRuntimeIcon>`

If you plan to use an external icon multiple times you should **always** use `<MyRuntimeIcon>` since it does not duplicate SVG contents and even stores icons between changing pages!
The usage and props are the same as `<MyInlineIcon>`:

```vue
<script lang="ts" setup>
const svg = await $fetch<string>('https://api.iconify.design/svg-spinners:blocks-shuffle-3.svg', { responseType: 'text' });
</script>

<template>
    <MyRuntimeIcon name="shuffle-spinner" :svg />
</template>
```

### Component's props

All components have common props:

* `name: string` (required) — Name of bundled icon when using `<MyIcon>`. For `<MyRuntimeIcon>` or `<MyInlineIcon>` it's does not have to be unique and purely cosmetic, give a descriptive name that tells, what the icon is or what it does.
* `wrapper: 'div' | 'span'` (default: `div`) — Wrapper tag for icon.

### Utils

Anywhere within Nuxt context you can access `#my-icons` alias to access module data:

```ts
import {
    myMissingIconName,      // Name of missing icon that is used when something goes wrong
    myIconSetHash,          // Hash of your icon set
    myIconSetRelativeUrl,   // URL to directory containing moudule's static assets (relative to root)
    myIconNames,            // Object which keys are bundled icon names
    isMyIcon,               // Function to check if name is a bundled icon
    MyIconName,             // Typescript type that validates only bundled icon names
} from '#my-icons';
```

### Styling icons

By default all icons have the same size and color of surrounding text.

The preferred way to style your icons is to add class to icon component and style it:

```vue
<template>
    <MyIcon name="home" class="house-icon" />
</template>

<style>
.house-icon
{
    color: red;
    font-size: 100px;
}
</style>
```

If you for some reason don't want to create additional classes, you can directly style icons using their custom attributes as CSS selectors:

* `[my-icon="<name>"]`
* `[my-icon-type="<bundle | inline | runtime>"]`

### Module options

You can configure module settings in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
    myicons: {
        /**
         * Directory where your `.svg` icons are stored.
         * @default 'assets/icons'
         */
        iconsDir: 'alternative/path/to/icons',

        /**
         * Directory relative to `/public` where static assets (e.g. icons bundle) will be stored.
         * @default '_my-icons'
         */
        publicDir: 'foo/bar/baz',
    }
})
```

## Common problems

### Text color is not applied to icon

This happens if your icon SVG code contains `fill` and `stroke` attributes.<br>
Remove these attributes or change their values to `currentColor` so they can inherit text color.

### SVG `<animate />` does not work in bundled icons

SVG animations made with `<animate />` tags will not play when SVG symbol is used with `<use />` tag targeting external file.
I don't know why animations won't start playing and it is not related to this module.
This is probably a bug in browsers, but I have not found any reports on this.
Tag animations work just fine in runtime and inline icons.

Workarounds:

1. Use CSS to animate the icon
2. Create globally accessible Vue SFC component which uses `<RuntimeIcon />` to render animated icon, for example `/components/Loading.vue`.

### SVG `<animate />` animations don't start immediately

This is a known issue with SVG animation made with tags. It only starts when page has been fully loaded.
If there is a script in `<head>` that is blocking rendering, the icon animation won't start.
You better use CSS to animate icons.

## Contribution

This module was developed using [Bun](https://bun.sh/) framework.<br>
In order to run development process you need install it or be ready to make some tweaks to make it run on your machine.

```bash
# Install dependencies
bun install

# Generate type stubs
bun run dev:prepare

# Develop with the playground
bun run dev

# Build the playground
bun run dev:build

# Run tests
bun test
```