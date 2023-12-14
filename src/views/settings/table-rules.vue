<script lang="ts">
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import FormatoData from "@/helpers/FormatoData";
import Response from "@/api/Response";
import { useAppStore } from "@/stores";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
    },
    data() {
        return {
            store: useAppStore(),
            loading: true,
            cols: [
                {
                    field: "nome",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name"),
                },
                {
                    field: "atualizado",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("last-update"),
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
            regrasTabela: [
                {
                    index: 0,
                    nome: "numero máximo de parcelas",
                    lock: true,
                    tipoValor: "Qtde.",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "",
                    },
                    post: {
                        rota: "/maximo-parcelamento",
                        campo: "maximo_parcelamento",
                    },
                },
                {
                    index: 1,
                    nome: "valor de desconto do médico",
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
                    nome: "tempo de resposta da secretaria",
                    lock: true,
                    tipoValor: "Dias",
                    get: {
                        id: "0",
                        atualizado: "",
                        valor: "",
                        categoria: "2",
                    },
                    post: {
                        rota: "/admin/secretaria/agendamento",
                        campo: "tempo",
                        categoria: "categoria_secretaria_id",
                    },
                },
                {
                    index: 3,
                    nome: "tempo de agendamento token",
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
        /** REGRAS */
        addRegras(index: any, data: any) {
            if (data.length == 0) {
                return;
            } else {
                this.regrasTabela[index].get = {
                    id: index == 2 ? data[0].id : data.id,
                    valor:
                        index == 2
                            ? data[0][this.regrasTabela[index].post.campo]
                            : data[this.regrasTabela[index].post.campo],
                    categoria:
                        index == 2
                            ? //@ts-expect-error
                              data[0][this.regrasTabela[index].post.categoria]
                            : //@ts-expect-error
                              data[this.regrasTabela[index].post.categoria],
                    atualizado:
                        index == 2
                            ? `${FormatoData.formatarParaPadraoBrasil(
                                  FormatoData.formatarParaApi(
                                      data[0].updated_at,
                                  )["data"],
                              )}`
                            : `${FormatoData.formatarParaPadraoBrasil(
                                  FormatoData.formatarParaApi(data.updated_at)[
                                      "data"
                                  ],
                              )}`,
                };
            }
        },

        async buscarTodasRegras() {
            this.regrasTabela.forEach(async (regra) => {
                await this.store.request!
                    .pegarDadosApi(regra.post.rota)
                    .then((res: any) => {
                        this.addRegras(regra.index, res.list);
                    })
                    .finally(() => (this.loading = false));
            });
        },

        async atualizarRegra(index: number) {
            if (this.regrasTabela[index].lock) {
                this.regrasTabela[index].lock = false;
            } else {
                await this.store.request!
                    .enviarDadosApi(`${this.regrasTabela[index].post.rota}`, {
                        [this.regrasTabela[index].post.campo]:
                            this.regrasTabela[index].get.valor,
                        //@ts-expect-errorX
                        [this.regrasTabela[index].post.categoria]:
                            this.regrasTabela[index].get.categoria,
                    })
                    .then((res: any) => {
                        if (res.status) {
                            Response.mensagemToast(
                                "success",
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemToast(
                                "error",
                                this.$t(res.messageCode),
                            );
                        }
                    })
                    .finally(() => (this.regrasTabela[index].lock = true));
            }
        },
        /** REGRAS */
    },
    async created() {
        await this.buscarTodasRegras();
    },
};
</script>
<template>
    <div class="row">
        <div class="row mt-5">
            <div class="col-12 mt-5">
                <h1 class="text-2xl font-bold mb-4 capitalize">
                    {{ $t("rules") }}
                </h1>
            </div>
        </div>
        <vue3-datatable
            class="w-full shadow-md rounded p-2 alt-pagination mb-4 dark:text-white"
            :rows="regrasTabela"
            :columns="cols"
            :totalRows="regrasTabela?.length"
            :loading="loading"
            :paginationInfo="`${$t('total-data')} ${regrasTabela.length}, ${$t(
                'per-page',
            )}`"
            :sortable="true">
            <template #nome="data">
                <span
                    class="uppercase dark:badge dark:border-[#17263c] dark:bg-[#1b2e4b]"
                    >{{ data.value.nome }}</span
                >
            </template>
            <template #atualizado="data">
                <span
                    class="uppercase dark:badge dark:border-[#17263c] dark:bg-[#1b2e4b]"
                    >{{ data.value.get.atualizado }}</span
                >
            </template>
            <template #status="data">
                <span
                    v-if="data.value.get.valor"
                    class="badge whitespace-nowrap bg-success uppercase"
                    >{{ $t("active") }}</span
                >
                <span
                    v-else
                    class="badge whitespace-nowrap bg-warning uppercase"
                    >{{ $t("not-found") }}</span
                >
            </template>
            <template #valor="data">
                <div class="flex flex-row">
                    <div class="flex w-full p-3">
                        <input
                            class="form-input form-input-sm ltr:rounded-r-none rtl:rounded-l-none dark:text-white"
                            :class="{
                                'border-danger': !data.value.lock,
                            }"
                            type="text"
                            v-model="data.value.get.valor"
                            :disabled="data.value.lock"
                            @keypress.enter="
                                atualizarRegra(data.value.index)
                            " />
                        <div
                            :class="{
                                'bg-danger text-white': !data.value.lock,
                            }"
                            class="bg-[#eee] dark:bg-[#111] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
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
</template>
<style>
/* alt-pagination */
.alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
}
</style>
