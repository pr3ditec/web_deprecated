<script lang="ts" setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/index";

/** SIDEBAR LOGO */
import SidebarLogo from "@/components/layout/sidebar-items/SidebarLogo.vue";
/** SIDEBAR LOGO */

/** MENU PARA USAR */
import MenuDashboard from "@/components/layout/sidebar-items/_MenuDashboard.vue";
import MenuInvestor from "@/components/layout/sidebar-items/MenuInvestor.vue";
/** MENU PARA USAR */

/** MENUS DE DEV */
import MenuApps from "@/components/layout/sidebar-items/examples/MenuApps.vue";
import MenuUserInterface from "@/components/layout/sidebar-items/examples/MenuUserInterface.vue";
import MenuTableAndForms from "@/components/layout/sidebar-items/examples/MenuTableAndForms.vue";
import MenuUserAndPages from "@/components/layout/sidebar-items/examples/MenuUserAndPages.vue";
/** MENUS DE DEV */

const store = useAppStore();

onMounted(() => {
    const pathname = window.location.pathname;
    const selector = document.querySelector(
        `.sidebar ul a[href="${pathname}"]`,
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
</script>

<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <SidebarLogo />

                <perfect-scrollbar
                    :options="{
                        swipeEasing: true,
                        wheelPropagation: false,
                    }"
                    class="h-[calc(100vh-80px)] relative">
                    <ul
                        class="relative font-semibold space-y-0.5 p-4 py-0 mb-10">
                        <MenuDashboard />
                        <MenuInvestor />

                        <!-- MENUS DE DEV -->
                        <div>
                            <MenuApps />
                            <MenuUserInterface />
                            <MenuTableAndForms />
                            <MenuUserAndPages />
                        </div>
                        <!-- MENUS DE DEV -->
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>
