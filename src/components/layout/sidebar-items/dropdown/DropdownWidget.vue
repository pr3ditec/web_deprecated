<script setup>
import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";
import VueCollapsible from "vue-height-collapsible/vue3";
import { ref } from "vue";

/** CONTROLE */
const props = defineProps({
    label: String,
    routes: Array,
});
const activeDropdown = ref(false);
/** CONTROLE */
</script>
<template>
    <MenuNavItem>
        <NavItem
            to=""
            :label="label"
            @click="
                activeDropdown
                    ? (activeDropdown = false)
                    : (activeDropdown = true)
            ">
            <slot></slot>
        </NavItem>
    </MenuNavItem>
    <vue-collapsible :isOpen="activeDropdown">
        <ul class="sub-menu text-gray-500">
            <li v-for="route in routes">
                <router-link :to="route.path">{{
                    $t(route.label)
                }}</router-link>
            </li>
        </ul>
    </vue-collapsible>
</template>
