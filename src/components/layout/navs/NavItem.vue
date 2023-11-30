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

function toggleMobileMenu() {
    store.toggleMobileMenu();
}
</script>

<template>
    <li class="nav-item">
        <router-link :to="props.to" class="group" @click="toggleMobileMenu">
            <div class="flex items-center">
                <slot></slot>
                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t(props.label) }}</span
                >
            </div>
        </router-link>
    </li>
</template>
