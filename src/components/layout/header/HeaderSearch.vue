<script lang="ts" setup>
import ResultSearchModal from "./ResultSearchModal.vue";
import FormSearch from "./FormSearch.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores";

const search = ref(false);
const router = useRouter();
const routes: any = ref([]);
const store = useAppStore();

const searchByName = (searchParams: any) => {
    if (searchParams == "") {
        return false;
    }
    if (routes.value.length != 0) {
        routes.value = [];
    }

    router.options.routes.forEach((route) => {
        if (route.meta?.search == undefined) {
            return;
        }

        /** VALIDANDO PERMISSOES PARA VISUALIZAR BUSCA DA ROTA */
        if (route.meta.permission != undefined) {
            const checkPermission = store.checkPermission(
                //@ts-expect-error
                route.meta.permission,
            );
            if (!checkPermission) {
                return;
            }
        }
        /** VALIDANDO PERMISSOES PARA VISUALIZAR BUSCA DA ROTA */

        const routeName = route.meta?.search
            ?.toString()
            .toLowerCase()
            .replace(/[;,]/g, "");
        if (routeName?.includes(searchParams)) {
            routes.value.push(route);
            search.value = true;
        }
    });
};

const typingEvent = (typing: any) => {
    if (typing != "Enter") {
        routes.value = [];
        search.value = false;
    }
};
</script>

<template>
    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
        <FormSearch @enterAction="searchByName" @typeAction="typingEvent" />
        <ResultSearchModal
            v-if="search"
            :routes="routes"
            @closeSearch="search = false" />
    </div>
</template>
