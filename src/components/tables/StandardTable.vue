<script lang="ts" setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Response from "@/helpers/Response";
import ButtonForm from "@/components/form/ButtonForm.vue";
import ButtonIcon from "@/components/form/ButtonIcon.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconLoading from "@/components/icons/IconLoading.vue";
import SpanStatus from "@/components/tables/SpanStatus.vue";
import ReadableDate from "./ReadableDate.vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

/** CONTROLE */
const t = useI18n().t;
const request: any = Object(inject("request"));
const props = defineProps({
    route: String,
    pushRoute: String,
});
const router: any = useRouter();
const isLoading: any = ref(true);
/** CONTROLE */

/** OPTIONS */
const cols = ref([
    {
        field: "nome",
        title: t("name"),
        headerClass: "semibold uppercase",
    },
    {
        field: "ativo",
        title: "status",
        headerClass: "semibold uppercase",
    },
    {
        field: "created_at",
        title: t("created_at"),
        headerClass: "semibold uppercase",
    },
    {
        field: "updated_at",
        title: t("updated_at"),
        headerClass: "semibold uppercase",
    },
    {
        field: "btn",
        title: t("actions"),
        headerClass: "semibold uppercase",
    },
]);

const rows: any = ref([]);
/** OPTIONS */

/** FUNCOES */
const retrieveData = async () => {
    await request
        .get("/aparelho")
        .then((res: any) => {
            if (!res.data.status) {
                return Response.mensagemToast(
                    res.data.status,
                    res.data.messageCode,
                );
            }

            return (rows.value = res.data.content);
        })
        .finally(() => {
            isLoading.value = false;
        });
};
const updateStatus = async (id: number, ativo: any) => {
    const response = await Response.confirmToast("Alterar status ?");
    if (response) {
        await request.put(`/aparelho/${id}`, {
            ativo: !ativo,
        });
    }
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
    <IconLoading v-if="isLoading" />
    <Vue3Datatable
        v-else
        skin="bh-table-striped"
        :rows="rows"
        :columns="cols"
        :totalRows="rows?.length">
        <template #created_at="data">
            <ReadableDate :date="data.value.created_at" />
        </template>
        <template #updated_at="data">
            <ReadableDate :date="data.value.updated_at" />
        </template>
        <template #ativo="data">
            <SpanStatus
                :status="data.value.ativo"
                @click="updateStatus(data.value.id, data.value.ativo)" />
        </template>
        <template #btn="data">
            <div class="flex flex-row gap-1">
                <ButtonForm
                    class="basis-2/4"
                    text="seeMore"
                    typeClass="btn-primary"
                    @actionCallback="pushRoute(data.value.id)" />
                <ButtonIcon
                    class="basis-1/4"
                    typeClass="btn-dark "
                    @actionCallback="removeData(data.value.id)">
                    <template #icon>
                        <IconTrash />
                    </template>
                </ButtonIcon>
            </div>
        </template>
    </Vue3Datatable>
</template>
