<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconChat from "@/components/icons/IconChat.vue";
</script>

<template>
    <TitleDivision title="financier" />

    <MenuNavItem>
        <NavItem to="/financeiro" label="financier">
            <IconChat />
        </NavItem>
    </MenuNavItem>
</template>
