<script setup>
import IconAddItem from "@/components/icons/IconAddItem.vue";

/** CONTROLE */
const props = defineProps({
    label: String,
});
/** CONTROLE */
</script>
<template>
    <div class="flex flex-row gap-1">
        <span class="cursor-pointer p-2"><IconAddItem /></span>
        <span
            class="uppercase p-2 badge bg-dark-light dark:bg-dark dark:text-white text-dark w-full"
            >{{ $t(label) }}</span
        >
    </div>
</template>
