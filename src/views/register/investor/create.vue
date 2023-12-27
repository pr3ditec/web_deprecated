<script>
import Validacao from "@/helpers/ValidacaoInput";
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    props: ["userId"],
    data() {
        return {
            store: useAppStore(),
            tipoTelefone: [],
            ocupacao: "",
            telefone: "",
            selectedTipoTelefoneId: "",
            submitBtnDisabled: false,
        };
    },

    async created() {
        let tipoTelefoneResponse =
            await this.store.request.pegarDadosApi("/telefone/tipo");
        if (tipoTelefoneResponse) {
            this.tipoTelefone = tipoTelefoneResponse.list;
        }
    },

    methods: {
        finalize() {
            this.$emit("finalize", "Create");
        },

        async cadastrarTelefone() {
            if (
                !this.telefone ||
                !this.selectedTipoTelefoneId ||
                !this.ocupacao
            ) {
                return Response.mensagemErro(
                    "Por favor, preencha todos os campos.",
                );
            }

            try {
                let data = {
                    telefone: this.telefone,
                    tipo: this.selectedTipoTelefoneId,
                };

                await this.store.request
                    .enviarDadosApi("/usuario-telefone", data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            this.cadastrarOcupacao();
                        }
                    });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },

        async cadastrarOcupacao() {
            try {
                let data = {
                    usuario_id: localStorage.getItem("user.id"),
                    ocupacao: JSON.stringify(this.ocupacao),
                };

                this.submitBtnDisabled = true;

                await this.store.request
                    .enviarDadosApi("/celcoin/pessoa-cadastrar", data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == false) {
                            this.submitBtnDisabled = false;
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
                            this.$emit(
                                "updateUserId",
                                localStorage.getItem("user.id"),
                            );
                            this.finalize();
                            this.$emit("nextTab");
                        }
                    });
            } catch (error) {
                this.submitBtnDisabled = false;
                console.error("Ocorreu um erro:", error);
            }
        },
    },
};
</script>

<template>
    <div
        class="p-6 panel h-full flex flex-col items-center gap-5 mt-4 w-1/2 dark:text-white capitalize">
        <div class="flex flex-row gap-1 w-full"></div>
        <div class="w-1/2">
            <label for="tipo-telefone">{{ $t("telephone-type") }}</label>
            <select
                v-model="selectedTipoTelefoneId"
                class="form-select dark:text-white capitalize">
                <option value="" disabled selected>
                    {{ $t("select") }} {{ $t("telephone-type") }}
                </option>
                <option v-for="tipo in tipoTelefone" :value="tipo.id">
                    {{ tipo.descricao }}
                </option>
            </select>
        </div>
        <div class="w-1/2">
            <label for="telefone">Telefone</label>
            <input
                v-model="telefone"
                class="form-input dark:text-white"
                type="text"
                placeholder="Ex.: (11) 99999-9999" />
        </div>
        <div class="w-1/2">
            <label for="ocupacao">Ocupação</label>
            <input
                v-model="ocupacao"
                class="form-input dark:text-white"
                type="text"
                placeholder="Ex.: Empresário" />
        </div>

        <div class="flex flex-col items-center font-semibold mt-6">
            <button
                @click="cadastrarTelefone()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-80 text-shadow">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    box-shadow: none;
}
</style>
