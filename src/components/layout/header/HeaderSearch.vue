<script lang="ts" setup>
import ResultSearchModal from "./ResultSearchModal.vue";
import FormSearch from "./FormSearch.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const search = ref(false);
const router = useRouter();
const routes: any = ref([]);

const searchByName = (searchParams: any) => {
    if (searchParams == "") {
        return false;
    }
    if (routes.value.length != 0) {
        routes.value = [];
    }
    router.options.routes.forEach((route) => {
        const routeName = route.name?.toString().toLowerCase();
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
