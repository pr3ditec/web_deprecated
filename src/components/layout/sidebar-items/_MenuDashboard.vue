<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconComponents from "@/components/icons/IconComponents.vue";
const store = useAppStore();

const showTitle = computed(() => {
    return (
        store.checkPermission("rel-risco-empresarial") ||
        store.checkPermission("gravar-risco-empresarial") ||
        store.checkPermission("cadastro-valor-consulta")
    );
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="dashboard" />

    <MenuNavItem>
        <div v-if="store.checkPermission('rel-risco-empresarial')">
            <NavItem to="/business-risk" label="busines-risk">
                <IconComponents />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('gravar-risco-empresarial')">
            <NavItem to="/settings" label="settings">
                <IconComponents />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('cadastro-valor-consulta')">
            <NavItem to="/doctor-settings" label="doctor-settings">
                <IconComponents />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
