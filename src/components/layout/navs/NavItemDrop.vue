<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();

const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
});

const toggleMobileMenu = () => {
    store.toggleMobileMenu();
};
</script>

<template>
    <li>
        <router-link :to="props.to" @click="toggleMobileMenu()">
            {{ $t(props.label) }}
        </router-link>
    </li>
</template>
