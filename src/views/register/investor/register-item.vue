<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            store: useAppStore(),
            categorias: "",
            periodo: 0,
            valor: "",
            categoriaId: 0,
            submitBtnDisabled: false,
        };
    },

    async created() {
        const categoriaResponse =
            await this.store.request.pegarDadosApi("/invest/categoria");

        if (categoriaResponse.status == true) {
            this.categorias = categoriaResponse.list;
        } else {
            Response.mensagemErro(this.$t(categoriaResponse.messageCode));
        }
    },
    methods: {
        async cadastrarCategoria() {
            if (!this.categoriaId || !this.periodo || !this.valor) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

            try {
                let data = {
                    categoria_id: this.categoriaId,
                    periodo: this.periodo,
                    valor: this.valor,
                };

                await this.store.request
                    .enviarDadosApi("/invest/item", data)
                    .then((res) => {
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
                <label for="categoria">{{ $t("category") }}</label>
                <select
                    v-model="categoriaId"
                    class="form-select capitalize dark:text-white w-full">
                    <option value="0" disabled selected>
                        {{ $t("select") }} {{ $t("category") }}
                    </option>
                    <option
                        v-for="categoria in categorias"
                        :value="categoria.id">
                        {{ categoria.nome }}
                    </option>
                </select>
            </div>
            <div class="w-80">
                <label for="periodo">{{ $t("period") }}</label>
                <input
                    v-model="periodo"
                    class="form-input dark:text-white w-full"
                    type="number"
                    placeholder="Insira o período" />
            </div>
            <div class="w-80">
                <label for="valor">{{ $t("value") }}</label>
                <input
                    v-model="valor"
                    class="form-input dark:text-white w-full"
                    type="text"
                    placeholder="0,00" />
            </div>
        </div>

        <div class="flex flex-col items-center font-semibold mt-6 w-80">
            <button
                @click="cadastrarCategoria()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-full">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>
