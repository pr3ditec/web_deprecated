<script>
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    components: {
        Vue3Datatable,
    },
    data() {
        return {
            store: useAppStore(),
            users: [],
            produtos: "",
            produtoId: 0,
            mostrarItens: false,
            cols: [
                {
                    field: "id",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: "ID",
                    width: "90px",
                    filter: false,
                },
                {
                    field: "category",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("category"),
                },
                {
                    field: "period",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("period"),
                },
                {
                    field: "value",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("value"),
                },
                {
                    field: "action",
                    headerClass:
                        "flex flex-row text-center gap-1 font-extrabold uppercase",
                    title: this.$t("action"),
                    type: "button",
                },
            ],
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

        const response = await this.store.request.pegarDadosApi(
            "/usuario-investidor",
        );

        if (response.status) {
            if (Array.isArray(response.list)) {
                this.users = response.list;
            } else {
                console.error(
                    "A propriedade 'list' dos dados recebidos não é um array:",
                    response,
                );
            }
        } else {
            console.error(this.$t(response.messageCode));
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

            this.mostrarItens = true;
        },
    },

    methods: {
        // async investir(id) {
        //     try {
        //         const data = {
        //             usuario_id: id,
        //         };

        //         await this.store.request
        //             .enviarDadosApi("/usuario-investidor-aprovar", data)
        //             .then((res) => {
        //                 if (res.status == false) {
        //                     return Response.mensagemErro(
        //                         this.$t(res.messageCode),
        //                     );
        //                 } else {
        //                     Response.mensagemSucesso(this.$t(res.messageCode));
        //                 }
        //             });
        //     } catch (error) {
        //         console.error("Ocorreu um erro:", error);
        //     }
        // },

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
    <div class="flex flex-row gap-1 w-full justify-center mt-10">
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
    <div v-if="mostrarItens" class="container-fluid">
        <div class="row">
            <div class="col-12 p-5">
                <vue3-datatable
                    class="w-full shadow-md rounded p-2 alt-pagination mb-4 dark:text-white hover:shadow-none"
                    :columns="cols"
                    :rows="itensVinculados"
                    skin="bh-table-stripped"
                    :paginationInfo="`${$t('total-data')} ${
                        itensVinculados.length
                    }, ${$t('per-page')}`"
                    :sortable="true">
                    <template #id="data">
                        <span class="uppercase">{{ data.value.id }}</span>
                    </template>
                    <template #category="data">
                        <span class="uppercase">{{
                            data.value.categoria
                        }}</span>
                    </template>
                    <template #period="data">
                        <span class="uppercase">{{ data.value.periodo }}</span>
                    </template>
                    <template #value="data">
                        <span class="uppercase">{{
                            formatValor(data.value.valor)
                        }}</span>
                    </template>
                    <template #action="data">
                        <div class="flex space-x-4">
                            <button
                                class="btn btn-sm btn-success uppercase mb-2"
                                @click="investir(data.value.id)">
                                {{ $t("invest") }}
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
