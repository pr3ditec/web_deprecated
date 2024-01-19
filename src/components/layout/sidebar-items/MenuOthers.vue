<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";
import DropdownWidget from "./dropdown/DropdownWidget.vue";
import IconInvoice from "@/components/icons/IconInvoice.vue";
import IconDatatables from "@/components/icons/IconDatatables.vue";
</script>
<template>
    <!-- TITULO -->
    <TitleDivision title="others" />
    <!-- TITULO -->

    <!-- PAYMENT METHOD -->
    <DropdownWidget
        label="payment-method"
        :routes="[
            { path: '/payment/new', label: 'new' },
            { path: '/payment/list', label: 'list' },
        ]">
        <IconInvoice />
    </DropdownWidget>
    <!-- PAYMENT METHOD-->

    <!-- CITIES -->
    <DropdownWidget
        label="cities"
        :routes="[
            { path: '/cities/new', label: 'new' },
            { path: '/cities/list', label: 'list' },
        ]">
        <IconDatatables />
    </DropdownWidget>
    <!-- CITIES -->
</template>
