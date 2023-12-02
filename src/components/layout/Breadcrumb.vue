<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();

import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbItems = computed(() => {
    const pathParts = route.path.split("/");
    pathParts.shift(); // Remove the first element which is an empty string
    return pathParts;
});

function humanize(str) {
    var words = str.replace(/-/g, " ").split(" ");

    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

defineExpose({
    humanize,
});
</script>

<template>
    <ul
        v-if="breadcrumbItems.length > 0 && breadcrumbItems[0] !== ''"
        class="flex space-x-2 rtl:space-x-reverse cursor-default justify-start mb-2 border-b-2 dark:border-y-white-dark border-white-dark">
        <li v-for="(item, index) in breadcrumbItems" :key="index">
            <span v-if="index === 0" class="">
                {{ humanize($t(item)) }}
            </span>

            <span
                class="before:content-['/'] before:mr-2 rtl:before:ml-2"
                v-else>
                {{ humanize($t(item)) }}
            </span>
        </li>
    </ul>
</template>

<style scoped></style>
