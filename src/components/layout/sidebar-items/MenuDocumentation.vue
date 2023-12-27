<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconRegister from "@/components/icons/IconRegister.vue";
const store = useAppStore();

const showTitle = computed(() => {
    return (
        store.checkPermission("documentacao")
    );
});
</script>

<template>
    <TitleDivision v-if="showTitle" title="documentation" />

    <MenuNavItem>
        <div>
            <NavItem to="/documentation" label="documentation">
                <IconRegister />
            </NavItem>
        </div>

    </MenuNavItem>
</template>
