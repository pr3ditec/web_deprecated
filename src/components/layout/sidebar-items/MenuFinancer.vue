<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconInvoice from "@/components/icons/IconInvoice.vue";
const store = useAppStore();

const showTitle = computed(() => {
    return store.checkPermission("medico-financeiro");
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="financier" />

    <MenuNavItem>
        <div v-if="store.checkPermission('medico-financeiro')">
            <NavItem to="/financier" label="financier">
                <IconInvoice />
            </NavItem>
        </div>
        <div v-if="store.checkPermission('visualizar-todas-parcelas')">
            <NavItem to="/financier/admin" label="admin-financier">
                <IconInvoice />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
