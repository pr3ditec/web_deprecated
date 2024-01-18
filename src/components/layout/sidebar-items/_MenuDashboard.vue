<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconComponents from "@/components/icons/IconComponents.vue";
import IconInvoice from "@/components/icons/IconInvoice.vue";
import IconDatatables from "@/components/icons/IconDatatables.vue";

const store = useAppStore();

const showTitle = computed(() => {
    return (
        store.checkPermission("rel-risco-empresarial") ||
        store.checkPermission("gravar-risco-empresarial") ||
        store.checkPermission("cadastro-valor-consulta") ||
        store.checkPermission("visualizar-todas-parcelas") ||
        store.checkPermission("aprovar-recusar-investidor")
    );
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="dashboard" />

    <MenuNavItem>
        <NavItem to="/business-risk" label="busines-risk">
            <IconComponents />
        </NavItem>
    </MenuNavItem>
</template>
