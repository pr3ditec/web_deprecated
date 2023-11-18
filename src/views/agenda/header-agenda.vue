<script lang="ts">

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            store: useAppStore(),
            agendarPaciente: true,
            dataInicial: "2023-10-10 9:00",
            configData: {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                // position: this.store.rtlClass === "rtl" ? "auto right" : "auto left",
            },
        };
    },
    methods: {
        emitCadastrarEvento() {
            this.$emit("cadastrarEvento");
        },
    },
    components: { flatPickr },
};
</script>
<template>
    <div class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center overflow-y-clip">
        <!-- LEGENDAS -->
        <TransitionGroup name="list" tag="div">
            <div v-if="agendarPaciente" class="sm:mb-0 mb-4">
                <div class="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                    <div class="flex items-center ltr:mr-4 rtl:ml-4">
                        <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                        <div>MARCADO</div>
                    </div>
                    <div class="flex items-center ltr:mr-4 rtl:ml-4">
                        <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"></div>
                        <div>ATRASADO</div>
                    </div>
                    <div class="flex items-center ltr:mr-4 rtl:ml-4">
                        <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"></div>
                        <div>ATENDIDO</div>
                    </div>
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                        <div>CANCELADO</div>
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-row justify-content-center align-items-center gap-4 w-full">
                <div class="flex flex-col">
                    <label class="capitalize mb-0">Nome</label>
                    <input type="text" class="form-input" placeholder="Ex.: Fernando Miguel" />
                </div>
                <div class="flex flex-col">
                    <label class="capitalize mb-0">descricao</label>
                    <input type="text" class="form-input" placeholder="Ex.: Clinica geral" />
                </div>
                <div class="flex flex-col">
                    <label class="capitalize mb-0">data</label>
                    <flat-pickr v-model="dataInicial" class="form-input" :config="configData"></flat-pickr>
                </div>
                <button class="btn btn-success h-1/2 self-end capitalize">Confirmar</button>
            </div>
        </TransitionGroup>
        <!-- LEGENDAS -->

        <!-- BOTAO DE CADASTRO -->
        <button type="button" class="btn btn-primary uppercase" @click="agendarPaciente = !agendarPaciente">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5 ltr:mr-2 rtl:ml-2"
            >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            {{ agendarPaciente ? "agendar paciente" : "ver legendas" }}
        </button>
        <!-- BOTAO DE CADASTRO -->
    </div>
</template>
