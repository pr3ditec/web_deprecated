<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const store = useAppStore();
</script>

<template>
    <div class="flex justify-between items-center px-4 py-3">
        <!-- LOGO -->
        <router-link to="/" class="main-logo flex items-center shrink-0">
            <LogoIcon h="29" w="46" />
            <span
                class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                ls<span class="text-blue-800 dark:text-blue-600">Tech</span>
            </span>
        </router-link>
        <!-- LOGO -->

        <!-- SETA -->
        <a
            href="javascript:;"
            class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
            @click="store.toggleSidebar()">
            <svg
                class="w-5 h-5 m-auto"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13 19L7 12L13 5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    opacity="0.5"
                    d="M16.9998 19L10.9998 12L16.9998 5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </a>
        <!-- SETA -->
    </div>
</template>
