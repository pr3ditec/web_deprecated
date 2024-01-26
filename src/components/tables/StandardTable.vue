<script lang="ts" setup>
import Vue3Datatable from "@bhplugin/vue3-datatable";
import ButtonForm from "@/components/form/ButtonForm.vue";
import ButtonIcon from "@/components/form/ButtonIcon.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import "@bhplugin/vue3-datatable/dist/style.css";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Request from "@/helpers/Request";

/** CONTROLE */
const t = useI18n().t;
const props = defineProps({
    route: String,
    pushRoute: String,
});
const router: any = useRouter();
/** CONTROLE */

/** OPTIONS */
const cols = ref([
    {
        field: "nome",
        title: t("name"),
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "status",
        title: "status",
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "created_at",
        title: t("created_at"),
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "updated_at",
        title: t("updated_at"),
        headerClass: "font-semibold text-uppercase",
    },
    {
        field: "btn",
        title: t("actions"),
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

const pushRoute = (id: number) => {
    router.push(`${props.pushRoute}/${id}`);
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
                    @actionCallback="pushRoute(data.value.id)" />
                <IconButton
                    typeClass="btn-secondary"
                    @actionCallback="removeData(data.value.id)">
                    <template #icon>
                        <IconTrash />
                    </template>
                </IconButton>
            </div>
        </template>
    </Vue3Datatable>
</template>
