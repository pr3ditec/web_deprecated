<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

import MenuNavItem from "@/components/layout/navs/MenuNavItem.vue";
import NavItem from "@/components/layout/navs/NavItem.vue";

import IconCalendar from "@/components/icons/IconCalendar.vue";
const store = useAppStore();
</script>

<template>
    <TitleDivision title="schedule" />

    <MenuNavItem>
        <div v-if="store.checkPermission('medico-agenda')">
            <NavItem to="/schedule" label="schedule">
                <IconCalendar />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('horarios-atendimento-medico')">
            <NavItem to="/schedule-programming" label="makeAnSchedule">
                <IconCalendar />
            </NavItem>
        </div>

        <div v-if="store.checkPermission('pre-agendamento-agenda')">
            <NavItem to="/pre-scheduling" label="scheduleAttempt">
                <IconCalendar />
            </NavItem>
        </div>
    </MenuNavItem>
</template>
