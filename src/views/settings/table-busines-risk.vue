<script>
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import FormatoData from "@/helpers/FormatoData";
import Response from "@/api/Response";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
    },
    data() {
        return {
            loading: true,
            cols: [
                {
                    field: "nome",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("name"),
                },
                {
                    field: "updated_at",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("last-update"),
                    slotMode: true,
                    cellRenderer(item) {
                        const data = FormatoData.formatarParaApi(
                            item.updated_at,
                        );
                        return FormatoData.formatarParaPadraoBrasil(data.data);
                    },
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
            riscoEmpresarialTabela: [],
        };
    },
    async created() {
        this.buscarRiscoEmpresarial();
    },
    methods: {
        /** RISCO-EMPRESARIAL */
        async buscarRiscoEmpresarial() {
            await this.$api
                .pegarDadosApi("/risco-empresarial")
                .then(async (res) => {
                    if (res.status) {
                        res.list.forEach((item) => {
                            item["lock"] = true;
                        });
                        this.riscoEmpresarialTabela = res.list;
                    }
                })
                .finally(() => (this.loading = false));
        },

        async atualizarRiscoEmpresarial(estado, valor) {
            await this.$api
                .enviarDadosApi("/risco-empresarial", {
                    estado_id: estado,
                    valor: valor,
                })
                .then((res) => {
                    res.status
                        ? Response.mensagemToast("success", res.message)
                        : Response.mensagemToast("error", res.message);
                });
        },

        /** RISCO-EMPRESARIAL */
    },
};
</script>
<template>
    <hr />
    <div class="row mt-5">
        <div class="col-12 mt-5">
            <h1 class="text-2xl font-bold mb-4 capitalize">
                {{ $t("busines-risk") }}
            </h1>
        </div>
    </div>
    <vue3-datatable
        class="w-full shadow-md rounded p-2 alt-pagination whitespace-wrap dark:text-white"
        :rows="riscoEmpresarialTabela"
        :columns="cols"
        :total-rows="riscoEmpresarialTabela?.length"
        :paginationInfo="`${$t('total-data')} ${
            riscoEmpresarialTabela.length
        }, ${$t('per-page')}`"
        :loading="loading"
        :sortable="true">
        <template #nome="data">
            <span
                class="text-md font-semibold uppercase dark:badge dark:border-[#17263c] dark:bg-[#1b2e4b]"
                >{{ data.value.estado_nome }}</span
            >
        </template>
        <template #status="data">
            <span
                v-if="data.value.ativo"
                class="badge whitespace-nowrap bg-success uppercase"
                >{{ $t("active") }}</span
            >
            <span v-else class="badge whitespace-nowrap bg-warning uppercase">{{
                $t("not-found")
            }}</span>
        </template>
        <template #valor="data">
            <div class="flex flex-row">
                <div class="flex w-full p-3">
                    <input
                        v-model="data.value.valor"
                        class="form-input form-input-sm ltr:rounded-r-none rtl:rounded-l-none dark:text-white"
                        :class="{ 'border border-danger': !data.value.lock }"
                        type="text"
                        :disabled="data.value.lock"
                        @keypress.enter="
                            () => {
                                data.value.lock = !data.value.lock;
                                atualizarRiscoEmpresarial(
                                    data.value.estado_id,
                                    data.value.valor,
                                );
                            }
                        " />
                    <div
                        :class="{ 'bg-danger text-white': !data.value.lock }"
                        class="bg-[#eee] dark:bg-[#111] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                        <span>%</span>
                    </div>
                </div>
            </div>
        </template>
        <template #botao="data">
            <button
                class="btn btn-sm btn-primary uppercase"
                :class="{ 'btn-danger': !data.value.lock }"
                @click="
                    data.value.lock = !data.value.lock;
                    !data.value.lock
                        ? null
                        : atualizarRiscoEmpresarial(
                              data.value.estado_id,
                              data.value.valor,
                          );
                ">
                {{ data.value.lock ? $t("unlock") : $t("update") }}
            </button>
        </template>
    </vue3-datatable>
</template>
<style>
/* alt-pagination */
/* .alt-pagination .bh-pagination .bh-page-item {
    @apply !w-max min-w-[32px] !rounded;
} */
</style>
