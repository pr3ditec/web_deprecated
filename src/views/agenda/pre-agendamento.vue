<script lang="ts">
import Vue3Datatable from "@bhplugin/vue3-datatable";
import SelectMedico from "../../components/layout/Select-doctor.vue";
import "@bhplugin/vue3-datatable/dist/style.css";
import { inject } from "vue";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
        SelectMedico,
    },
    data() {
        return {
            // api
            request: Object(inject("api")),
            medicoSelect: 0,
            // tabela
            search: "",
            mostrarTabela: false,
            cols: [
                {
                    field: "paciente_nome",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name") + " " + this.$t("patient"),
                },
                {
                    field: "especialidade",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("capabilities"),
                },
                {
                    field: "status",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("status"),
                },
            ],
            dadosTabela: [
                {
                    paciente_nome: "vazio",
                    especialidade: "",
                    status: "",
                },
            ],
        };
    },
    methods: {
        updateMedico(medico: any) {
            this.medicoSelect = medico;
        },

        proporAgendamento(data: any) {
            console.log(data);
        },
    },
    watch: {
        async medicoSelect() {
            await this.request
                .pegarDadosApi(`/pre-agendamento/medico/${this.medicoSelect}`) // colocar o id do medico
                .then((response: any) => {
                    this.dadosTabela = response;
                    this.dadosTabela.forEach((item) => {
                        item["horarios"] = [];
                    });
                });
        },
    },
    created() {},
    mounted() {
        setTimeout(() => (this.mostrarTabela = true), 500);
    },
};
</script>
<template>
    <div class="grid space-y-6 grid-cols-1 items-center">
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4 capitalize">
                {{ $t("schedule_attempt") }}
            </h1>

            <div class="flex flex-row gap-4 align-items-center">
                <h6 class="text-xl font-bold mb-4 capitalize">
                    {{ $t("list") }}
                </h6>
            </div>
        </div>
        <!-- HEADER -->
        <div>
            <SelectMedico
                @update:modelValue="($event) => updateMedico($event)"
            />
        </div>
        <div
            v-if="medicoSelect == 0"
            class="flex flex-col items-center justify-center"
        >
            <h1 class="text-md font-medium">{{ $t("select_doctor") }}</h1>
        </div>
        <div v-else>
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
                    @rowClick="proporAgendamento"
                >
                </vue3-datatable>
                <div v-else>{{ $t("loading") }}</div>
            </div>
        </div>
    </div>
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
}
</style>
