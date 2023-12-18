<script>
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import { useAppStore } from "@/stores";
import FormatoData from "@/helpers/FormatoData";

export default {
    components: {
        Vue3Datatable,
    },
    data() {
        return {
            store: useAppStore(),
            showDetalhes: false,
            loading: true,
            search: "",
            rows: [],
            defaulterRow: [],
        };
    },
    methods: {
        toDate(date) {
            return FormatoData.formatarParaPadraoBrasil(date);
        },
        async buscarInfoDeUsuarios() {
            await this.store.request
                .pegarDadosApi("/financeiro/todas")
                .then((res) => {
                    if (res.status) {
                        const keys = Object.keys(res.list);
                        for (let index = 0; index < keys.length; index++) {
                            this.verificarInadimplencia(res.list[keys[index]]);
                        }
                    }
                })
                .finally(() => (this.loading = false));
        },

        verificarInadimplencia(dados) {
            const hoje = new Date().getTime();
            for (let index = 0; index < dados.length; index++) {
                const data_parcela = new Date(
                    dados[index]["data_vencimento"],
                ).getTime();
                // inadimplente
                // if (!dados[index].pago && data_parcela > hoje) {
                if (true) {
                    dados[index]["status"] = "defaulter";
                    dados[index]["num_parcelas"] = dados.length;
                    this.defaulterRow.push(dados[index]);
                    this.rows.push(dados);
                    break;
                } else if (!dados[index].pago && data_parcela < hoje) {
                    break;
                }
            }
        },
    },
    computed: {
        placeholder() {
            return this.$t("search-by-patient");
        },
    },
    async created() {
        await this.buscarInfoDeUsuarios();
    },
};
</script>
<template>
    <div class="flex flex-col">
        <input
            type="text"
            class="form-input w-1/2 text-center mx-auto mb-3 mt-5"
            v-model="search"
            :placeholder="placeholder" />
        <div
            v-if="loading"
            class="flex flex-row justify-center items-center mt-5">
            <span
                class="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
        </div>
        <div
            v-else-if="defaulterRow.length == 0"
            class="flex flex-row justify-center items-center mt-5">
            {{ $t("empty-table") }}
        </div>
        <div v-else class="flex flex-row table-responsive mt-5 gap-3">
            <div class="w-full">
                <table class="shadow-md border border-dark-light">
                    <thead>
                        <tr
                            class="[&>*]:bg-#F6F8FA [&>*]:p-4 rounded-lg uppercase shadow-lg">
                            <th class="">{{ $t("name") }}</th>
                            <th>{{ $t("doctor") }}</th>
                            <th>{{ $t("valueInstallments") }}</th>
                            <th>{{ $t("numberInstallments") }}</th>
                            <th>{{ $t("phone") }}</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">{{ $t("actions") }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in defaulterRow" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">
                                    {{ data.paciente.nome }}
                                </td>
                                <td>{{ data.medico.nome }}</td>
                                <td>{{ data.valor }}</td>
                                <td>
                                    {{ data.num_parcelas }}
                                </td>
                                <td>
                                    {{
                                        data.paciente.telefone != ""
                                            ? data.paciente.telefone
                                            : $t("no-phone")
                                    }}
                                </td>
                                <td>
                                    <span
                                        class="badge whitespace-nowrap uppercase"
                                        :class="{
                                            'bg-danger':
                                                data.status === 'defaulter',
                                            'bg-primary':
                                                data.status === 'normal',
                                            'bg-success':
                                                data.status === 'finished',
                                        }">
                                        {{ $t(data.status) }}</span
                                    >
                                </td>
                                <td class="text-center">
                                    <button
                                        class="btn btn-sm btn-primary uppercase"
                                        @click="showDetalhes = true">
                                        {{ $t("show-more") }}
                                    </button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <Transition>
                <div v-if="showDetalhes" class="w-4/12">
                    <div class="flex flex-col gap-2">
                        <table class="shadow-md border border-dark-light">
                            <thead>
                                <tr
                                    class="[&>*]:bg-#F6F8FA [&>*]:p-4 rounded-lg uppercase shadow-lg">
                                    <th class="">{{ $t("parcela") }}</th>
                                    <th>{{ $t("vencimento") }}</th>
                                    <th>
                                        <button
                                            class="relative btn btn-sm btn-outline-danger mx-auto"
                                            @click="showDetalhes = false">
                                            {{ $t("close") }}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="row in rows[0]" :key="row.id">
                                    <tr>
                                        <td class="whitespace-nowrap">
                                            {{ row.parcela }} -
                                            {{
                                                row.pago != null
                                                    ? "Pago"
                                                    : "pendente"
                                            }}
                                        </td>
                                        <td>
                                            {{ toDate(row.data_vencimento) }}
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>
