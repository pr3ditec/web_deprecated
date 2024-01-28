<script setup>
import { useRouter } from "vue-router";

/** CONTROLE */
const router = useRouter();
const props = defineProps({
    pushRoute: String,
});
/** CONTROLE */
</script>
<template>
    <div class="w-full">
        <button
            class="btn btn-outline-dark btn-sm"
            @click="router.push(pushRoute)">
            &larr;
        </button>
    </div>
</template>
