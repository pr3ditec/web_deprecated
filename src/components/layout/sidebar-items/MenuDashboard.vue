<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";
import DropdownWidget from "./dropdown/DropdownWidget.vue";
import IconRegister from "@/components/icons/IconRegister.vue";
import IconDatatables from "@/components/icons/IconDatatables.vue";
import IconComponents from "@/components/icons/IconComponents.vue";
</script>
<template>
    <!-- TITULO -->
    <TitleDivision title="dashboard" />
    <!-- TITULO -->

    <!-- SERVICOS -->
    <DropdownWidget
        label="service"
        :routes="[
            { path: '/service/new', label: 'new' },
            { path: '/service/list', label: 'list' },
        ]">
        <IconRegister />
    </DropdownWidget>
    <!-- SERVICOS -->

    <!-- APARELHOS -->
    <DropdownWidget
        label="equipment"
        :routes="[
            { path: '/equipment/new', label: 'new' },
            { path: '/equipment/list', label: 'list' },
        ]">
        <IconComponents />
    </DropdownWidget>
    <!-- APARELHOS -->

    <!-- TIPO DE SERVICO -->
    <DropdownWidget
        label="service-type"
        :routes="[
            { path: '/type/new', label: 'new' },
            { path: '/type/list', label: 'list' },
        ]">
        <IconDatatables />
    </DropdownWidget>
    <!-- TIPO DE SERVICO -->
</template>
