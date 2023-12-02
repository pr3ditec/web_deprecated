<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconRegister from "@/components/icons/IconRegister.vue";
</script>

<template>
    <TitleDivision title="register" />

    <MenuNavItem>
        <NavItem to="/secretaria" label="secretary">
            <IconRegister />
        </NavItem>
        <NavItem to="/clinica" label="clinic">
            <IconRegister />
        </NavItem>
    </MenuNavItem>
</template>
