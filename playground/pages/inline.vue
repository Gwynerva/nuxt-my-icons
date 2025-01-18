<script lang="ts" setup>
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>`;
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M2.75 3.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.75.75 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 1.5 0v2.5A1.75 1.75 0 0 1 13.25 13H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 14.543V13H2.75A1.75 1.75 0 0 1 1 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 0 1 0 1.5ZM16 1.25v4.146a.25.25 0 0 1-.427.177L14.03 4.03l-3.75 3.75a.749.749 0 0 1-1.275-.326a.75.75 0 0 1 .215-.734l3.75-3.75l-1.543-1.543A.25.25 0 0 1 11.604 1h4.146a.25.25 0 0 1 .25.25"/></svg>`;
const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none"><path fill="url(#fluentColorAddCircle320)" d="M30 16c0 7.732-6.268 14-14 14S2 23.732 2 16S8.268 2 16 2s14 6.268 14 14"/><path fill="url(#fluentColorAddCircle321)" d="M15 10a1 1 0 1 1 2 0v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5h-5a1 1 0 1 1 0-2h5z"/><defs><linearGradient id="fluentColorAddCircle320" x1="3" x2="22.323" y1="7.25" y2="27.326" gradientUnits="userSpaceOnUse"><stop stop-color="#52D17C"/><stop offset="1" stop-color="#22918B"/></linearGradient><linearGradient id="fluentColorAddCircle321" x1="11.625" x2="15.921" y1="10.428" y2="25.592" gradientUnits="userSpaceOnUse"><stop stop-color="#fff"/><stop offset="1" stop-color="#E3FFD9"/></linearGradient></defs></g></svg>`;

await new Promise(resolve => setTimeout(resolve, 100));

const svgAwait = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><defs><linearGradient id="vscodeIconsFileTypeAccess0" x1="4.416" x2="13.909" y1="-1909.341" y2="-1892.9" gradientTransform="translate(0 1917.121)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b72c3f"/><stop offset=".5" stop-color="#b12334"/><stop offset="1" stop-color="#9d1623"/></linearGradient></defs><path fill="#881421" d="M8.512 20v6.667c0 1.84 4.81 3.333 10.744 3.333S30 28.507 30 26.667V20Z"/><path fill="#af2031" d="M8.512 12.667V20c0 1.841 4.81 3.333 10.744 3.333S30 21.841 30 20v-7.333Z"/><path fill="#c94f60" d="M8.512 5.333v7.334c0 1.84 4.81 3.333 10.744 3.333S30 14.507 30 12.667V5.333Z"/><ellipse cx="19.256" cy="5.333" fill="#e08095" rx="10.744" ry="3.333"/><path d="M16.434 8H8.512v16.667h7.922a1.21 1.21 0 0 0 1.194-1.222V9.222A1.21 1.21 0 0 0 16.434 8" opacity=".1"/><path d="M15.783 8.667H8.512v16.666h7.271a1.21 1.21 0 0 0 1.194-1.222V9.889a1.21 1.21 0 0 0-1.194-1.222" opacity=".2"/><path d="M15.783 8.667H8.512V24h7.271a1.21 1.21 0 0 0 1.194-1.222V9.889a1.21 1.21 0 0 0-1.194-1.222" opacity=".2"/><path d="M15.132 8.667h-6.62V24h6.62a1.213 1.213 0 0 0 1.194-1.222V9.889a1.213 1.213 0 0 0-1.194-1.222" opacity=".2"/><path fill="url(#vscodeIconsFileTypeAccess0)" d="M3.194 8.667h11.938a1.21 1.21 0 0 1 1.194 1.222v12.222a1.21 1.21 0 0 1-1.194 1.222H3.194A1.21 1.21 0 0 1 2 22.111V9.889a1.21 1.21 0 0 1 1.194-1.222"/><path fill="#fff" d="M8.305 12.027h1.758l2.825 7.945h-1.66l-.623-1.895H7.7l-.611 1.895H5.437Zm1.926 4.826l-.9-2.875a4 4 0 0 1-.165-.649H9.13a3.7 3.7 0 0 1-.162.671l-.912 2.859Z"/></svg>`;

const changingSvg1 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><rect width="2.8" height="12" x="1" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"/></rect><rect width="2.8" height="12" x="5.8" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"/></rect><rect width="2.8" height="12" x="10.6" y="6" fill="currentColor"><animate id="svgSpinnersBarsScaleMiddle0" attributeName="y" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"/><animate attributeName="height" begin="0;svgSpinnersBarsScaleMiddle1.end-0.1s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"/></rect><rect width="2.8" height="12" x="15.4" y="6" fill="currentColor"><animate attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"/></rect><rect width="2.8" height="12" x="20.2" y="6" fill="currentColor"><animate id="svgSpinnersBarsScaleMiddle1" attributeName="y" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="6;1;6"/><animate attributeName="height" begin="svgSpinnersBarsScaleMiddle0.begin+0.4s" calcMode="spline" dur="0.6s" keySplines=".14,.73,.34,1;.65,.26,.82,.45" values="12;22;12"/></rect></svg>`;
const changingSvg2 = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="9s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect><rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></rect></svg>`;
const currentChanging = ref(changingSvg1);

onMounted(() => {
    setInterval(() => {
        currentChanging.value = currentChanging.value === changingSvg1 ? changingSvg2 : changingSvg1;
    }, 2000);
});
</script>

<template>
    <h2>Inline Icons</h2>
    <NuxtLink to="/">Index</NuxtLink>
    <div class="block-icons">
        <h3>Block icons:</h3>
        <MyInlineIcon name="Runtime SVG 1" :svg="svg1" style="color: blue" />
        <MyInlineIcon name="Runtime SVG 2" :svg="svg2" />
        <MyInlineIcon name="Runtime SVG 3" :svg="svg3" />
        <MyInlineIcon name="Await SVG" :svg="svgAwait" />
        <h3>Changing icon:</h3>
        <MyInlineIcon name="Timeout SVG" :svg="currentChanging" />
    </div>
    <div>
        <h3>Inline icons:</h3>
        <p>This <MyInlineIcon name="Runtime SVG 1" :svg="svg1" wrapper="span" /> is some <MyInlineIcon name="Await SVG" :svg="svgAwait" wrapper="span" /> paragraph text.</p>
    </div>
    <div>
        <h3>Broken icon:</h3>
        <MyInlineIcon name="Broken Icon" :svg="'<broken></broken>'"/>
    </div>
</template>