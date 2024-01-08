<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    props: ["verificacaoFinalizacao"],
    data() {
        return {
            store: useAppStore(),
            perguntasInvestidor: {},
            investidorFormQuestion: {},
            loading: false,
        };
    },
    async created() {
        this.perguntasInvestidor = await this.store.request.pegarDadosApi(
            "/perguntas-investidor",
        );
    },
    methods: {
        async enviarRespostas() {
            if (
                !this.verificacaoFinalizacao.some(
                    (obj) => obj.Create === "finalizado",
                )
            ) {
                this.$emit("prevTab");
                return Response.mensagemErro(
                    this.$t("please-complete-previous-step-proceed"),
                );
            }

            try {
                // Verificar se todas as perguntas foram respondidas
                for (let pergunta of this.perguntasInvestidor.list) {
                    if (
                        !this.investidorFormQuestion.hasOwnProperty(pergunta.id)
                    ) {
                        return Response.mensagemErro(
                            this.$t("Please-fill-in-all-questions"),
                        );
                    }
                }

                const formattedData = Object.entries(
                    this.investidorFormQuestion,
                ).map(([pergunta, resposta]) => ({
                    pergunta: parseInt(pergunta),
                    resposta,
                }));

                let data = {
                    respostas: JSON.stringify(formattedData),
                };

                await this.store.request
                    .enviarDadosApi("/perguntas-investidor-usuario", data)
                    .then((res) => {
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
                            this.finalize();
                            // Avan�a para a pr�xima etapa do form-wizard
                            this.$emit("nextTab");
                        }
                    });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },
        finalize() {
            // Finalizar o componente
            this.$emit("finalize", "Questions");
        },
    },
};
</script>

<template>
    <div class="p-6 panel h-full w-full md:w-1/2">
        <div v-if="loading">{{ $t("loading") }}...</div>
        <div
            v-for="(pergunta, index) in perguntasInvestidor.list"
            :key="index"
            class="mb-4 card">
            <h2 class="text-xl font-bold mb-3">
                {{ pergunta.descricao }}
            </h2>
            <div
                v-for="(resposta, i) in pergunta.respostas"
                :key="i"
                class="flex items-center mb-2">
                <input
                    type="radio"
                    :value="resposta.id"
                    v-model="investidorFormQuestion[pergunta.id]"
                    class="mr-2 form-radio text-success" />
                <label>{{ resposta.descricao }}</label>
            </div>
        </div>
        <button
            @click="enviarRespostas"
            class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:ring-green-500">
            {{ $t("send-responses") }}
        </button>
    </div>
</template>
