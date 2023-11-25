<script>
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores/index";

let store;

export default {
    props: {
        to: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    setup() {
        const store = useAppStore();

        function toggleMobileMenu() {
            store.toggleMobileMenu();
        }

        return {
            toggleMobileMenu,
        };
    },
};
</script>

<template>
    <li>
        <router-link :to="to" @click="toggleMobileMenu()">
            {{ $t(label) }}
        </router-link>
    </li>
</template>
