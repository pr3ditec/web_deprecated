<script>
import Response from "@/api/Response";
import { VueDraggableNext } from "vue-draggable-next";
import { useAppStore } from "@/stores/index";

export default {
    components: {
        VueDraggableNext,
    },
    data() {
        return {
            store: useAppStore(),
            produtos: "",
            itens: [],
            itensIds: [],
            produtoId: 0,
            itensVinculados: [],
            itensNaoVinculados: [],
            submitBtnDisabled: false,
        };
    },
    async created() {
        const produtoResponse =
            await this.store.request.pegarDadosApi("/invest/produto");
        console.log(produtoResponse);
        if (produtoResponse.status == true) {
            this.produtos = produtoResponse.list;
        } else {
            Response.mensagemErro(this.$t(produtoResponse.messageCode));
        }
        const ItemResponse =
            await this.store.request.pegarDadosApi("/invest/item");
        console.log(ItemResponse);
        if (ItemResponse.status == true) {
            this.itens = ItemResponse.list;
        } else {
            Response.mensagemErro(this.$t(ItemResponse.messageCode));
        }
    },
    watch: {
        async produtoId(newProdutoId) {
            // Carregar itens vinculados
            const responseVinculados = await this.store.request.pegarDadosApi(
                `/invest/produto-item/${newProdutoId}`,
            );
            console.log(responseVinculados);
            if (responseVinculados.status == true) {
                this.itensVinculados = responseVinculados.list;
            } else {
                this.itensVinculados = [];
                Response.mensagemErro(this.$t(responseVinculados.messageCode));
            }

            console.log(this.itensVinculados);

            // Carregar itens não vinculados
            const responseNaoVinculados =
                await this.store.request.pegarDadosApi("/invest/item");
            console.log(responseNaoVinculados);
            if (responseNaoVinculados.status == true) {
                this.itensNaoVinculados = responseNaoVinculados.list;
            } else {
                this.itensNaoVinculados = [];
                Response.mensagemErro(
                    this.$t(responseNaoVinculados.messageCode),
                );
            }

            console.log(this.itensNaoVinculados);
        },
    },
    methods: {
        log(event) {
            console.log(event);
        },
        async cadastrarProdutoItem() {
            if (!this.produto_id || !Array.isArray(this.itensIds)) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

            try {
                let data = {
                    produto_id: this.produtoId,
                    itensIds: this.periodo,
                };

                console.log(data);

                await this.store.request
                    .enviarDadosApi("/invest/produto-item", data)
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
        async atualizarItensProduto() {
            const todosItensIds = [
                ...this.itensVinculados,
                ...this.itensNaoVinculados,
            ].map((item) => item.id);

            console.log(todosItensIds);
            // const response = await this.store.request.enviarDadosApi(
            //     `/invest/produto-item/${this.produtoId}`,
            //     todosItensIds,
            // );
            if (response.status == true) {
                Response.mensagemSucesso(
                    this.$t("product-items-updated-successfully"),
                );
            } else {
                Response.mensagemErro(this.$t(response.messageCode));
            }
        },
    },
};
</script>

<template>
    <div class="h-full flex flex-col items-center dark:text-white capitalize">
        <div class="flex flex-row gap-1 w-full">
            <div class="w-80">
                <div class="text-white-dark">
                    <select
                        v-model="produtoId"
                        class="form-select capitalize dark:text-white w-full">
                        <option value="0" disabled selected>
                            {{ $t("select") }} {{ $t("product") }}
                        </option>
                        <option v-for="produto in produtos" :value="produto.id">
                            {{ produto.nome }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="flex m-10">
            <VueDraggableNext
                class="dragArea list-group w-half"
                :list="itensVinculados"
                @change="atualizarItensProduto">
                <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="item in itensVinculados"
                    :key="item.id">
                    {{ item.categoria }}
                </div>
            </VueDraggableNext>
            <VueDraggableNext
                class="dragArea list-group w-half"
                :list="itensNaoVinculados"
                @change="atualizarItensProduto">
                <div
                    class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                    v-for="item in itensNaoVinculados"
                    :key="item.id">
                    {{ item.categoria }}
                </div>
            </VueDraggableNext>
        </div>
        <div class="flex flex-col items-center font-semibold mt-6 w-80">
            <button
                @click="cadastrarProdutoItem()"
                :disabled="submitBtnDisabled"
                class="btn btn-success w-full">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>
