<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";
import VueCollapsible from "vue-height-collapsible/vue3";

import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItemDrop from "@/components/layout/navs/MenuNavItemDrop.vue";
import NavItemDrop from "@/components/layout/navs/NavItemDrop.vue";

import IconChat from "@/components/icons/IconChat.vue";

const store = useAppStore();
const activeDropdown: any = ref("");

const toggleMobileMenu = () => {
    store.toggleMobileMenu();
};
</script>

<template>
    <TitleDivision title="financier" />

    <MenuNavItemDrop label="financier">
        <template #icon>
            <IconChat />
        </template>
        <NavItemDrop to="/financeiro" label="financier" />
    </MenuNavItemDrop>
</template>
