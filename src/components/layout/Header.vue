<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();

import HeaderTopMenuLogo from "@/components/layout/header/HeaderTopMenuLogo.vue";
import HeaderSearch from "@/components/layout/header/HeaderSearch.vue";
import HeaderLeftShortcuts from "@/components/layout/header/HeaderLeftShortcuts.vue";

import LangChanger from "@/components/layout/LangChanger.vue";
import ThemeChanger from "@/components/layout/ThemeChanger.vue";

import HeaderMessages from "@/components/layout/header/HeaderMessages.vue";
import HeaderNotification from "@/components/layout/header/HeaderNotification.vue";

import HeaderProfileDropdown from "@/components/layout/header/HeaderProfileDropdown.vue";
</script>

<template>
    <header
        class="z-40"
        :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div
                class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <HeaderTopMenuLogo />
                <HeaderLeftShortcuts />

                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                    <HeaderSearch />
                    <LangChanger />
                    <ThemeChanger />
                    <HeaderMessages />

                    <HeaderNotification />

                    <HeaderProfileDropdown />
                </div>
            </div>
        </div>
    </header>
</template>
