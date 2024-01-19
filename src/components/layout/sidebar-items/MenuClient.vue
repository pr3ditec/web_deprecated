<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";
import DropdownWidget from "./dropdown/DropdownWidget.vue";
</script>
<template>
    <!-- TITULO -->
    <TitleDivision title="person" />
    <!-- TITULO -->

    <!-- CLIENTES -->
    <DropdownWidget
        label="client"
        :routes="[
            { path: '/client/new', label: 'new' },
            { path: '/client/list', label: 'list' },
        ]" />
    <!-- CLIENTES -->

    <!-- TELEFONES -->
    <DropdownWidget
        label="telephone"
        :routes="[
            { path: '/phone/new', label: 'new' },
            { path: '/phone/list', label: 'list' },
        ]" />
    <!-- TELEFONES -->
</template>
