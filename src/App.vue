<template>
    <div class="main-section antialiased relative font-nunito text-sm font-normal"
        :class="[store.sidebar ? 'toggle-sidebar' : '', store.menu, store.layout, store.rtlClass]">
        <component v-bind:is="mainLayout"></component>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import appLayout from '@/layouts/app-layout.vue';
import authLayout from '@/layouts/auth-layout.vue';

import { useAppStore } from '@/stores/index';
import { useMeta } from '@/composables/use-meta';
import { provide } from 'vue';

import ApiConnection from './api/Api';

const store = useAppStore();

// Aqui vai ser feito um compartilhamento com todas as bibliotecas
let connection = new ApiConnection('http://127.0.0.1:8000', 'ead8ae26e4375ea8280b336f4d438666')
provide("api", connection)


// meta
useMeta({ title: 'Sales Admin' });

const mainLayout = computed(() => {
    return store.mainLayout === 'auth' ? authLayout : appLayout;
});


// para todo o sistma

</script>
