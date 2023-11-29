<script>
import ApiConnection from "@/api/Api";
import Multiselect from "@suadelabs/vue3-multiselect";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";

export default {
    components: {
        Multiselect,
    },
    props: {
        dataAgendar: Object,
        medico: Number,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectInput: "",
            preAgendamentoShowSelect: true,
            preAgendamento: [],
            retornoAgenda: [],
            radioTipo: "consulta",
        };
    },
    methods: {
        /** EMITS */
        emitPropostaAgendamento() {
            this.$emit("update:modalAgendamento", {
                tipo: this.radioTipo,
                modalDados: this.selectInput,
            });
        },
        emitFecharModal() {
            this.$emit("update:fecharModal");
        },
        /** EMITS */

        async buscarDadosDePreAgendamento() {
            await this.request
                .pegarDadosApi(`/pre-agendamento/medico/${this.medico}`)
                .then((response) => {
                    this.preAgendamento = response.list;
                });
        },
        async buscarDadosParaRetorno() {
            await this.request
                .pegarDadosApi(`/agendamento/medico/${this.medico}`)
                .then((response) => {
                    this.retornoAgenda = response.list;
                });
        },
        limparVariaveis() {
            this.selectInput = "";
        },
    },
    watch: {
        radioTipo() {
            if (this.radioTipo == "consulta") {
                this.limparVariaveis();
                this.preAgendamentoShowSelect = true;
            } else {
                this.limparVariaveis();
                this.preAgendamentoShowSelect = false;
            }
        },
    },
    async created() {
        this.limparVariaveis();
        this.buscarDadosDePreAgendamento();
        this.buscarDadosParaRetorno();
    },
};
</script>
<template>
    <Transition :duration="200">
        <div
            class="absolute inset-0 flex items-center justify-center w-full h-full top-0 left-0 bg-dark bg-opacity-50"
            style="z-index: 2000 !important">
            <div
                class="flex flex-col items-center bg-white shadow-lg w-1/3 mx-auto p-5 rounded-lg">
                <div class="flex flex-row w-full justify-end">
                    <span
                        class="text-2xl font-bold text-dark opacity-30 uppercase cursor-pointer"
                        @click="emitFecharModal"
                        >x</span
                    >
                </div>
                <h1 class="text-xl font-semibold mt-4">
                    {{ $t("select_patient") }}
                </h1>
                <hr class="w-75 m-2" />
                <div class="flex flex-row justify-around gap-3 mt-2 mb-2 w-1/2">
                    <label class="inline-flex">
                        <input
                            type="radio"
                            name="default_text_color"
                            class="form-radio"
                            value="consulta"
                            v-model="radioTipo" />
                        <span class="uppercase">{{ $t("appointment") }}</span>
                    </label>
                    <label class="inline-flex">
                        <input
                            type="radio"
                            name="default_text_color"
                            class="form-radio peer-checked"
                            value="retorno"
                            v-model="radioTipo" />
                        <span class="uppercase">{{ $t("return") }}</span>
                    </label>
                </div>
                <div class="w-full p-4">
                    <multiselect
                        v-show="preAgendamentoShowSelect"
                        v-model="selectInput"
                        :options="preAgendamento"
                        track-by="id"
                        label="paciente_nome"
                        class="custom-multiselect"
                        :searchable="true"
                        placeholder="Selecione um paciente"></multiselect>
                    <multiselect
                        v-show="!preAgendamentoShowSelect"
                        v-model="selectInput"
                        :options="retornoAgenda"
                        track-by="agenda_id"
                        label="paciente"
                        class="custom-multiselect"
                        :searchable="true"
                        placeholder="Selecione um paciente"></multiselect>
                </div>
                <button
                    class="btn btn-sm btn-primary mt-4 w-1/2 uppercase"
                    @click="emitPropostaAgendamento()">
                    marcar {{ radioTipo }}
                </button>
            </div>
        </div>
    </Transition>
</template>
