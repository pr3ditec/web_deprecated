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
            mostrarTabela: false,
            search: "",
            cols: [
                {
                    field: "medico",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("doctor"),
                },
                {
                    field: "paciente",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("patient"),
                },
                {
                    field: "data",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("date"),
                },
                {
                    field: "hora",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("time"),
                },
            ],
            dadosTabela: [{
                medico: "",
                paciente: "",
                data: "",
                hora: ""
            }],
        };
    },
    methods: {},
    async created() {
        await this.request
            .pegarDadosApi("/agendamento/medico/1")
            .then((res: any) => {
                this.dadosTabela = res;
            });
    },
    mounted(){
        setTimeout(() => (this.mostrarTabela = true), 500);
    }
};
</script>

<template>
    <div class="grid space-y-6 grid-cols-1 items-center">
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4 capitalize">
                {{ $t("appointment") }}
            </h1>

            <div class="flex flex-row gap-4 align-items-center">
                <h6 class="text-xl font-bold mb-4 capitalize">
                    {{ $t("list") }}
                </h6>
            </div>
        </div>
        <!-- HEADER -->

        <div
            class="table-responsive p-6 pt-1 gap-1' flex flex-col items-center"
        >
            <input
                v-model="search"
                type="text"
                class="form-input w-1/2"
                placeholder="Pesquisar ......"
            />
            <hr
                class="w-96 h-0.5 my-1 bg-zinc-300 border-0 rounded md:my-10 dark:bg-gray-700"
            />
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
            >
            </vue3-datatable>
            <div v-else>loading</div>
        </div>
    </div>
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
}
</style>
