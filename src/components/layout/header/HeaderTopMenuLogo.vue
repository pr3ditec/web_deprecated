<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();
</script>

<template>
    <div
        class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
        <router-link to="/" class="main-logo flex items-center shrink-0">
            <img
                class="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                src="/assets/images/logo.png"
                alt="" />
            <span
                class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                ls<span class="text-blue-800 dark:text-blue-600">Tech</span>
            </span>
        </router-link>

        <a
            href="javascript:;"
            class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="store.toggleSidebar()">
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 7L4 7"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                <path
                    opacity="0.5"
                    d="M20 12L4 12"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                <path
                    d="M20 17L4 17"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
        </a>
    </div>
</template>
