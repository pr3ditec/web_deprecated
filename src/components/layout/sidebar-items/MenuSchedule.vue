<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItemDrop from "@/components/layout/navs/MenuNavItemDrop.vue";
import NavItemDrop from "@/components/layout/navs/NavItemDrop.vue";

import IconChat from "@/components/icons/IconChat.vue";
</script>

<template>
    <TitleDivision title="schedule" />

    <MenuNavItemDrop label="schedule">
        <template #icon>
            <IconChat />
        </template>
        <NavItemDrop to="/agenda" label="schedule" />
        <NavItemDrop to="/programar-agenda" label="makeAnSchedule" />
        <NavItemDrop to="/pre-agendamento" label="scheduleAttempt" />
    </MenuNavItemDrop>
</template>
