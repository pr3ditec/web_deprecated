<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";
import DropdownWidget from "./dropdown/DropdownWidget.vue";
import IconUser from "@/components/icons/IconUser.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconPhone from "@/components/icons/IconPhone.vue"
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
        ]">
        <IconUser />
    </DropdownWidget>
    <!-- CLIENTES -->

    <!-- TELEFONES -->
    <DropdownWidget
        label="telephone"
        :routes="[
            { path: '/phone/new', label: 'new' },
            { path: '/phone/list', label: 'list' },
        ]">
        <IconPhone />
    </DropdownWidget>
    <!-- TELEFONES -->

    <!-- ENDERECO -->
    <DropdownWidget
        label="address"
        :routes="[
            { path: '/address/new', label: 'new' },
            { path: '/address/list', label: 'list' },
        ]">
        <IconLocation />
    </DropdownWidget>
    <!-- ENDERECO -->
</template>
