<script lang="ts">
import { inject } from "vue";
import MascarasInput from "@/helpers/MascaraInput";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
    },
    data() {
        return {
            request: Object(inject("api")),
            mascara: MascarasInput,

            // Dados
            search: "",
            cols: [
                { field: "nome", headerClass: "flex flex-row gap-1 font-extrabold uppercase", title: this.$t("name") },
                {
                    field: "telefone",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("telephone"),
                    cellRenderer: (item: any) => {
                        if (item.telefone.length == 0) {
                            return "";
                        }
                        return Object(item.telefone[0]).telefone;
                    },
                },
                {
                    field: "documento",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("cpf"),
                    cellRenderer: (item: any) => {
                        if (item.documento.length == 0) {
                            return "";
                        }
                        return MascarasInput.cpf(Object(item.documento[0]).numero);
                    },
                },
                {
                    field: "documento",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("cnpj"),
                    cellRenderer: (item: any) => {
                        return MascarasInput.cnpj(Object(item.documento[1]).numero ?? "");
                    },
                },
                {
                    field: "endereco",
                    title: this.$t("city"),
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    cellClass: "uppercase",
                    cellRenderer: (item: any) => {
                        if (item.endereco.length == 0) {
                            return "";
                        }
                        return Object(item.endereco[0]).cidade;
                    },
                },
            ],
            dadosTabela: [
                {
                    nome: "",
                    documento: {},
                    telefone: {},
                    endereco: {},
                    especialidade: {
                        descricao: "",
                    },
                },
            ],
        };
    },
    methods: {},
    async created() {
        await this.request.pegarDadosApi("/medico").then((res: any) => {
            this.dadosTabela = res;
        });
    },
};
</script>

<template>
    <div class="grid space-y-6 grid-cols-1 items-center">
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4 capitalize">{{ $t("doctor") }}</h1>

            <div class="flex flex-row gap-4 align-items-center">
                <h6 class="text-xl font-bold mb-4 capitalize">{{ $t("list") }}</h6>
            </div>
        </div>
        <!-- HEADER -->

        <div class="table-responsive p-6 pt-1 gap-1' flex flex-col items-center">
            <input v-model="search" type="text" class="form-input w-1/2" placeholder="Pesquisar ......" />
            <hr class="w-96 h-0.5 my-1 bg-zinc-300 border-0 rounded md:my-10 dark:bg-gray-700" />
            <vue3-datatable
                class="w-full shadow-md rounded p-2 alt-pagination whitespace-wrap"
                :rows="dadosTabela"
                :columns="cols"
                :totalRows="dadosTabela?.length"
                :sortable="true"
                :search="search"
                firstArrow="First"
                lastArrow="Last"
                previousArrow="Prev"
                nextArrow="Next"
            >
            </vue3-datatable>
        </div>
    </div>
</template>
<style>
    /* alt-pagination */
    .alt-pagination .bh-pagination .bh-page-item {
        @apply !w-max min-w-[32px] !rounded;
    }
</style>