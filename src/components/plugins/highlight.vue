<template>
    <div ref="el">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
// import 'highlight.js/styles/monokai-sublime.css';
// import highlight from 'highlight.js';

const el: Ref<HTMLElement | undefined> = ref<HTMLElement | undefined>() as Ref<
    HTMLElement | undefined
>;

onMounted(() => {
    // highlight.highlightElement(el.value?.querySelector('pre') as HTMLElement);
});
</script>

<style>
pre.hljs {
    @apply overflow-x-auto !bg-[#191e3a] p-4 rounded-md text-white;
}
</style>
