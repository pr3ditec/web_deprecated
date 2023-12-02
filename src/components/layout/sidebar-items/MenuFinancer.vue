<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconInvoice from "@/components/icons/IconInvoice.vue";
</script>

<template>
    <TitleDivision title="financier" />

    <MenuNavItem>
        <NavItem to="/financeiro" label="financier">
            <IconInvoice />
        </NavItem>
    </MenuNavItem>
</template>
