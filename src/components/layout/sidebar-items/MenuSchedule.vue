<script lang="ts" setup>
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconCalendar from "@/components/icons/IconCalendar.vue";
</script>

<template>
    <TitleDivision title="schedule" />

    <MenuNavItem>
        <NavItem to="/agenda" label="schedule">
            <IconCalendar />
        </NavItem>
        <NavItem to="/programar-agenda" label="makeAnSchedule">
            <IconCalendar />
        </NavItem>
        <NavItem to="/pre-agendamento" label="scheduleAttempt">
            <IconCalendar />
        </NavItem>
    </MenuNavItem>
</template>
