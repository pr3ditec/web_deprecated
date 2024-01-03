<script>
import Response from "@/api/Response";
import FormatoData from "@/helpers/FormatoData";
import { useAppStore } from "@/stores";
import Multiselect from "@suadelabs/vue3-multiselect";

export default {
    props: {
        horarios: Array,
        medico: Number,
    },
    components: {
        Multiselect,
    },
    data() {
        return {
            store: useAppStore(),
            selectedDate: -1,
            selectedTime: -1,
            parcelas: 1,
            paciente: {},
            especialidade: -1,
            encontrada: false,
        };
    },
    methods: {
        async buscarEspecialidade() {
            await this.store.request
                .pegarDadosApi(`medico/especialidade/${this.medico}`)
                .then((res) => {
                    this.especialidades = res.list;
                });
        },
        async pesquisarPaciente(cpf) {
            if (cpf.length == 14) {
                cpf = cpf.replaceAll(".", "").replaceAll("-", "");
                await this.store.request
                    .pegarDadosApi(`busca/paciente/cpf/${cpf}`)
                    .then(async (res) => {
                        if (res.status) {
                            this.encontrada = true;
                            this.paciente = res.list;
                        } else {
                            this.encontrada = false;
                            this.paciente = {};
                        }
                    });
            }
        },
        async marcarConsultaDireta() {
            await this.store.request
                .enviarDadosApi("pre-agendamento/cadastro-secretaria", {
                    paciente_id: this.paciente.paciente_id,
                    medico_id: this.medico,
                    especialidade_id: this.especialidade,
                    total_parcelas: this.parcelas,
                    data_atendimento: this.horarios[this.selectedDate].data,
                    hora_atendimento: `${
                        this.horarios[this.selectedDate].horarios[
                            this.selectedTime
                        ].hora
                    }:00`,
                })
                .then((res) => {
                    console.log(res);
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          );
                });
        },
        dataParaPadrao(data) {
            return FormatoData.formatarParaPadraoBrasil(data);
        },
    },
    created() {
        this.buscarEspecialidade();
    },
};
</script>
<template>
    <div class="">
        <button @click="$emit('closeDirect')" class="btn btn-outline-dark">
            &#8592;
        </button>
    </div>
    <div class="flex flex-col w-full md:w-1/2 mx-auto">
        <!-- PACOENTE -->
        <div class="p-2 mt-3">
            <label class="capitalize">{{ $t("patient") }}</label>
            <input
                @keyup="($event) => pesquisarPaciente($event.target.value)"
                v-mask="'###.###.###-##'"
                class="form-input"
                type="text"
                placeholder="000.000.000-00" />
            <label v-show="!encontrada" class="text-danger mt-0">{{
                $t("not-found")
            }}</label>
        </div>
        <Transition>
            <div
                v-show="encontrada"
                class="w-full mt-2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div class="p-5 flex items-center flex-col sm:flex-row">
                    <div class="mb-5 w-20 h-20 rounded-full overflow-hidden">
                        <img
                            src="/assets/images/logo.png"
                            alt=""
                            class="w-full h-full object-cover" />
                    </div>
                    <div
                        class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                        <h5
                            class="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                            {{ paciente.nome }}
                        </h5>
                        <p class="mb-2 text-white-dark">
                            {{ $t("secretary") }}
                        </p>
                        <span class="badge bg-primary rounded-full">Ativo</span>
                        <p
                            class="font-semibold text-white-dark mt-4 sm:mt-8 dark:text-white">
                            {{ $t("secretary-linked") }}
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- PACOENTE -->

        <div>
            <select class="form-select" v-model="especialidade">
                <option disabled selected value="-1">
                    {{ $t("select-capabilites") }}
                </option>
                <option v-for="item in especialidades" :value="item.id">
                    {{ item.descricao }}
                </option>
            </select>
        </div>

        <!-- NUM PARCELAS -->
        <div class="p-2 mt-3">
            <label>{{ $t("parcels") }}</label>
            <input
                class="form-input text-center"
                type="number"
                min="0"
                v-model="parcelas" />
        </div>
        <!-- NUM PARCELAS -->

        <!-- DATA -->
        <div class="p-2 mt-3">
            <label>{{ $t("date") }}</label>
            <select class="form-select text-center" v-model="selectedDate">
                <option disabled selected value="-1">
                    {{ $t("select-date") }}
                </option>
                <option v-for="(item, index) in horarios" :value="index">
                    {{ dataParaPadrao(item.data) }}
                </option>
            </select>
        </div>
        <!-- DATA -->

        <!-- HORA -->
        <div class="p-2 mt-3" v-if="selectedDate != -1">
            <label>{{ $t("time") }}</label>
            <select class="form-select text-center" v-model="selectedTime">
                <option disabled selected value="-1">
                    {{ $t("select-hour") }}
                </option>
                <option
                    v-for="(item, index) in horarios[selectedDate].horarios"
                    :value="index">
                    {{ item.hora }}
                </option>
            </select>
        </div>
        <!-- HORA -->

        <div class="p-3 mt-3">
            <button
                @click="marcarConsultaDireta"
                class="w-full md:w-1/4 btn btn-primary mx-auto">
                {{ $t("mark") }}
            </button>
        </div>
    </div>
</template>
