<script lang="ts">
import Vue3Datatable from "@bhplugin/vue3-datatable";
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import Cadastro from "./pre-scheduling-registration.vue";
import Historico from "./pre-scheduling-history.vue";
import "@bhplugin/vue3-datatable/dist/style.css";
import { useAppStore } from "@/stores";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
        SelectMedico,
        Cadastro,
        Historico,
    },
    data() {
        return {
            store: useAppStore(),

            mostrarHistorico: false,
            medicoSelect: 0,
            pacienteSelect: {},
            // tabela
            search: "",
            mostrarTabela: false,
            cols: [
                {
                    field: "paciente_nome",
                    headerClass: "font-extrabold uppercase dark:text-white",
                    title: this.$t("name") + " " + this.$t("patient"),
                },
                {
                    field: "especialidade",
                    headerClass: "font-extrabold uppercase dark:text-white",
                    title: this.$t("capabilities"),
                },
                {
                    field: "status",
                    headerClass: "font-extrabold uppercase dark:text-white",
                    title: this.$t("status"),
                },
                {
                    field: "actions",
                    headerClass: "font-extrabold uppercase dark:text-white",
                    title: this.$t("actions"),
                },
            ],
            dadosTabela: [
                {
                    paciente_nome: "vazio",
                    especialidade: "",
                    status: "",
                },
            ],
            trocar: false,
        };
    },
    methods: {
        updateMedico(medico: any) {
            this.medicoSelect = medico;
        },

        async proporPreAgendamento(data: any) {
            this.trocar = true;
            this.pacienteSelect = data;
        },
        async buscarDados() {
            await this.$api
                .pegarDadosApi(`/pre-agendamento/medico/${this.medicoSelect}`) // colocar o id do medico
                .then((response: any) => {
                    this.dadosTabela = response.list;
                    console.log(response.list);
                    this.dadosTabela.forEach((item) => {
                        item["horarios"] = [];
                    });
                });
        },
        verHistoricoAgenda() {
            this.mostrarHistorico = !this.mostrarHistorico;
            console.log("skrrr");
        },
    },
    computed: {
        cellClasse() {
            if (this.store.isDarkMode) {
                return "text-white";
            }
        },
    },
    watch: {
        async medicoSelect() {
            this.buscarDados();
        },
        trocar() {
            if (!this.trocar) {
                this.buscarDados();
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
        <div>
            <SelectMedico
                @update:modelValue="($event) => updateMedico($event)" />
        </div>
        <div
            v-if="medicoSelect == 0"
            class="flex flex-col items-center justify-center">
            <h1 class="text-md font-medium">{{ $t("select-doctor") }}</h1>
        </div>
        <div v-else>
            <TransitionGroup name="list">
                <div v-if="trocar">
                    <button
                        @click="trocar = false"
                        class="btn btn-sm btn-outline-dark">
                        &#8592;
                    </button>
                    <Cadastro
                        :medico="medicoSelect"
                        :dados-paciente="pacienteSelect" />
                </div>
                <div
                    v-else
                    class="table-responsive p-6 pt-1 gap-1' flex flex-col items-center">
                    <input
                        v-model="search"
                        type="text"
                        class="form-input w-1/2 dark:text-white"
                        placeholder="Pesquisar ......" />
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
                        :cellClass="cellClasse"
                        skin="table-hover"
                        firstArrow="First"
                        lastArrow="Last"
                        previousArrow="Prev"
                        nextArrow="Next">
                        <template #status="data">
                            <div
                                class="flex flex-row cursor-pointer"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="clique para ver historico"
                                @click="verHistoricoAgenda()">
                                <span
                                    v-if="data.value.status_id == -1 && data.value.origem == null"
                                    class="badge bg-secondary"
                                    >{{ data.value.status }}</span
                                >
                                <span
                                    v-if="data.value.status_id == -1 && data.value.origem"
                                    class="badge bg-info uppercase"
                                    >{{ $t("retorno") }}</span
                                >
                                <span
                                    v-if="data.value.status_id == 1"
                                    class="badge bg-primary"
                                    >{{ data.value.status }}</span
                                >
                                <span
                                    v-if="data.value.status_id == 2"
                                    class="badge bg-success"
                                    >{{ data.value.status }}</span
                                >
                                <span
                                    v-if="data.value.status_id >= 3"
                                    class="badge bg-danger"
                                    >{{ data.value.status }}</span
                                >
                            </div>
                        </template>
                        <template #actions="data">
                            <div class="flex gap-4">
                                <button
                                    :disabled="data.value.status_id != -1 || data.value.origem != null"
                                    type="button"
                                    class="btn btn-sm btn-primary capitalize"
                                    @click="proporPreAgendamento(data.value)">
                                    {{ $t("propose") }}
                                </button>
                            </div>
                        </template>
                    </vue3-datatable>
                    <div v-else>{{ $t("loading") }}</div>
                </div>
            </TransitionGroup>
        </div>
    </div>
    <!-- <Historico v-show="mostrarHistorico" :dados-paciente="pacienteSelect" /> -->
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    border-radius: 1px;
    padding: 1rem;
}
</style>
