<script lang="ts" setup>
/** CONTROLE */
const props = defineProps({
    status: Boolean,
});
/** CONTROLE */
</script>
<template>
    <span
        v-if="
            //@ts-expect-error
            status == 1
        "
        class="badge bg-success uppercase text-white p-2 cursor-pointer"
        >{{ $t("active") }}</span
    >
    <span
        v-else
        class="badge bg-dark uppercase text-white p-2 cursor-pointer"
        >{{ $t("inactive") }}</span
    >
</template>
