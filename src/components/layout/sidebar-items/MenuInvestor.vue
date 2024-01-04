<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconInvoice from "@/components/icons/IconInvoice.vue";
import IconRegister from "@/components/icons/IconRegister.vue";
const store = useAppStore();
</script>

<template>
    <TitleDivision title="investor" />

    <MenuNavItem>
        <div>
            <NavItem to="/investor" label="investor">
                <IconRegister />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('categoria-investimento')">
            <NavItem
                to="/investment-registration"
                label="investment-registration">
                <IconRegister />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('produtos-itens-investimento')">
            <NavItem
                to="/investment"
                label="investment">
                <IconInvoice />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
