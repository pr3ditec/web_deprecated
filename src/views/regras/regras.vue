<script lang="ts">
import MascarasInput from "@/helpers/MascaraInput";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";
import ApiConnection from "@/api/Api";

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
                    title: this.$t("rule"),
                },
                {
                    field: "atualizado",
                    headerClass: "flex flex-row gap-1 font-extrabold uppercase",
                    title: this.$t("updated"),
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
                    title: this.$t("alterar"),
                },
            ],
            dadosTabela: [
                {
                    index: 1,
                    regra: "Numero de Parcelas",
                    atualizado: "12/12/2022",
                    status: true,
                    valor: "89",
                    lock: true,
                },
                {
                    index: 1,
                    regra: "Desconto do médico",
                    atualizado: "12/12/2022",
                    status: true,
                    valor: "89",
                    lock: true,
                },
                {
                    index: 2,
                    regra: "Resposta de secretaria",
                    atualizado: "12/12/2022",
                    status: true,
                    valor: "89",
                    lock: true,
                },
                {
                    index: 3,
                    regra: "Risco empresarial",
                    atualizado: "12/12/2022",
                    status: true,
                    valor: "89",
                    lock: true,
                },
                {
                    index: 4,
                    regra: "Tempo de agendamento token  ",
                    atualizado: "12/12/2022",
                    status: true,
                    valor: "89",
                    lock: true,
                },
            ],
        };
    },
    methods: {
        async buscarDados(rota) {},
    },
};
</script>
<template>
    <div class="container-fluid">
        <div class="row mb-4 mt-5">
            <input
                class="form-input"
                type="text"
                placeholder="Pesquise...."
                v-model="search" />
        </div>
        <div class="row">
            <div class="col-6 p-5">
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
                    <template #status="data">
                        <span class="badge whitespace-nowrap bg-success"
                            >ATIVO</span
                        >
                    </template>
                    <template #valor="data">
                        <div class="flex flex-row">
                            <input
                                class="form-input form-input-sm w-1/2 p-3"
                                type="text"
                                :value="data.value.valor"
                                :disabled="data.value.lock" />
                        </div>
                    </template>
                    <template #botao="data">
                        <button
                            class="btn btn-sm btn-primary uppercase"
                            :class="{ 'btn-danger': !data.value.lock }"
                            @click="data.value.lock = !data.value.lock">
                            {{ !data.value.lock ? "Alterar" : "Unlock"}}
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

<!-- /maximo-parcelamento  cadastrar e ver -->
<!-- /risco-empresarial  cadastrar -->
<!-- /limite-confirmacao-agendamento cadastrar e index? -->
<!-- /medico/desconto cadastro -->
