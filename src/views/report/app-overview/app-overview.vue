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
            dadosAplicativo: {
                totalDownaload: 1078,
                mensalDownload: 70,
                todosMesesdownload: [
                    {
                        name: this.$t("removed"),
                        data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
                    },
                    {
                        name: this.$t("downloaded"),
                        data: [
                            91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70,
                        ],
                    },
                ],
            },
        };
    },
    methods: {
        pegarDadosAplicativo() {},
    },
    computed: {
        downloadsTotal() {
            return this.$t("total-download");
        },
        downloadsPorMes() {
            return this.$t("month-download");
        },
        todosDownloadsPorMes() {
            return this.$t("total-month-download");
        },
    },
    created() {},
};
</script>
<template>
    <div class="flex flex-col md:flex-row p-2 gap-1">
        <cardDownloads
            :data-series="[dadosAplicativo.totalDownaload]"
            :text-series="downloadsTotal"
            color-series="#4361ee" />

        <cardDownloads
            :data-series="[dadosAplicativo.mensalDownload]"
            :text-series="downloadsPorMes"
            color-series="#bb62fe" />
    </div>
    <div class="flex flex-col p-3">
        <chartDownloads
            :text-series="todosDownloadsPorMes"
            :data-series="dadosAplicativo.todosMesesdownload" />
    </div>
</template>
