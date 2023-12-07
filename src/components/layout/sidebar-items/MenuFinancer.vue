<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconInvoice from "@/components/icons/IconInvoice.vue";
const store = useAppStore();
</script>

<template>
    <TitleDivision title="financier" />

    <MenuNavItem>
        <div v-if="store.checkPermission('medico-financeiro')">
            <NavItem to="/financeiro" label="financier">
                <IconInvoice />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
