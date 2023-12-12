<script lang="ts">
import MascarasInput from "@/helpers/MascaraInput";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import { useAppStore } from "@/stores";

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
                    field: "nome",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("name"),
                },
                {
                    field: "telefone",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
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
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("cpf"),
                    cellRenderer: (item: any) => {
                        if (item.documento.length == 0) {
                            return "";
                        }
                        return MascarasInput.cpf(
                            Object(item.documento[0]).numero,
                        );
                    },
                },
                {
                    field: "documento",
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    title: this.$t("cnpj"),
                    cellRenderer: (item: any) => {
                        return MascarasInput.cnpj(
                            Object(item.documento[1]).numero ?? "",
                        );
                    },
                },
                {
                    field: "endereco",
                    title: this.$t("city"),
                    headerClass: "font-extrabold uppercase dark:text-zinc-100",
                    cellClass: "uppercase",
                    cellRenderer: (item: any) => {
                        return item.endereco
                            ? Object(item.endereco[0]).cidade
                            : "";
                    },
                },
            ],
            dadosTabela: [
                {
                    nome: "",
                    documento: [
                        {
                            cpf: "",
                        },
                    ],
                    telefone: {},
                    endereco: {},
                    especialidade: {
                        descricao: "",
                    },
                },
            ],
        };
    },
    computed: {
        cellClasse() {
            if (this.store.isDarkMode) {
                return "text-white";
            }
        },

        placeholder(){
            return this.$t('search-by-name')
        }
    },
    async created() {
        //@ts-expect-error
        await this.$api
            .pegarDadosApi("/medico")
            .then((res: any) => {
                this.dadosTabela = res.list;
            })
            .finally(() => (this.mostrarTabela = true));
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
                :placeholder=placeholder />
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
                firstArrow="First"
                lastArrow="Last"
                previousArrow="Prev"
                nextArrow="Next"
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
.dark .bh-pagination-info {
    color: white;
}
</style>
