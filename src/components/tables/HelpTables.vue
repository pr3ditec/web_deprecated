<script lang="ts" setup>
import { ref } from "vue";
/** CONRTROLE */
const showText: any = ref(false);
/** CONRTROLE */
</script>
<template>
    <button
        @mouseover="showText = true"
        @mouseleave="showText = false"
        class="btn btn-outline-warning btn-sm">
        ?
    </button>
    <div v-if="showText" class="flex flex-col gap-1 mt-3">
        <div class="flex flex-row gap-1">
            <b>{{ $t("status") }}</b>
            <p>{{ $t("status-help-text") }}</p>
        </div>
        <div class="flex flex-row gap-1">
            <b>{{ $t("see-more") }}</b>
            <p>{{ $t("see-more-help-text") }}</p>
        </div>
        <div class="flex flex-row gap-1">
            <b>{{ $t("trash-icon") }}</b>
            <p>{{ $t("trash-icon-help-text") }}</p>
        </div>
    </div>
</template>
