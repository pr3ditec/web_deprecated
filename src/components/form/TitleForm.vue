<script lang="ts" setup>
/** CONTROLE */
const props = defineProps({
    label: String,
});
/** CONTROLE */
</script>
<template>
    <div class="flex flex-col w-full gap-0">
        <label class="capitalize text-bold text-2xl">{{ $t(label!) }}</label>
    </div>
</template>
