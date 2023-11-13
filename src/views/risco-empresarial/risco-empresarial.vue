<template>
    <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline">Dashboard</a>
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>RISCO EMPRESARIAL</span>
            </li>
        </ul>
        <div class="pt-8">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6 text-white">

                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Quantidade Total de Parcelas</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-2xl font-bold ltr:mr-3 rtl:ml-3">{{ totalParcelas }}</div>
                    </div>
                </div>

                <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Valor Total de Parcelas Pagas</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-1xl font-bold ltr:mr-3 rtl:ml-3">{{ totalParcelasPagas }}</div>
                        <div class="badge bg-white/30">{{ formatValor(adimplente) }}</div>
                    </div>
                </div>

                <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Valor Total Inadimplência </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ totalInadimplencia }}</div>
                        <div class="badge bg-white/30">{{ formatValor(inadimplente) }}</div>
                    </div>
                </div>

                <div class="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Caixa Futuro</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ formatValor(caixaFuturo) }}</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        Média Parcelamento {{ mediaParcelamento }}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 xl:grid-cols-2 gap-6 mb-2">
                <div class="grid gap-6 xl:grid-flow-row">
                    <div class="panel overflow-hidden">
                        <div>
                            <div class="text-center">
                                <div class="text-lg font-bold">Total Parcelas Pagas</div>
                            </div>
                        </div>
                        <div class="relative mt-10 text-center">
                            <div class="grid grid-cols-3 md:grid-cols-1 gap-6">
                                <div>
                                    <div class="mt-3 font-semibold text-2xl">{{ totalParcelasPagas }} - {{
                                        formatValor(adimplente) }}</div>
                                </div>
                                <div>
                                    <div class="text-primary">Adimplente </div>
                                    <div class="text-success mt-2 font-semibold text-2xl">{{ parcelaPagaEmDia }} - {{
                                        formatValor(parcelaPagaEmDiaValor) }}</div>
                                </div>
                                <div>
                                    <div class="text-primary">Inadimplente</div>
                                    <div class="text-danger mt-2 font-semibold text-2xl">{{ parcelaPagaAtrasada }} - {{
                                        formatValor(parcelaPagaAtrasadaValor) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid gap-6 xl:grid-flow-row">
                    <div class="panel overflow-hidden">
                        <p class="text-lg dark:text-white-light/90">Risco Empresarial <span
                                class="text-primary ml-2">50%</span></p>
                        <div class="relative">
                            <apexchart height="325" :options="revenueChart" :series="revenueSeries"
                                class="bg-white dark:bg-black rounded-lg overflow-hidden">
                                <div
                                    class="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span
                                        class="animate-spin border-2 border-black dark:border-white !border-l-transparent rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            </apexchart>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6">
                <div class="panel">
                    <div class="mb-5 text-lg font-bold">PARCELAMENTO</div>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th class="!text-center">PARCELA</th>
                                    <th class="!text-center">NUMERO DE PARCELAS</th>
                                    <th class="!text-right">VALOR PAGO</th>
                                    <th class="!text-right">VALOR INADIMPLENTE</th>
                                    <th class="!text-center ltr:rounded-r-md rtl:rounded-l-md">INADIMPLÊNCIA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, parcela) in parcelamento" :key="parcela">
                                    <td class="!text-center">{{ parcela }}</td>
                                    <td class="!text-center">{{ value.numeroParcelas }}</td>
                                    <td class="!text-right">{{ formatValor(value.valorPago) }}</td>
                                    <td class="!text-right">{{ formatValor(value.valorInadimplente) }}</td>
                                    <td class="!text-center ltr:rounded-r-md rtl:rounded-l-md"
                                        v-bind:class="{ 'text-success': value.valorInadimplente <= 70, 'text-danger': value.valorInadimplente > 70 }">
                                        {{ value.valorInadimplente }} %
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, inject, computed } from 'vue';
import { useMeta } from '@/composables/use-meta';
import apexchart from 'vue3-apexcharts';
import { useAppStore } from '@/stores/index';
useMeta({ title: 'Risco Empresarial' });

