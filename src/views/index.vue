<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import { computed } from "vue";

const store = useAppStore();

const userName = computed(() => {
    return store.getUserName();
});

const userType = computed(() => {
    let data = "";
    ["Doctor", "Secretary", "Dev", "Manager"].forEach((id) => {
        if (store[`get${id}Id`]() != "null") {
            console.log(id);
            data = id;
        }
    });

    return data;
});
</script>

<template>
    <div class="text-center text-lg">
        {{ $t("hello") }}, {{ userName }}
        <span class="text-xs">{{ $t(userType) }}</span>
    </div>
</template>
