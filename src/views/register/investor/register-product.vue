<script>
import Response from "@/api/Response";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import moment from "moment";
import { useAppStore } from "@/stores/index";

export default {
    components: {
        Vue3Datatable,
    },
    data() {
        return {
            store: useAppStore(),
            nome: "",
            descricao: "",
            mostrarItens: false,
            submitBtnDisabled: false,
            produtoResponse: "",
            cols: [
                {
                    field: "id",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: "ID",
                    width: "90px",
                    filter: false,
                    sortable: true,
                },
                {
                    field: "name",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name"),
                    sortable: true,
                },
                {
                    field: "description",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("description"),
                    sortable: true,
                },
                {
                    field: "created-at",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("created-at"),
                    sortable: true,
                },
                {
                    field: "action",
                    headerClass:
                        "flex flex-row text-center gap-1 font-extrabold uppercase",
                    title: this.$t("action"),
                    type: "button",
                    sortable: true,
                },
            ],
        };
    },

    async created() {
        this.mostrarProdutos();
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

                await this.store.request
                    .enviarDadosApi("/invest/produto", data)
                    .then((res) => {
                        if (res.status == false) {
                            this.submitBtnDisabled = false;
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            this.submitBtnDisabled = false;
                            this.mostrarItens = false;
                            this.mostrarProdutos();
                            Response.mensagemSucesso(this.$t(res.messageCode));
                        }
                    });
            } catch (error) {
                this.submitBtnDisabled = false;
                console.error("Ocorreu um erro:", error);
            }
        },

        async mostrarProdutos() {
            try {
                this.produtoResponse =
                    await this.store.request.pegarDadosApi("/invest/produto");

                if (this.produtoResponse.status == true) {
                    this.mostrarItens = true;
                    this.produtos = this.produtoResponse.list;
                } else {
                    Response.mensagemErro(
                        this.$t(this.produtoResponse.messageCode),
                    );
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },

        async desativar(id) {
            try {
                await this.store.request
                    .enviarDadosApi(`/invest/produto/${id}`)
                    .then((res) => {
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
                        }
                    });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },

        formatarDataHora(data) {
            return moment(data).format("DD/MM/YYYY HH:mm:ss");
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
                    placeholder="Insira a descrição do produto" />
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

    <div v-if="mostrarItens" class="w-full p-8">
        <vue3-datatable
            class="shadow-md rounded p-4 alt-pagination mb-5 dark:text-white hover:shadow-none"
            :columns="cols"
            :rows="produtos"
            skin="bh-table-stripped"
            :paginationInfo="`${$t('total-data')} ${produtos.length}, ${$t(
                'per-page',
            )}`"
            :sortable="true">
            <template #id="data">
                <span class="uppercase">{{ data.value.id }}</span>
            </template>
            <template #name="data">
                <span class="uppercase">{{ data.value.nome }}</span>
            </template>
            <template #description="data">
                <span class="uppercase">{{ data.value.descricao }}</span>
            </template>
            <template #created-at="data">
                <span class="uppercase">{{
                    formatarDataHora(data.value.created_at)
                }}</span>
            </template>
            <template #action="data">
                <div class="flex space-x-4">
                    <button
                        class="btn btn-sm btn-danger uppercase mb-2"
                        @click="desativar(data.value.id)">
                        {{ $t("disable") }}
                    </button>
                </div>
            </template>
        </vue3-datatable>
    </div>
</template>
