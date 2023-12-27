<script>
import apexchart from "vue3-apexcharts";
import { useAppStore } from "@/stores";

export default {
    components: {
        apexchart,
    },
    props: {
        dataSeries: Array,
        textSeries: String,
        colorSeries: String,
    },
    computed: {
        apexOptions() {
            const isDark =
                useAppStore().theme === "dark" || useAppStore().isDarkMode
                    ? true
                    : false;
            return {
                chart: {
                    type: "donut",
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                labels: ["Total Downloads"],
                colors: [this.colorSeries],
                dataLabels: {
                    enabled: false,
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200,
                            },
                        },
                    },
                ],
                stroke: {
                    show: true,
                    width: 15,
                    colors: isDark ? "#0e1726" : "#fff",
                },
                legend: {
                    position: "bottom",
                },
                labels: [this.textSeries],
                plotOptions: {
                    pie: {
                        donut: {
                            size: "65%",
                            background: "transparent",
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: "29px",
                                    offsetY: -10,
                                },
                                value: {
                                    show: true,
                                    fontSize: "26px",
                                    color: "#000",
                                    offsetY: 16,
                                    formatter: (val) => {
                                        return val;
                                    },
                                },
                                total: {
                                    show: true,
                                    label: "Total",
                                    color: "#888ea8",
                                    fontSize: "29px",
                                    formatter: (w) => {
                                        return w.globals.seriesTotals.reduce(
                                            function (a, b) {
                                                return a + b;
                                            },
                                            0,
                                        );
                                    },
                                },
                            },
                        },
                    },
                },
            };
        },
    },
};
</script>
<template>
    <div class="flex flex-col w-full md:w-2/4 shadow-md p-3 rounded-md">
        <h1 class="text-lg font-semibold">{{ textSeries }}</h1>
        <hr class="w-full md:w-3/4 mt-2" />
        <div class="mx-auto w-full">
            <apexchart
                height="300"
                :options="apexOptions"
                :series="dataSeries"
                class="bg-white dark:bg-black rounded-lg overflow-hidden"></apexchart>
        </div>
    </div>
</template>
