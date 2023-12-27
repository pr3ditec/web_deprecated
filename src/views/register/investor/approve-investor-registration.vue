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
            cols: [
                {
                    field: "id",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: "ID",
                    width: "90px",
                    filter: false,
                },
                {
                    field: "name",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name"),
                },
                {
                    field: "cpf",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: "CPF",
                },
                {
                    field: "nascimento",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("birthdate"),
                },
                {
                    field: "email",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: "Email",
                },
                {
                    field: "action",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("action"),
                    type: "button",
                },
            ],
        };
    },
    async created() {
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
    methods: {
        async visualizar(id) {
            const response = await this.store.request.pegarDadosApi(
                `/perguntas-investidor-usuario/${id}`,
            );
            console.log(response);
        },

        async aprovar(id) {
            try {
                const data = {
                    usuario_id: id,
                };
                await this.store.request
                    .enviarDadosApi("/usuario-investidor-aprovar", data)
                    .then((res) => {
                        console.log(res);
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

        async recusar(id) {
            try {
                const data = {
                    usuario_id: id,
                };
                await this.store.request
                    .enviarDadosApi("/usuario-investidor-recusar", data)
                    .then((res) => {
                        console.log(res);
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

        formatDate(dateString) {
            if (dateString) {
                return dateString.split("-").reverse().join("/");
            }
        },
    },
};
</script>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-5">
                <vue3-datatable
                    class="w-full shadow-md rounded p-2 alt-pagination mb-4 dark:text-white"
                    :columns="cols"
                    :rows="users"
                    skin="bh-table-stripped"
                    :paginationInfo="`${$t('total-data')} ${users.length}, ${$t(
                        'per-page',
                    )}`"
                    :sortable="true">
                    <template #id="data">
                        <span class="uppercase">{{ data.value.id }}</span>
                    </template>
                    <template #name="data">
                        <span class="uppercase">{{ data.value.nome }}</span>
                    </template>
                    <template #cpf="data">
                        <span class="uppercase">{{ data.value.cpf }}</span>
                    </template>
                    <template #nascimento="data">
                        <span class="uppercase">{{
                            formatDate(data.value.nascimento)
                        }}</span>
                    </template>
                    <template #email="data">
                        <span class="uppercase">{{ data.value.email }}</span>
                    </template>
                    <template #action="data">
                        <div class="flex space-x-4">
                            <button
                                class="btn btn-sm btn-primary uppercase mb-2"
                                @click="visualizar(data.value.id)">
                                Visualizar
                            </button>
                            <button
                                class="btn btn-sm btn-success uppercase mb-2"
                                @click="aprovar(data.value.id)">
                                Aprovar
                            </button>
                            <button
                                class="btn btn-sm btn-danger uppercase mb-2"
                                @click="recusar(data.value.id)">
                                Recusar
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>

<style>
.vue3-datatable:hover {
    background-color: inherit !important;
    transition: none !important;
}

.vue3-datatable {
    width: 100%;
}
</style>
