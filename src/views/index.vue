<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import { computed } from "vue";

const store = useAppStore();

const userName = computed(() => {
    console.log("userName", store.getUserName());
    return store.getUserName();
});

const userId = computed(() => {
    console.log("userId", store.getUserId());
    return store.getUserId();
});
</script>

<template>
    <div class="text-center text-lg">
        {{ $t("hello") }}, {{ userName }}
        <span class="text-xs">[{{ userId }}]</span>
    </div>
</template>
