<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    props: ["userId"],
    data() {
        return {
            store: useAppStore(),
            tipoTelefone: [],
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
            if (!this.telefone || !this.selectedTipoTelefoneId) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

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
        class="p-6 panel h-full flex flex-col items-center gap-5 mt-4 w-full md:w-1/2 dark:text-white capitalize">
        <div class="flex flex-row gap-1 w-full"></div>
        <div class="w-full md:w-1/2">
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
        <div class="w-full md:w-1/2">
            <label for="telefone">{{ $t("telephone") }}</label>
            <input
                v-model="telefone"
                class="form-input dark:text-white"
                type="text"
                placeholder="Ex.: (11) 99999-9999" />
        </div>

        <div class="flex flex-col items-center font-semibold mt-6 w-full">
            <button
                @click="cadastrarTelefone()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-full md:w-1/2 text-shadow">
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
