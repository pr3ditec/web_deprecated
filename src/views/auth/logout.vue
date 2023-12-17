<script setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();
import { useRouter } from "vue-router";
const router = useRouter();

import { getBaseURL } from "@/helpers/Host";

import { onMounted, reactive, ref } from "vue";

onMounted(async () => {
    //redirect to login page
    await store.logout();
    router.push("/login");
});
</script>

<template>
    <div class="text-center">
        {{ $t('logging-out') }}...
    </div>
</template>

<style lang="scss" scoped></style>
