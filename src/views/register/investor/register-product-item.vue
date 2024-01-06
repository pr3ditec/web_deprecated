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
            mostrarItens: false,
        };
    },
    async created() {
        const produtoResponse =
            await this.store.request.pegarDadosApi("/invest/produto");

        if (produtoResponse.status == true) {
            this.produtos = produtoResponse.list;
        } else {
            Response.mensagemErro(this.$t(produtoResponse.messageCode));
        }
        const ItemResponse =
            await this.store.request.pegarDadosApi("/invest/item");

        if (ItemResponse.status == true) {
            this.itens = ItemResponse.list;
        } else {
            Response.mensagemErro(this.$t(ItemResponse.messageCode));
        }
    },
    watch: {
        async produtoId(newProdutoId) {
            this.mostrarItens = false;

            const responseVinculados = await this.store.request.pegarDadosApi(
                `/invest/produto-item/${newProdutoId}`,
            );

            if (responseVinculados.status == true) {
                this.itensVinculados = responseVinculados.list;
            } else {
                this.itensVinculados = [];
            }

            const responseNaoVinculados =
                await this.store.request.pegarDadosApi("/invest/item");

            if (responseNaoVinculados.status == true) {
                this.itensNaoVinculados = responseNaoVinculados.list;
            } else {
                this.itensNaoVinculados = [];
            }

            this.itensNaoVinculados = this.itensNaoVinculados.filter(
                (itemNaoVinculado) =>
                    !this.itensVinculados.some(
                        (itemVinculado) =>
                            itemVinculado.id === itemNaoVinculado.id,
                    ),
            );

            this.mostrarItens = true;
        },
    },
    methods: {
        async cadastrarProdutoItem() {
            if (!this.produtoId || !this.itensVinculados) {
                return Response.mensagemErro(
                    this.$t("please-fill-in-all-fields"),
                );
            }

            this.submitBtnDisabled = true;

            try {
                let itensIds = this.itensVinculados.map((item) => item.id);

                let data = {
                    produto_id: this.produtoId,
                    itens: itensIds,
                };

                await this.store.request
                    .enviarDadosApi("/invest/produto-item", data)
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

        atualizarItensProduto(moved) {
            if (
                moved.from === this.itensNaoVinculados &&
                moved.to === this.itensVinculados
            ) {
                // item arrastado de itensNaoVinculados para itensVinculados
                this.itensNaoVinculados = this.itensNaoVinculados.filter(
                    (item) => item.id !== moved.element.id,
                );
                this.itensVinculados.push(moved.element);
            } else if (
                moved.from === this.itensVinculados &&
                moved.to === this.itensNaoVinculados
            ) {
                // item arrastado de itensVinculados para itensNaoVinculados
                this.itensVinculados = this.itensVinculados.filter(
                    (item) => item.id !== moved.element.id,
                );
                this.itensNaoVinculados.push(moved.element);
            }
        },

        formatValor(valor) {
            valor = Number(valor);
            return valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        },
    },
};
</script>

<template>
    <div
        class="h-full flex flex-col items-center text-black dark:text-white bg-white dark:bg-transparent capitalize">
        <div class="flex flex-row gap-1 w-full justify-center">
            <div class="w-8/12">
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

        <div v-if="mostrarItens" class="flex m-12">
            <div
                class="border-4 border-gray-400 p-4 rounded-md dark:text-white">
                <h2 class="text-center font-bold mb-2">
                    {{ $t("items-available-for-bonding") }}
                </h2>
                <VueDraggableNext
                    class="dragArea list-group w-half dark:text-white dark:bg-transparent w-80 min-h-[200px]"
                    :list="itensNaoVinculados"
                    group="items"
                    @change="atualizarItensProduto($event)">
                    <div
                        class="list-group-item bg-white dark:bg-transparent m-1 p-3 rounded-md shadow-lg flex items-center justify-between dark:text-white dark:border-4 dark:border-gray-400"
                        v-for="item in itensNaoVinculados"
                        :key="item.id">
                        <div class="flex items-center">
                            <div>
                                <p>
                                    {{ $t("category") }}: {{ item.categoria }}
                                </p>
                                <p>{{ $t("period") }}: {{ item.periodo }}</p>
                            </div>
                        </div>

                        <div>
                            {{ $t("value") }}: {{ formatValor(item.valor) }}
                        </div>
                    </div>
                </VueDraggableNext>
            </div>

            <div class="border-4 border-gray-400 p-4 rounded-md dragArea">
                <h2 class="text-center font-bold mb-2">
                    {{ $t("linked-items") }}
                </h2>
                <VueDraggableNext
                    class="dragArea list-group w-half dark:text-white dark:bg-transparent w-80 min-h-[200px]"
                    :list="itensVinculados"
                    group="items"
                    @change="atualizarItensProduto($event)">
                    <div
                        class="list-group-item bg-white dark:bg-transparent m-1 p-3 rounded-md shadow-lg flex items-center justify-between dark:text-white dark:border-4 dark:border-gray-400"
                        v-for="item in itensVinculados"
                        :key="item.id">
                        <div class="flex items-center">
                            <div>
                                <p>
                                    {{ $t("category") }}: {{ item.categoria }}
                                </p>
                                <p>{{ $t("period") }}: {{ item.periodo }}</p>
                            </div>
                        </div>

                        <div>
                            {{ $t("value") }}: {{ formatValor(item.valor) }}
                        </div>
                    </div>
                </VueDraggableNext>
            </div>
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
