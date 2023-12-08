<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconDatatables from "@/components/icons/IconDatatables.vue";
const store = useAppStore();

const showTitle = computed(() => {
    return (
        store.checkPermission("busca-medicos") ||
        store.checkPermission("medico-agenda")
    );
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="report" />

    <MenuNavItem>
        <div v-if="store.checkPermission('busca-medicos')">
            <NavItem to="/relatorios/medicos" label="doctor">
                <IconDatatables />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('medico-agenda')">
            <NavItem to="/relatorios/consultas" label="appointment">
                <IconDatatables />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
