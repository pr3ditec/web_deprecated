<script lang="ts">
import MascarasInput from "@/helpers/MascaraInput";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import { useAppStore } from "@/stores";
import FormatoData from "@/helpers/FormatoData";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
    },
    data() {
        return {
            mascara: MascarasInput,
            store: useAppStore(),

            // Dados
            mostrarTabela: false,
            search: "",
            cols: [
                {
                    field: "medico",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("doctor"),
                },
                {
                    field: "paciente",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("patient"),
                },
                {
                    field: "data",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("date"),
                    cellRenderer: (data: any) => {
                        return FormatoData.formatarParaPadraoBrasil(
                            FormatoData.formatarParaApi(data.data)["data"],
                        );
                    },
                },
                {
                    field: "hora",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("time"),
                },
            ],
            dadosTabela: [
                {
                    medico: "",
                    paciente: "",
                    data: "",
                    hora: "",
                },
            ],
        };
    },
    methods: {},
    async created() {
        //@ts-expect-error
        await this.$api
            .pegarDadosApi("/agendamento/medico/1")
            .then((res: any) => {
                this.dadosTabela = res.list;
            });
    },
    computed: {
        cellClasse() {
            if (this.store.isDarkMode) {
                return "text-white";
            }
        },
    },
    mounted() {
        setTimeout(() => (this.mostrarTabela = true), 500);
    },
};
</script>

<template>
    <div class="grid space-y-6 grid-cols-1 items-center mt-5 p-4">
        <div
            class="table-responsive p-6 pt-1 gap-1' flex flex-col items-center">
            <input
                v-model="search"
                type="text"
                class="form-input w-1/2 dark:text-white"
                placeholder="Pesquisar ..." />
            <hr
                class="w-96 h-0.5 my-1 bg-zinc-300 border-0 rounded md:my-10 dark:bg-gray-700" />
            <vue3-datatable
                v-if="mostrarTabela"
                class="w-full shadow-md rounded p-2 alt-pagination whitespace-wrap"
                :rows="dadosTabela"
                :columns="cols"
                :totalRows="dadosTabela?.length"
                :sortable="true"
                :search="search"
                rowClasse="bg-zinc-200"
                skin="table-hover"
                :cellClass="cellClasse">
            </vue3-datatable>
            <div v-else>{{ $t("loading") }}</div>
        </div>
    </div>
</template>

<style>
.alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
}
</style>
