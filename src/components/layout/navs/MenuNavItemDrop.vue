<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();

import { ref, computed, onMounted } from "vue";
import VueCollapsible from "vue-height-collapsible/vue3";

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
});

const isActive = computed(() => store.activeDropdown === props.label);

function toggleDropdown() {
    store.activeDropdown = isActive.value ? "" : props.label;
}
</script>

<template>
    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{ active: isActive }"
            @click="toggleDropdown">
            <div class="flex items-center">
                <slot name="icon"></slot>
                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t(props.label) }}</span
                >
            </div>
            <div class="rtl:rotate-180" :class="{ '!rotate-90': isActive }">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </button>

        <vue-collapsible :is-open="isActive">
            <ul class="sub-menu text-gray-500 capitalize">
                <slot></slot>
            </ul>
        </vue-collapsible>
    </li>
</template>
