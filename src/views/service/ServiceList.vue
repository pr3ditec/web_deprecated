<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Request from "@/helpers/Request";
import StandartTable from "@/components/tables/StandardTable.vue";

/** CONTROLE */
const router = useRouter();
/** CONTROLE */

/** OPTIONS */
const cols = ref([
    {
        field: "nome",
        title: "names",
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "status",
        title: "status",
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "created_at",
        title: "created_at",
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "updated_at",
        title: "updated_at",
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "btn",
        title: "actions",
        headerClass: "font-semibold text-uppercase",
    },
]);

const rows: any = ref([]);
/** OPTIONS */

/** FUNCOES */
const retrieveData = async () => {
    console.log("retrieveData");
};
const removeData = async (id: number) => {
    console.log("dataRemove");
};
/** FUNCOES */

/** HOOKS */
onMounted(() => {
    retrieveData();
});
/** HOOKS */
</script>
<template>
    <StandartTable route="/servico" pushRoute="/servico" />
</template>
