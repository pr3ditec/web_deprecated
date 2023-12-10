<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import LocalhostIndicator from "@/components/layout/LocalhostIndicator.vue";

const store = useAppStore();
</script>

<template>
    <div
        class="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right p-6 mt-auto text-shadow">
        © {{ new Date().getFullYear() }}. Sauvvi<span class="text-red-500"
            >Tech</span
        >
        <LocalhostIndicator />
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    box-shadow: none;
}
</style>
