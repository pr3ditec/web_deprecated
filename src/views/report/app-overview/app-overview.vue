<script>
import cardDownloads from "./card-downloads.vue";
import chartDownloads from "./chart-downloads.vue";
import { useAppStore } from "@/stores";

export default {
    components: {
        cardDownloads,
        chartDownloads,
    },
    data() {
        return {
            store: useAppStore(),
            isLoading: true,
            dadosAplicativo: {
                total_downloads: 0,
                total_ativos: 0,
                taxa_retencao: 0,
            },
            todosMesesdownload: [
                {
                    name: this.$t("removed"),
                    data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
                },
                {
                    name: this.$t("downloaded"),
                    data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
                },
            ],
        };
    },
    methods: {
        async pegarDadosAplicativo() {
            await this.store.request
                .pegarDadosApi("/relatorio-app")
                .then((res) => {
                    this.dadosAplicativo = res.list;
                })
                .finally(() => (this.isLoading = false));
        },
    },
    computed: {
        downloadsTotal() {
            return this.$t("total-download");
        },
        usuariosAtivos() {
            return this.$t("user-active");
        },
        taxaRetencao() {
            return `${this.$t("retention-rate")}%`;
        },
        todosDownloadsPorMes() {
            return this.$t("total-month-download");
        },
    },
    created() {
        this.pegarDadosAplicativo();
    },
};
</script>
<template>
    <div v-if="isLoading">{{ $t("loading") }}</div>
    <div v-else class="flex flex-col">
        <!-- PRIMEIRA ROW -->
        <div class="flex flex-col md:flex-row p-2 gap-1">
            <div class="w-full md:w-3/6">
                <cardDownloads
                    :data-series="[dadosAplicativo.total_downloads]"
                    :text-series="downloadsTotal"
                    color-series="#4361ee" />
            </div>
            <div class="w-full md:w-2/6">
                <cardDownloads
                    :data-series="[dadosAplicativo.total_ativos]"
                    :text-series="usuariosAtivos"
                    color-series="#bb62fe" />
            </div>
            <div class="w-full md:w-1/6">
                <cardDownloads
                    :data-series="[dadosAplicativo.taxa_retencao]"
                    :text-series="taxaRetencao"
                    color-series="#00ab55" />
            </div>
        </div>
        <!-- PRIMEIRA ROW -->

        <!-- SEGUNDA ROW -->
        <div class="flex flex-col md:flex-row p-2 gap-1">
            <div class="w-full md:w-2/4">
                <cardDownloads
                    :data-series="[
                        dadosAplicativo.estado_download.paciente.mais_downloads
                            .quantidade,
                    ]"
                    :text-series="'Estado com mais downloads por paciente'"
                    :total-text="
                        dadosAplicativo.estado_download.paciente.mais_downloads
                            .estado
                    "
                    color-series="#4361ee" />
            </div>
            <div class="w-full md:w-2/4">
                <cardDownloads
                    :data-series="[
                        dadosAplicativo.estado_download.paciente.menos_downloads
                            .quantidade,
                    ]"
                    :text-series="'Estado com meno downloads por paciente'"
                    :total-text="
                        dadosAplicativo.estado_download.paciente.menos_downloads
                            .estado
                    "
                    color-series="#d7060b" />
            </div>
        </div>
        <!-- SEGUNDA ROW -->

        <!-- TERCEIRA ROW -->
        <div class="flex flex-col md:flex-row p-2 gap-1">
            <div class="w-full md:w-2/4">
                <cardDownloads
                    :data-series="[
                        dadosAplicativo.estado_download.medico.mais_downloads
                            .quantidade,
                    ]"
                    :text-series="'Estado com mais downloads por médico'"
                    :total-text="
                        dadosAplicativo.estado_download.medico.mais_downloads
                            .estado
                    "
                    color-series="#4361ee" />
            </div>
            <div class="w-full md:w-2/4">
                <cardDownloads
                    :data-series="[
                        dadosAplicativo.estado_download.medico.menos_downloads
                            .quantidade,
                    ]"
                    :text-series="'Estado com menos downloads por médico'"
                    :total-text="
                        dadosAplicativo.estado_download.medico.menos_downloads
                            .quantidade
                    "
                    color-series="#d7060b" />
            </div>
        </div>
        <!-- TERCEIRA ROW -->

        <div class="flex flex-col p-3">
            <chartDownloads
                :text-series="todosDownloadsPorMes"
                :data-series="todosMesesdownload" />
        </div>
    </div>
</template>
