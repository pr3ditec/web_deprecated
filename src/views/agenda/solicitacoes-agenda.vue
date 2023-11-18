<script lang="ts">
import { remove } from "dom7";
import { inject } from "vue";

export default {
    data() {
        return {
            request: Object(inject("api")),
            solicitacaoAgenda: [
                {
                    paciente_id: 0,
                    paciente_nome: "vazio",
                    horarios: [],
                },
            ],
        };
    },
    methods: {
        emitProporHorario(id: number) {
            this.$emit("proporHorario", id);
        },

        pegarDadosSolicitacao(id: number) {
            var response: any = {
                index: 0,
                item: "",
            };
            this.solicitacaoAgenda.forEach((item: any, index: number) => {
                if (item.paciente_id == id) {
                    response.item = item;
                    response.index = index;
                }
            });
            return response;
        },

        inserirDadosSolicitacao(index: number, key: string, value: never) {
            if (key == "horarios") {
                this.solicitacaoAgenda[index][key].push(value);
            } else {
                this.solicitacaoAgenda[index][key] = value;
            }
        },

        removerDadosSolicitacao(itemIndex: number, remover: any) {
            this.solicitacaoAgenda[itemIndex]["horarios"].forEach((horario, index) => {
                if (horario == remover) {
                    this.solicitacaoAgenda[itemIndex]["horarios"].splice(index, 1);
                }
            });
        },

        removerSolicitacao(solicitacaoIndex: number) {
            this.solicitacaoAgenda.splice(solicitacaoIndex, 1);
        },
    },
    async created() {
        await this.request.pegarDadosApi("/pre_agendamento/medico/1").then((response: any) => {
            this.solicitacaoAgenda = response;
            this.solicitacaoAgenda.forEach((item) => {
                item["horarios"] = [];
            });
        });
    },

    mounted() {},
};
</script>
<template>
    <h6 class="uppercase font-bold font-xl mt-3">solicitações</h6>
    <TransitionGroup name="list" tag="div">
        <div
            :id="solicitacao.paciente_id.toString()"
            class="d-custom max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none hover:bg-slate-50"
            v-for="solicitacao in solicitacaoAgenda"
        >
            <div class="p-5 flex items-center flex-col sm:flex-row">
                <div class="mb-3 w-20 h-20 rounded-full overflow-hidden">
                    <img src="/assets/images/logo.png" alt="" height="24" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                    <h5 class="text-[#3b3f5c] text-[15px] font-semibold mb-1 dark:text-white-light">
                        {{ solicitacao.paciente_nome }}
                    </h5>
                    <p class="mb-1 text-white-dark">tset</p>
                    <span class="badge bg-dark rounded-full">Tipo</span>
                    <p class="font-semibold text-white-dark mt-2 sm:mt-4">Maecenas nec mi vel lacus condimentum.</p>
                </div>
            </div>
            <div class="flex flex-col mb-4 items-center justify-center" v-show="solicitacao.horarios.length > 0">
                <button class="btn btn-sm btn-dark capitalize" @click="emitProporHorario(solicitacao.paciente_id)">
                    propor horarios
                </button>
            </div>
        </div>
    </TransitionGroup>
</template>
