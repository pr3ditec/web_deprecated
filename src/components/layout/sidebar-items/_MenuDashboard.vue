<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconChat from "@/components/icons/IconChat.vue";
</script>

<template>
    <TitleDivision title="dashboard" />

    <MenuNavItem>
        <NavItem to="/risco-empresarial" label="busines_risk">
            <IconChat />
        </NavItem>

        <NavItem to="/regras" label="regras">
            <IconChat />
        </NavItem>
    </MenuNavItem>
</template>
