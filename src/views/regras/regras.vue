<script lang="ts">
import MascarasInput from "@/helpers/MascaraInput";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import ApiConnection from "@/api/Api";
import axios from "axios";
import FormatoData from "@/helpers/FormatoData";
import Response from "@/api/Response";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
    },
    data() {
        return {
            request: new ApiConnection(),
            unlock: true,
            search: "",
            cols: [
                {
                    field: "regra",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("rules"),
                },
                {
                    field: "atualizado",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("last_update"),
                },
                {
                    field: "status",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("status"),
                },
                {
                    field: "valor",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("value"),
                },
                {
                    field: "botao",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("update"),
                },
            ],
            dadosTabela: [
                {
                    index: 0,
                    regra: "numero máximo de parcelas",
                    lock: true,
                    tipoValor: "Qtde.",
                    get: {
                        id: "0",
                        atualizado: "00/00/0000",
                        valor: "",
                    },
                    post: {
                        rota: "/maximo-parcelamento",
                        campo: "maximo_parcelamento",
                    },
                },
                {
                    index: 1,
                    regra: "valor de desconto do médico",
                    lock: true,
                    tipoValor: "%",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "0",
                    },
                    post: {
                        rota: "/desconto/medico",
                        campo: "desconto",
                    },
                },
                {
                    index: 2,
                    regra: "tempo de resposta da secretaria",
                    lock: true,
                    tipoValor: "Dias",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "",
                    },
                    post: {
                        rota: "/admin/secretaria/agendamento",
                        campo: "valor",
                    },
                },
                {
                    index: 3,
                    regra: "risco empresarial",
                    lock: true,
                    tipoValor: "%",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "",
                    },
                    post: {
                        rota: "/risco-empresarial",
                        campo: "valor",
                    },
                },
                {
                    index: 4,
                    regra: "tempo de agendamento token",
                    lock: true,
                    tipoValor: "Minutos",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "",
                    },
                    post: {
                        rota: "/limite-confirmacao-agendamento",
                        campo: "tempo",
                    },
                },
            ],
        };
    },
    methods: {
        addItems(index: number, data: any) {
            if (data.length == 0) {
                return;
            } else {
                this.dadosTabela[index].get = {
                    id: data.id,
                    valor: data[this.dadosTabela[index].post.campo],
                    atualizado: `${FormatoData.formatarParaPadraoBrasil(
                        FormatoData.formatarParaApi(data.updated_at)["data"],
                    )}`,
                };
            }
        },

        buscarTodasRegras() {
            this.dadosTabela.forEach(async (regra) => {
                await this.request
                    .pegarDadosApi(regra.post.rota)
                    .then((res) => {
                        this.addItems(regra.index, res.list);
                    });
            });
        },

        async atualizarRegra(index: number) {
            if (this.dadosTabela[index].lock) {
                this.dadosTabela[index].lock = false;
            } else {
                await this.request
                    .enviarDadosApi(
                        `${this.dadosTabela[index].post.rota}${this.dadosTabela[index].get.id}`,
                        {
                            [this.dadosTabela[index].post.campo]:
                                this.dadosTabela[index].get.valor,
                        },
                    )
                    .then((res) => {
                        console.log(res.list);
                        if (res.list.status) {
                            Response.mensagemToast(
                                "success",
                                "Configuração atualizada",
                            );
                        } else {
                            Response.mensagemToast(
                                "error",
                                "Não foi possível alterar configuração",
                            );
                        }
                    })
                    .finally(() => (this.dadosTabela[index].lock = true));
            }
        },
    },

    async created() {
        this.buscarTodasRegras();
    },
};
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1 class="text-4xl font-bold mb-4 capitalize">
                    {{ $t("rules") }}
                </h1>
            </div>
        </div>
        <div class="row mb-4 mt-5 w-1/2 mx-auto">
            <input
                class="form-input"
                type="text"
                placeholder="Pesquise...."
                v-model="search" />
        </div>
        <div class="row">
            <div class="col-12 p-5">
                <vue3-datatable
                    class="w-full shadow-md rounded p-2 alt-pagination whitespace-wrap"
                    :rows="dadosTabela"
                    :columns="cols"
                    :totalRows="dadosTabela?.length"
                    :sortable="true"
                    :search="search">
                    <template #regra="data">
                        <span class="text-md font-semibold uppercase">{{
                            data.value.regra
                        }}</span>
                    </template>
                    <template #atualizado="data">
                        <span>{{ data.value.get.atualizado }}</span>
                    </template>
                    <template #status="data">
                        <span
                            v-if="data.value.get.valor"
                            class="badge whitespace-nowrap bg-success"
                            >ATIVO</span
                        >
                        <span v-else class="badge whitespace-nowrap bg-warning"
                            >NÂO ENCONTRADO</span
                        >
                    </template>
                    <template #valor="data">
                        <div class="flex flex-row">
                            <div class="flex w-full p-3">
                                <input
                                    class="form-input form-input-sm ltr:rounded-r-none rtl:rounded-l-none"
                                    :class="{
                                        'border-danger': !data.value.lock,
                                    }"
                                    type="text"
                                    v-model="data.value.get.valor"
                                    :disabled="data.value.lock" />
                                <div
                                    :class="{
                                        'bg-danger text-white':
                                            !data.value.lock,
                                    }"
                                    class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                    <span>{{ data.value.tipoValor }}</span>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #botao="data">
                        <button
                            class="btn btn-sm btn-primary uppercase"
                            :class="{ 'btn-danger': !data.value.lock }"
                            @click="atualizarRegra(data.value.index)">
                            {{ !data.value.lock ? $t("update") : $t("unlock") }}
                        </button>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </div>
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
}
</style>

<!-- /medico/desconto cadastro -->
