<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            store: useAppStore(),
            categoria: "",
            submitBtnDisabled: false,
        };
    },

    methods: {
        async cadastrarCategoria() {
            if (!this.nome) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

            try {
                let data = {
                    nome: this.categoria,
                };

                await this.store.request
                    .enviarDadosApi("/invest/categoria", data)
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
        class="h-full flex flex-col items-center w-1/2 dark:text-white capitalize">
        <div class="flex flex-row gap-1 w-full"></div>
        <div class="w-80">
            <label for="categoria">{{ $t("category") }}</label>
            <input
                v-model="categoria"
                class="form-input dark:text-white"
                type="text"
                placeholder="Insira o nome da categoria" />
        </div>

        <div class="w-80 items-center font-semibold mt-6">
            <button
                @click="cadastrarCategoria()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-full">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>
