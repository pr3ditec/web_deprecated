<script lang="ts">
import ApiConnection from "../../api/Api";

export default {
    props: {
        medico: Number,
    },
    data() {
        return {
            request: new ApiConnection(),
            idAuxiliar: [],
            defaultLoading: "Carregando",
            solicitacaoAgenda: [],
            paginas: {
                inicio: 0,
                fim: 5,
            },
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
                if (item.id == id) {
                    response.item = item;
                    response.index = index;
                }
            });
            return response;
        },

        inserirDadosSolicitacao(id: any, key: string, value: never) {
            this.idAuxiliar.push(id);
            let data = this.pegarDadosSolicitacao(id);
            if (key == "horarios") {
                this.solicitacaoAgenda[data.index][key].push(value);
            } else {
                this.solicitacaoAgenda[data.index][key] = value;
            }
        },

        removerDadosSolicitacao(id: number, remover: any) {
            let data = this.pegarDadosSolicitacao(id);
            this.solicitacaoAgenda[data.index]["horarios"].forEach(
                (horario, index) => {
                    if (
                        horario.data == remover.data &&
                        horario.hora == remover.hora
                    ) {
                        this.solicitacaoAgenda[data.index]["horarios"].splice(
                            index,
                            1,
                        );
                    }
                },
            );
        },

        removerSolicitacao(solicitacaoIndex: number) {
            this.solicitacaoAgenda.splice(solicitacaoIndex, 1);
        },

        // funcao auxiliar
        testeInclusao(id: any): boolean {
            if (this.idAuxiliar.includes(id.toString())) {
                return true;
            } else {
                return false;
            }
        },
        trocarPagina(direcao: number) {
            if (direcao == 0 && this.paginas.inicio != 0) {
                console.log(this.paginas);
                this.paginas.fim = this.paginas.inicio;
                this.paginas.inicio = this.paginas.fim - 5;
            } else if (
                direcao == 1 &&
                this.paginas.fim < this.solicitacaoAgenda.length
            ) {
                console.log(this.paginas);

                this.paginas.inicio = this.paginas.fim;
                this.paginas.fim = this.paginas.inicio + 5;
            }
        },
    },
    computed: {
        paginacao() {
            return this.solicitacaoAgenda.slice(
                this.paginas.inicio,
                this.paginas.fim,
            );
        },
    },
    async created() {
        await this.request
            .pegarDadosApi(`/pre-agendamento/medico/${this.medico}`)
            .then((response: any) => {
                if (response.status) {
                    let data = response.list;
                    data.forEach((res: any, index: number) => {
                        if (res.status_id != -1) {
                            return;
                        } else {
                            res["horarios"] = [];
                            this.solicitacaoAgenda.push(res);
                        }
                    });
                    this.defaultLoading = "Nenhuma solicitação";
                } else {
                    return alert("falha na api");
                }
            });
    },
};
</script>
<template>
    <div class="flex flex-row items-center justify-between mt-3">
        <span
            class="cursor-pointer btn btn-sm btn-outline-dark"
            @click="trocarPagina(0)"
            >&#8592;</span
        >
        <h6 class="uppercase font-bold font-xl">solicitações</h6>
        <h6
            class="cursor-pointer btn btn-sm btn-outline-dark"
            @click="trocarPagina(1)">
            &rarr;
        </h6>
    </div>
    <div v-if="solicitacaoAgenda.length == 0">{{ defaultLoading }}</div>
    <div v-else>
        <TransitionGroup name="list" tag="div">
            <div
                :id="solicitacao.id.toString()"
                class="d-custom max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none hover:bg-slate-50"
                v-for="solicitacao in paginacao">
                <div class="p-5 flex items-center flex-col sm:flex-row">
                    <div class="mb-3 w-20 h-20 rounded-full overflow-hidden">
                        <img
                            src="/assets/images/logo.png"
                            alt=""
                            height="16"
                            class="w-full h-full object-cover" />
                    </div>
                    <div
                        class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                        <h5
                            class="text-[#3b3f5c] text-[15px] font-semibold mb-1 dark:text-white-light">
                            {{ solicitacao.paciente_nome }} {{ solicitacao.id }}
                        </h5>
                        <p class="mb-1 text-white-dark">
                            {{ solicitacao.especialidade }}
                        </p>
                        <span class="badge bg-dark rounded-full">
                            {{ solicitacao.status }}</span
                        >
                        <p class="font-semibold text-white-dark mt-2 sm:mt-4">
                            Maecenas nec mi vel lacus condimentum.
                        </p>
                    </div>
                </div>
                <div
                    class="flex flex-col mb-4 items-center justify-center"
                    v-show="
                        solicitacao.horarios.length > 0 &&
                        testeInclusao(solicitacao.id)
                    ">
                    <button
                        class="btn btn-sm btn-dark capitalize"
                        @click="emitProporHorario(solicitacao.id)">
                        propor horarios
                    </button>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>
