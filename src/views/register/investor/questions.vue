<script>
// import Validacao from "@/helpers/ValidacaoInput";
// import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
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
            console.log(this.investidorFormQuestion);
            // await this.store.request.enviarDadosApi(
            //     "/perguntas-investidor/salvar",
            //     this.investidorFormQuestion,
            // );
        },
    },
};
</script>

<template>
    <div class="p-6 panel h-full">
        <div v-if="loading">Carregando...</div>
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
        <button @click="enviarRespostas" class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:ring-green-500">
            Enviar Respostas
        </button>
    </div>
</template>
