<script lang="ts" setup>
import { useAppStore } from "@/stores/index";

const store = useAppStore();
</script>
<template>
    <div class="w-8">
        <img
            v-show="store.theme === 'light'"
            src="/assets/images/logos/plus-light.png"
            alt="Logo"
            class="mx-auto w-10" />

        <img
            v-show="store.theme === 'dark'"
            src="/assets/images/logos/plus-dark.png"
            alt="Logo"
            class="mx-auto w-10" />
    </div>
</template>
