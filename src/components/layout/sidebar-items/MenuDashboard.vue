<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";

import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconChat from "@/components/icons/IconChat.vue";

const store = useAppStore();

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
</script>

<template>
    <TitleDivision title="dashboard" />

    <MenuNavItem>
        <NavItem to="/risco-empresarial" label="busines_risk">
            <IconChat />
        </NavItem>
        <!-- NavItems... -->
    </MenuNavItem>
</template>
