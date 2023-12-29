<script>
import apexchart from "vue3-apexcharts";
import { useAppStore } from "@/stores";

export default {
    props: {
        textSeries: String,
        dataSeries: Array,
    },
    components: {
        apexchart,
    },
    computed: {
        apexOptions() {
            const isDark =
                useAppStore().theme === "dark" || useAppStore().isDarkMode
                    ? true
                    : false;
            const isRtl = useAppStore().rtlClass === "rtl" ? true : false;
            return {
                chart: {
                    height: 360,
                    type: "bar",
                    fontFamily: "Nunito, sans-serif",
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 2,
                    colors: ["transparent"],
                },
                // colors: ["#ff0000", "#4361ee"],
                colors: ["#4361ee"],
                dropShadow: {
                    enabled: true,
                    blur: 3,
                    color: "#515365",
                    opacity: 0.4,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "55%",
                        borderRadius: 10,
                    },
                },
                legend: {
                    position: "bottom",
                    horizontalAlign: "center",
                    fontSize: "14px",
                    itemMargin: {
                        horizontal: 8,
                        vertical: 8,
                    },
                },
                grid: {
                    borderColor: isDark ? "#191e3a" : "#e0e6ed",
                    padding: {
                        left: 20,
                        right: 20,
                    },
                },
                xaxis: {
                    categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    axisBorder: {
                        show: true,
                        color: isDark ? "#3b3f5c" : "#e0e6ed",
                    },
                },
                yaxis: {
                    tickAmount: 6,
                    opposite: isRtl ? true : false,
                    labels: {
                        offsetX: isRtl ? -10 : 0,
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: isDark ? "dark" : "light",
                        type: "vertical",
                        shadeIntensity: 0.1,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 0.8,
                        stops: [0, 100],
                    },
                },
                tooltip: {
                    marker: {
                        show: true,
                    },
                    y: {
                        formatter: (val) => {
                            return val;
                        },
                    },
                },
            };
        },
    },
};
</script>
<template>
    <div class="flex flex-col p-3 rounded-md shadow-md">
        <h1 class="text-lg font-semibold">{{ textSeries }}</h1>
        <hr class="w-75 mt-2" />
        <apexchart
            height="360"
            :options="apexOptions"
            :series="dataSeries"
            class="overflow-hidden">
            <!-- loader -->
            <div
                class="min-h-[360px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                <span
                    class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
            </div>
        </apexchart>
    </div>
</template>
<!--      -->
