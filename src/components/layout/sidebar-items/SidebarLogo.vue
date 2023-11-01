<template>
    <div class="flex justify-between items-center px-4 py-3">
        <router-link to="/" class="main-logo flex items-center shrink-0">
            <img class="w-8 ml-[5px] flex-none" src="/src/assets/images/logo.png" alt="" />
            <span class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                Sauvvi<span class="text-red-500">Tech</span>
            </span>
        </router-link>

        <a href="javascript:;"
            class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
            @click="store.toggleSidebar()">

            <svg class="w-5 h-5 m-auto" width="20" height="20" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M13 19L7 12L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </a>
    </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/index';

const store = useAppStore();
</script>
