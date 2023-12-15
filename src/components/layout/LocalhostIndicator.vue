<script setup>
import { onMounted, ref } from "vue";
import { useMeta } from "@/composables/use-meta";

import { isLocalhost } from "@/helpers/Host";

let indicator = ref(false);

onMounted(async () => {
    indicator.value = await isLocalhost();
});
</script>

<template>
    <span
        v-if="indicator"
        class="text-black dark:text-white font-extrabold font-mono text-center">
        LOCALHOST
    </span>
</template>

<style scoped></style>
