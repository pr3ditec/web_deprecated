<script lang="ts" setup>
import { useAppStore } from "@/stores/index";

const store = useAppStore();
</script>

<template>
    <div class="w-48 block lg:w-72 ms-10">
        <img
            src="/assets/images/logowtext.png"
            alt="Logo"
            class="filter-shadow"
        />
    </div>
</template>

<style scoped>
.filter-shadow {
    filter: drop-shadow(1px 1px 1px black);
}
</style>
