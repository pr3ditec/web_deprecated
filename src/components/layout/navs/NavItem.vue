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
            toggleMobileMenu
        };
    },
};
</script>

<template>
    <li class="nav-item">
        <router-link :to="to" class="group" @click="toggleMobileMenu">
            <div class="flex items-center">
                <slot></slot>
                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t(label) }}</span
                >
            </div>
        </router-link>
    </li>
</template>
