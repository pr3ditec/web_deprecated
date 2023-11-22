<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";
import VueCollapsible from "vue-height-collapsible/vue3";

import SidebarLogo from "@/components/layout/sidebar-items/SidebarLogo.vue";

import MenuDashboard from "@/components/layout/sidebar-items/MenuDashboard.vue";
import MenuSchedule from "@/components/layout/sidebar-items/MenuSchedule.vue";
import MenuRegister from "@/components/layout/sidebar-items/MenuRegister.vue";
import MenuGeneralReport from "@/components/layout/sidebar-items/MenuGeneralReport.vue";

import MenuAuth from "@/components/layout/sidebar-items/MenuAuth.vue";

import MenuApps from "@/components/layout/sidebar-items/MenuApps.vue";
import MenuUserInterface from "@/components/layout/sidebar-items/MenuUserInterface.vue";
import MenuTableAndForms from "@/components/layout/sidebar-items/MenuTableAndForms.vue";
import MenuUserAndPages from "@/components/layout/sidebar-items/MenuUserAndPages.vue";

const store = useAppStore();
const activeDropdown: any = ref("");
const subActive: any = ref("");

onMounted(() => {
    const selector = document.querySelector(
        '.sidebar ul a[href="' + window.location.pathname + '"]',
    );

    if (selector) {
        selector.classList.add("active");
        const ul: any = selector.closest("ul.sub-menu");

        if (ul) {
            let ele: any =
                ul.closest("li.menu").querySelectorAll(".nav-link") || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    store.toggleMobileMenu();
};
</script>

<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300"
        >
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <SidebarLogo />

                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative"
                >
                    <ul
                        class="relative font-semibold space-y-0.5 p-4 py-0 mb-10"
                    >
                        <!-- production menus -->
                        <MenuDashboard />
                        <MenuSchedule />
                        <MenuRegister />
                        <MenuGeneralReport />
                        <MenuAuth />

                        <!-- ref menus -->
                        <MenuApps />
                        <MenuUserInterface />
                        <MenuTableAndForms />
                        <MenuUserAndPages />
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>
