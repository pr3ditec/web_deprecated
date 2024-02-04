<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";
import DropdownWidget from "./dropdown/DropdownWidget.vue";
import IconComponents from "@/components/icons/IconComponents.vue";
</script>
<template>
    <!-- TITULO -->
    <TitleDivision title="equipment" />
    <!-- TITULO -->

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

    <!-- TIPO APARELHOS -->
    <DropdownWidget
        label="equipment-type"
        :routes="[
            { path: '/equipment/type/new', label: 'new' },
            { path: '/equipment/type/list', label: 'list' },
        ]">
        <IconComponents />
    </DropdownWidget>
    <!-- TIPO APARELHOS -->
</template>
