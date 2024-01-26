<script lang="ts" setup>
import { useI18n } from "vue-i18n";

/** CONTROLE */
const props = defineProps({
    label: String,
    secondaryLabel: String,
});
/** CONTROLE */
</script>
<template>
    <div class="md:mb-5">
        <h1
            class="text-center text-dark dark:text-white-dark md:text-justify text-2xl font-extrabold uppercase md:mt-4 md:text-3xl">
            {{ $t(label!) }}
        </h1>
        <p class="text-base font-bold text-white-dark mt-2">
            {{ $t(secondaryLabel!) }}
        </p>
    </div>
</template>
