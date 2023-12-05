<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconComponents from "@/components/icons/IconComponents.vue";
</script>

<template>
    <TitleDivision title="dashboard" />

    <MenuNavItem>
        <NavItem to="/business-risk" label="busines-risk">
            <IconComponents />
        </NavItem>

        <NavItem to="/settings" label="settings">
            <IconComponents />
        </NavItem>
    </MenuNavItem>
</template>
