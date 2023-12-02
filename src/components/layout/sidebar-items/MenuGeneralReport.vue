<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconDatatables from "@/components/icons/IconDatatables.vue";
</script>

<template>
    <TitleDivision title="report" />

    <MenuNavItem>
        <NavItem to="/relatorios/medicos" label="doctor">
            <IconDatatables />
        </NavItem>
        <NavItem to="/relatorios/consultas" label="appointment">
            <IconDatatables />
        </NavItem>
    </MenuNavItem>
</template>
