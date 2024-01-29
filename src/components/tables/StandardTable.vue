<script lang="ts" setup>
import { ref, onMounted, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import Response from "@/helpers/Response";
import ButtonForm from "@/components/form/ButtonForm.vue";
import ButtonIcon from "@/components/form/ButtonIcon.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconLoading from "@/components/icons/IconLoading.vue";
import SpanStatus from "@/components/tables/SpanStatus.vue";
import ReadableDate from "./ReadableDate.vue";
import HelpTables from "./HelpTables.vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import Searchbar from "./Searchbar.vue";

/** CONTROLE */
const t = useI18n().t;
const request: any = Object(inject("request"));
const props = defineProps({
    route: String,
    pushRoute: String,
});
const router: any = useRouter();
const isLoading: any = ref(true);
const search: any = ref("");
/** CONTROLE */

/** OPTIONS */
const cols = ref([
    {
        field: "nome",
        title: t("name"),
        headerClass: "semibold uppercase dark:text-white",
    },
    {
        field: "ativo",
        title: "status",
        headerClass: "semibold uppercase dark:text-white",
    },
    {
        field: "created_at",
        title: t("created_at"),
        headerClass: "semibold uppercase dark:text-white",
    },
    {
        field: "updated_at",
        title: t("updated_at"),
        headerClass: "semibold uppercase dark:text-white",
    },
    {
        field: "btn",
        title: t("actions"),
        headerClass: "semibold uppercase dark:text-white",
    },
]);

const rows: any = ref([]);
/** OPTIONS */

/** FUNCOES */
const retrieveData = async () => {
    await request
        .get(`${props.route}`)
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
        await request
            .put(`${props.route}/${id}`, {
                ativo: !ativo,
            })
            .then((res: any) => {
                Response.mensagemToast(res.data.status, res.data.message);
            })
            .finally(() => (isLoading.value = true));
    }
};

const removeData = async (id: number) => {
    const response = await Response.confirmToast("Deletar item ?");
    if (response) {
        await request
            .del(`${props.route}/${id}`)
            .then((res: any) => {
                Response.mensagemToast(res.data.status, res.data.message);
            })
            .finally(() => (isLoading.value = true));
    }
};

const pushRoute = (id: number) => {
    router.push(`${props.pushRoute}/${id}`);
};
/** FUNCOES */

/** WATCHER */
watch(isLoading, (old, novo) => {
    if (old && !novo) {
        retrieveData();
    }
});
/** WATCHER */

/** HOOKS */
onMounted(() => {
    retrieveData();
});
/** HOOKS */
</script>
<template>
    <IconLoading v-if="isLoading" />
    <div v-else class="flex flex-col gap-2">
        <div class="mt-2 mb-2 mx-auto w-1/2">
            <Searchbar @searchCallback="(value: any) => (search = value)" />
        </div>
        <Vue3Datatable
            skin="bh-table-striped dark:text-white"
            :rows="rows"
            :columns="cols"
            :search="search"
            :sortable="true"
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
    </div>
    <HelpTables />
</template>
