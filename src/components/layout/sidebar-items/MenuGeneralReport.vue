<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconDatatables from "@/components/icons/IconDatatables.vue";
const store = useAppStore();
</script>

<template>
    <TitleDivision title="report" />

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
