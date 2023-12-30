<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            store: useAppStore(),
            nome: "",
            descricao: "",
            submitBtnDisabled: false,
        };
    },

    methods: {
        async cadastrarProduto() {
            if (!this.nome || !this.descricao) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

            try {
                let data = {
                    nome: this.nome,
                    descricao: this.descricao,
                };

                console.log(data);

                await this.store.request
                    .enviarDadosApi("/invest/produto", data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == false) {
                            this.submitBtnDisabled = false;
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            this.submitBtnDisabled = false;
                            Response.mensagemSucesso(this.$t(res.messageCode));
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
    <div class="h-full flex flex-col items-center dark:text-white capitalize">
        <div class="flex flex-row gap-1 w-full">
            <div class="w-80">
                <label for="nome">{{ $t("name") }}</label>
                <input
                    v-model="nome"
                    class="form-input dark:text-white w-full"
                    type="text"
                    placeholder="Insira o nome do produto" />
            </div>
            <div class="w-80">
                <label for="descricao">{{ $t("description") }}</label>
                <input
                    v-model="descricao"
                    class="form-input dark:text-white w-full"
                    type="text"
                    placeholder="Insira a descrção do produto" />
            </div>
        </div>

        <div class="flex flex-col items-center font-semibold mt-6 w-80">
            <button
                @click="cadastrarProduto()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-full">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>
