<script setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();
import { useRouter } from "vue-router";
const router = useRouter();

import { onMounted } from "vue";

onMounted(async () => {
    await store.logout();
    router.push("/login");
});
</script>

<template>
    <div class="text-center">{{ $t("logging-out") }}...</div>
</template>

<style lang="scss" scoped></style>
