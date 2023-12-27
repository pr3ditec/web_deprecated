<script lang="ts">
import Response from "@/api/Response";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import SettingsHelp from "./settings-help.vue";
import { useAppStore } from "@/stores";

export default {
    components: {
        "vue3-datatable": Vue3Datatable,
        "settings-help": SettingsHelp,
    },
    data() {
        return {
            store: useAppStore(),
            loading: true,
            showHelp: false,
            cols: [
                {
                    field: "nome",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("capabilities"),
                },
                {
                    field: "status",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("status"),
                },
                {
                    field: "dias",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("return-time"),
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
            rows: [],
        };
    },
    async created() {
        this.buscarConfigMedico();
    },
    methods: {
        /** CONFIGURACOES-MEDICO */
        async buscarConfigMedico() {
            await this.store.request
                .pegarDadosApi(`/medico/${localStorage.getItem("doctor.id")}`)
                .then(async (res: any) => {
                    if (res.status) {
                        res.list.especialidades.forEach((item: any) => {
                            item["lock"] = true;
                        });
                        this.rows = res.list.especialidades;
                    }
                })
                .finally(() => (this.loading = false));
        },

        async atualizarConfigMedico(
            dias_retorno: any,
            valor_retorno: any,
            especialidade_id: any,
            valor_especialidade: any,
        ) {
            await this.store.request
                .enviarDadosApi("/medico/especialidade", {
                    especialidades: JSON.stringify([
                        {
                            dias_retorno: dias_retorno,
                            valor_retorno: valor_retorno,
                            valor: valor_especialidade,
                            especialidade_id: especialidade_id,
                        },
                    ]),
                })
                .then((res: any) => {
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          );
                });
        },

        /** CONFIGURACOES-MEDICO */
    },
};
</script>
<template>
    <!-- AJUDA -->
    <button
        class="whitespace-wrap bg-red-700 hover:bg-red-700 text-white font-bold py-0 px-1 rounded-full border-2 border-red-700 text-sm mt-5"
        @mouseover="showHelp = true"
        @mouseleave="showHelp = false">
        ?
    </button>

    <Transition :duration="200">
        <settings-help v-show="showHelp"></settings-help>
    </Transition>
    <!-- AJUDA -->

    <vue3-datatable
        class="w-full shadow-md rounded alt-pagination whitespace-wrap dark:text-white mt-2"
        :rows="rows"
        :columns="cols"
        :total-rows="rows?.length"
        skin="bh-table-stripped"
        :loading="loading"
        :paginationInfo="`${$t('total-data')} ${rows.length}, ${$t(
            'per-page',
        )}`"
        :sortable="true">
        <template #nome="data">
            <span class="text-md font-semibold uppercase">{{
                data.value.descricao
            }}</span>
        </template>
        <template #status="data">
            <span
                v-if="data.value.valor_retorno"
                class="badge whitespace-nowrap bg-success uppercase"
                >{{ $t("active") }}</span
            >
            <span v-else class="badge whitespace-nowrap bg-warning uppercase">{{
                $t("not-found")
            }}</span>
        </template>
        <template #dias="data">
            <div class="flex flex-row dark:text-white">
                <div class="flex w-full p-3">
                    <input
                        v-model="data.value.dias_retorno"
                        class="form-input form-input-sm ltr:rounded-r-none rtl:rounded-l-none dark:text-white"
                        :class="{ 'border border-danger': !data.value.lock }"
                        type="text"
                        :disabled="data.value.lock" />
                    <div
                        :class="{ 'bg-danger text-white': !data.value.lock }"
                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                        <span>{{ $t("days") }}</span>
                    </div>
                </div>
            </div>
        </template>
        <template #valor="data">
            <div class="flex flex-row dark:text-white">
                <div class="flex w-full p-3">
                    <input
                        v-model="data.value.valor_retorno"
                        class="form-input form-input-sm ltr:rounded-r-none rtl:rounded-l-none dark:text-white"
                        :class="{ 'border border-danger': !data.value.lock }"
                        type="text"
                        :disabled="data.value.lock" />
                    <div
                        :class="{ 'bg-danger text-white': !data.value.lock }"
                        class="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                        <span>$</span>
                    </div>
                </div>
            </div>
        </template>
        <template #botao="data">
            <button
                class="btn btn-sm btn-primary uppercase dark:text-white"
                :class="{ 'btn-danger': !data.value.lock }"
                @click="
                    data.value.lock = !data.value.lock;
                    !data.value.lock
                        ? null
                        : atualizarConfigMedico(
                              data.value.dias_retorno,
                              data.value.valor_retorno,
                              data.value.id,
                              data.value.valor,
                          );
                ">
                {{ data.value.lock ? $t("unlock") : $t("update") }}
            </button>
        </template>
    </vue3-datatable>
</template>
