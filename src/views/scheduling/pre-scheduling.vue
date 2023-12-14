<script lang="ts">
import Vue3Datatable from "@bhplugin/vue3-datatable";
import SelectDoctor from "@/components/layout/SelectDoctor.vue";
import Cadastro from "./pre-scheduling-registration.vue";
import "@bhplugin/vue3-datatable/dist/style.css";
import { useAppStore } from "@/stores";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
        SelectDoctor,
        Cadastro,
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
            await this.store.request
                .pegarDadosApi(`/pre-agendamento/medico/${this.medicoSelect}`)
                .then((response: any) => {
                    this.dadosTabela = [];
                    response.list.forEach((item: any) => {
                        item["horarios"] = [];
                        this.dadosTabela.push(item);
                    });
                });
        },
    },
    computed: {
        cellClasse() {
            if (this.store.isDarkMode) {
                return "text-white";
            }
        },
        placeholder() {
            return this.$t("search-by-patient");
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
            <SelectDoctor
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
                        :placeholder="placeholder" />
                    <hr
                        class="w-96 h-0.5 my-1 bg-zinc-300 border-0 rounded md:my-10 dark:bg-gray-700" />
                    <vue3-datatable
                        v-if="mostrarTabela"
                        class="w-full shadow-md rounded p-2 alt-pagination whitespace-wrap"
                        :rows="dadosTabela"
                        :columns="cols"
                        :totalRows="dadosTabela?.length"
                        :paginationInfo="`${$t('total-data')} ${
                            dadosTabela.length
                        }, ${$t('per-page')}`"
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
                                title="clique para ver historico">
                                <span
                                    v-if="data.value.status_id == -1"
                                    class="badge bg-secondary uppercase"
                                    >{{
                                        data.value.origem
                                            ? $t("return")
                                            : data.value.status
                                    }}</span
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
                                    :disabled="data.value.status_id != -1"
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
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    border-radius: 1px;
    padding: 1rem;
}
</style>
