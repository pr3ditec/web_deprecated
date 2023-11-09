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
let connection = new ApiConnection('http://localhost:8000', '03c7cfdc935d71776f7f0735f8a44bf4', 'admin')
provide("api", connection)


// meta
useMeta({ title: 'Admin' });

const mainLayout = computed(() => {
    return store.mainLayout === 'auth' ? authLayout : appLayout;
});


// para todo o sistma

</script>
