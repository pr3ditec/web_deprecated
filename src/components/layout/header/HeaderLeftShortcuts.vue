<script lang="ts" setup>
import HeaderShortcutSchedule from "./HeaderShortcutSchedule.vue";
import HeaderShortcutPreSchedule from "./HeaderShortcutPreSchedule.vue";
import { useAppStore } from "@/stores";
import { computed } from "vue";
import HeaderShortcutConfig from "./HeaderShortcutConfig.vue";

const store = useAppStore();

const showShortcutSchedule = computed(() => {
    return (
        store.checkPermission("medico-agenda") ||
        store.checkPermission("horarios-atendimento-medico") ||
        store.checkPermission("pre-agendamento-agenda")
    );
});

const showShortcutConfig = computed(() => {
    return store.checkPermission("cadastro-valor-consulta");
});
</script>
<template>
    <div class="ltr:mr-2 rtl:ml-2 hidden sm:block">
        <ul
            class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
            <HeaderShortcutPreSchedule v-if="showShortcutSchedule" />
            <HeaderShortcutSchedule v-if="showShortcutSchedule" />
            <HeaderShortcutConfig v-if="showShortcutConfig" />
        </ul>
    </div>
</template>
