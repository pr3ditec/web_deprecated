<script>
import { useAppStore } from "@/stores";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

export default {
    components: {
        Vue3Datatable,
    },
    data() {
        return {
            store: useAppStore(),
            clinicas: [],
            loading: true,
            cols: [
                {
                    field: "nome",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name"),
                },
                {
                    field: "cidade",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("city"),
                },
                {
                    field: "uf",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("state"),
                },
                {
                    field: "cep",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("cep"),
                },
            ],
            mapa: null,
        };
    },
    methods: {
        async buscarClinica() {
            await this.store.request
                .pegarDadosApi(`/medico/${this.store.getDoctorId()}`)
                .then((res) => {
                    if (res.status) {
                        this.clinicas = res.list.clinica;
                    }
                })
                .finally(() => (this.loading = false));
        },
    },
    async created() {
        await this.buscarClinica();
    },
};
</script>
<template>
    <div class="flex flex-col md:flex-row h-full gap-2">
        <div class="w-full rounded-lg h-full">
            <Vue3Datatable
                class="w-full shadow-md rounded alt-pagination whitespace-wrap dark:text-white mt-2"
                :rows="clinicas"
                :columns="cols"
                :total-rows="clinicas?.length"
                :sortable="true"
                :loading="loading"
                :paginationInfo="`${$t('total-data')} ${clinicas.length}, ${$t(
                    'per-page',
                )}`"
                @rowClick="criarMapa">
            </Vue3Datatable>
        </div>
    </div>
</template>
