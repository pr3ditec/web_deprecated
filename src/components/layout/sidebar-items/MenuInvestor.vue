<script lang="ts" setup>
// import { computed } from "vue";
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconRegister from "@/components/icons/IconRegister.vue";
const store = useAppStore();

// const showTitle = computed(() => {
//     return (
//         store.checkPermission("") ||
//         store.checkPermission("")
//     );
// });
</script>

<template>
    <TitleDivision title="investor" />

    <MenuNavItem>
        <div>
            <NavItem to="/investor" label="investor">
                <IconRegister />
            </NavItem>
        </div>

        <div>
            <NavItem to="/investment-registration" label="investment-registration">
                <IconRegister />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
