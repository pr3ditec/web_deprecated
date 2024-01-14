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
            categoria: "",
            submitBtnDisabled: false,
            mostrarItens: false,
            categoriaResponse: "",
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
        this.mostrarCategoria();
    },

    methods: {
        async cadastrarCategoria() {
            if (!this.categoria) {
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
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            this.submitBtnDisabled = false;
                            this.mostrarItens = false;
                            this.mostrarCategoria();
                            Response.mensagemSucesso(this.$t(res.messageCode));
                        }
                    });
            } catch (error) {
                this.submitBtnDisabled = false;
                console.error("Ocorreu um erro:", error);
            }
        },

        async mostrarCategoria() {
            try {
                this.categoriaResponse =
                    await this.store.request.pegarDadosApi("/invest/categoria");

                if (this.categoriaResponse.status == true) {
                    this.mostrarItens = true;
                    this.categorias = this.categoriaResponse.list;
                } else {
                    Response.mensagemErro(
                        this.$t(this.categoriaResponse.messageCode),
                    );
                }
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },

        async desativar(id) {
            try {
                await this.store.request
                    .enviarDadosApi(`/invest/categoria/${id}`)
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

    <div v-if="mostrarItens" class="w-full p-8">
        <vue3-datatable
            class="shadow-md rounded p-4 alt-pagination mb-5 dark:text-white hover:shadow-none"
            :columns="cols"
            :rows="categorias"
            skin="bh-table-stripped"
            :paginationInfo="`${$t('total-data')} ${categorias.length}, ${$t(
                'per-page',
            )}`"
            :sortable="true">
            <template #id="data">
                <span class="uppercase">{{ data.value.id }}</span>
            </template>
            <template #name="data">
                <span class="uppercase">{{ data.value.nome }}</span>
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
