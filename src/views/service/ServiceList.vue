<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Request from "@/api/Request";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import ButtonForm from "@/components/form/ButtonForm.vue";
import IconButton from "@/components/form/IconButton.vue";
import "@bhplugin/vue3-datatable/dist/style.css";

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
    <Vue3Datatable
        skin="bh-table-striped"
        :rows="rows"
        :columns="cols"
        :totalRows="rows?.length">
        <template #status="data">
            <SpanStatus :status="data.value.status" />
        </template>
        <template #btn="data">
            <div class="d-flex flex-row gap-1">
                <ButtonForm
                    text="seeMore"
                    typeClass="btn-primary"
                    @actionCallback="
                        router.push(`/equ
                        ipment/${data.value.id}`)
                    " />
                <IconButton
                    typeClass="btn-secondary"
                    @actionCallback="removeData(data.value.id)">
                    <template #icon> sasdafsd </template>
                </IconButton>
            </div>
        </template>
    </Vue3Datatable>
</template>