export default {
    components: {
        apexchart
    },
    setup() {
        const store = useAppStore();

        const revenueChart = computed(() => {
            const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
            const isRtl = store.rtlClass === 'rtl' ? true : false;
            return {
                chart: {
                    height: 325,
                    type: 'area',
                    fontFamily: 'Nunito, sans-serif',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    width: 2,
                    lineCap: 'square',
                },
                dropShadow: {
                    enabled: true,
                    opacity: 0.2,
                    blur: 10,
                    left: -7,
                    top: 22,
                },
                colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
                markers: {
                    discrete: [
                        {
                            seriesIndex: 0,
                            dataPointIndex: 6,
                            fillColor: '#1b55e2',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                        {
                            seriesIndex: 1,
                            dataPointIndex: 5,
                            fillColor: '#e7515a',
                            strokeColor: 'transparent',
                            size: 7,
                        },
                    ],
                },
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                xaxis: {
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    crosshairs: {
                        show: true,
                    },
                    labels: {
                        offsetX: isRtl ? 2 : 0,
                        offsetY: 5,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-xaxis-title',
                        },
                    },
                },
                yaxis: {
                    tickAmount: 7,
                    labels: {
                        formatter: (value: number) => {
                            return value / 1000 + 'K';
                        },
                        offsetX: isRtl ? -30 : -10,
                        offsetY: 0,
                        style: {
                            fontSize: '12px',
                            cssClass: 'apexcharts-yaxis-title',
                        },
                    },
                    opposite: isRtl ? true : false,
                },
                grid: {
                    borderColor: isDark ? '#191e3a' : '#e0e6ed',
                    strokeDashArray: 5,
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                    yaxis: {
                        lines: {
                            show: false,
                        },
                    },
                    padding: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    fontSize: '16px',
                    markers: {
                        width: 10,
                        height: 10,
                        offsetX: -2,
                    },
                    itemMargin: {
                        horizontal: 10,
                        vertical: 5,
                    },
                },
                tooltip: {
                    marker: {
                        show: true,
                    },
                    x: {
                        show: false,
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: !1,
                        opacityFrom: isDark ? 0.19 : 0.28,
                        opacityTo: 0.05,
                        stops: isDark ? [100, 100] : [45, 100],
                    },
                },
            };
        });

        const revenueSeries = ref([
            {
                name: '30%',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: '50%',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ]);

        return {
            revenueChart,
            revenueSeries
        };
    },
    data() {
        const dataAtual = new Date();
        const dataInicial = new Date();
        dataInicial.setDate(dataAtual.getDate() - 365);

        return {
            request: Object(inject('api')),
            totalParcelas: 0,
            totalParcelasPagas: 0,
            totalInadimplencia: 0,
            caixaFuturo: 0,
            totalParcelasAtendimentos: 0,
            adimplente: 0,
            inadimplente: 0,
            mediaParcelamento: 0,
            somaParcelas: 0,
            parcelaPagaAtrasada: 0,
            parcelaPagaAtrasadaValor: 0,
            parcelaPagaEmDia: 0,
            parcelaPagaEmDiaValor: 0,
            parcelamento: {} as {
                [key: string]: {
                    numeroParcelas: number,
                    valorPago: number,
                    valorInadimplente: number,
                    inadimplencia: number
                }
            },
            dataAtual: dataAtual.toISOString().split('T')[0],
            dataInicial: dataInicial.toISOString().split('T')[0],
            dataFim: dataAtual.toISOString().split('T')[0]
        };
    },
    async mounted() {
        await this.processData();
    },
    methods: {
        async processData() {

            const data = await this.request.pegarDadosApi(`relatorio/risco_empresarial/${this.dataInicial}/${this.dataFim}`);

            const porcentagensRiscoEmpresarial = data.map(item => parseFloat(item.porcentagem_risco_empresarial));

            data.forEach(item => {
                item.parcelas.forEach(parcela => {

                    this.somaParcelas += parseFloat(parcela.valor);

                    // somando o total de parcelas
                    this.totalParcelas++;

                    // verifico se foi pago a parcela
                    if (parcela.pagamento) {
                        this.totalParcelasPagas++;
                        this.adimplente += parseFloat(parcela.valor);

                        let dataVencimento = new Date(parcela.vencimento);
                        if (dataVencimento < new Date(this.dataAtual)) {
                            this.parcelaPagaAtrasada++;
                            this.parcelaPagaAtrasadaValor += parseFloat(parcela.valor);
                        } else {
                            this.parcelaPagaEmDia++;
                            this.parcelaPagaEmDiaValor += parseFloat(parcela.valor);
                        }
                    }

                    // verifico inadimplência
                    let dataVencimento = new Date(parcela.vencimento);
                    if (!parcela.pagamento && dataVencimento < new Date(this.dataAtual)) {
                        this.totalInadimplencia++;
                        this.inadimplente += parseFloat(parcela.valor);
                    }

                    // colocar no caixa futuro
                    if (!parcela.pagamento) {
                        this.caixaFuturo += parseFloat(parcela.valor);
                    }

                    // vejo se a parcela ta paga
                    if (parcela.historico && parcela.historico.some(h => h.descricao === 'EFETIVADO')) {
                        this.totalParcelasAtendimentos++;
                    }

                    // agrupa as parcelas
                    if (!this.parcelamento[parcela.parcela]) {
                        this.parcelamento[parcela.parcela] = {
                            numeroParcelas: 0,
                            valorPago: 0,
                            valorInadimplente: 0,
                            inadimplencia: 0
                        };
                    }
                    this.parcelamento[parcela.parcela].numeroParcelas++;
                    if (parcela.pagamento) {
                        this.parcelamento[parcela.parcela].valorPago += parseFloat(parcela.valor);
                    } else if (dataVencimento < new Date(this.dataAtual)) {
                        this.parcelamento[parcela.parcela].valorInadimplente += parseFloat(parcela.valor);
                    }
                });
            });

            // inadimplência para cada parcela
            Object.keys(this.parcelamento).forEach(parcela => {
                this.parcelamento[parcela].inadimplencia = this.parcelamento[parcela].valorInadimplente / (this.parcelamento[parcela].valorPago + this.parcelamento[parcela].valorInadimplente);
            });

            if (this.totalParcelas !== 0) {
                this.mediaParcelamento = this.somaParcelas / this.totalParcelas;
            } else {
                this.mediaParcelamento = 0;
            }
        },

        formatValor(valor) {
            return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
    }
}
</script>
