<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconRegister from "@/components/icons/IconRegister.vue";
const store = useAppStore();

const showTitle = computed(() => {
    return (
        store.checkPermission("secretaria-medico") ||
        store.checkPermission("cadastro-clinica")
    );
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="register" />

    <MenuNavItem>
        <div v-if="store.checkPermission('secretaria-medico')">
            <NavItem to="/secretaria" label="secretary">
                <IconRegister />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('cadastro-clinica')">
            <NavItem to="/clinica" label="clinic">
                <IconRegister />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
