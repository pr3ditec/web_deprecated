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
                <!-- Users Visit -->
                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Quantidade total de parcelas</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-2xl font-bold ltr:mr-3 rtl:ml-3">806935</div>
                    </div>
                </div>

                <!-- Sessions -->
                <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Valor total de parcelas pagas</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-1xl font-bold ltr:mr-3 rtl:ml-3">38.228.761,23</div>
                        <div class="badge bg-white/30">[445606]</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">Atendimentos [228186]</div>
                </div>

                <!-- Time On-Site -->
                <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Valor total inadimplência %</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">42.10%</div>
                    </div>
                </div>

                <!-- Bounce Rate -->
                <div class="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Caixa futuro</div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">2.057.073.485,04</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">Média parcelamento 33.8</div>
                </div>
            </div>

            <div class="grid grid-cols-2 xl:grid-cols-2 gap-6 mb-2">
                <div class="grid gap-6 xl:grid-flow-row">
                    <!-- Previous Statement -->
                    <div class="panel overflow-hidden">
                        <div>
                            <div class="text-center">
                                <div class="text-lg font-bold">Total parcelas atendimentos que deveriam ser pagas</div>
                            </div>
                        </div>
                        <div class="relative mt-10 text-center">
                            <div class="grid grid-cols-3 md:grid-cols-1 gap-6">
                                <div>
                                    <div class="mt-3 font-semibold text-2xl">49.733.828,10 - 603301 [74.76%]</div>
                                </div>
                                <div>
                                    <div class="text-primary">Adimplente</div>
                                    <div class="text-success mt-2 font-semibold text-2xl">32.181.303,14 - 62.18%</div>
                                </div>
                                <div>
                                    <div class="text-primary">Inadimplente</div>
                                    <div class="text-danger mt-2 font-semibold text-2xl">17.552.524,96 - 37.82%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid gap-6 xl:grid-flow-row">
                    <div class="panel overflow-hidden">
                        <div>
                            <div class="text-center">
                                <div class="text-lg font-bold">Parcelas de atendimentos concluídos</div>
                            </div>
                        </div>
                        <div class="relative mt-10 text-center">
                            <div class="grid grid-cols-3 md:grid-cols-1 gap-6">
                                <div>
                                    <div class="mt-3 font-semibold text-2xl">49.733.828,10 - 603301 [74.76%]</div>
                                </div>
                                <div>
                                    <div class="text-primary">Adimplente</div>
                                    <div class="text-success mt-2 font-semibold text-2xl">6.047.458,09 - 34.62%</div>
                                </div>
                                <div>
                                    <div class="text-primary">Inadimplente</div>
                                    <div class="text-danger mt-2 font-semibold text-2xl">10.241.626,71 - 65.38%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6">
                <!-- Recent Transactions -->
                <div class="panel">
                    <div class="mb-5 text-lg font-bold">PARCELAMENTO</div>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>PARCELA</th>
                                    <th>NUMERO DE PARCELAS</th>
                                    <th>VALOR PAGO</th>
                                    <th>VALOR INADIMPLENTE</th>
                                    <th class="text-center ltr:rounded-r-md rtl:rounded-l-md">INADIMPLÊNCIA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="font-semibold">01</td>
                                    <td class="whitespace-nowrap">6271</td>
                                    <td class="whitespace-nowrap">6.024.948,72 - [39479]</td>
                                    <td>629.239,86 - [5672]</td>
                                    <td class="text-center">
                                        <span class="badge bg-success/20 text-success rounded-full">9.46%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">02</td>
                                    <td class="whitespace-nowrap">42040</td>
                                    <td class="whitespace-nowrap">3.302.789,85 - [33387]</td>
                                    <td>933.534,22 - [8653]</td>
                                    <td class="text-center">
                                        <span class="badge bg-info/20 text-info rounded-full hover:top-0">22.04%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">03</td>
                                    <td class="whitespace-nowrap">38523</td>
                                    <td class="whitespace-nowrap">2.740.909,05 - [28262]</td>
                                    <td>1.042.746,80 - [10261]</td>
                                    <td class="text-center">
                                        <span class="badge bg-info/20 text-info rounded-full hover:top-0">27.56%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">04</td>
                                    <td class="whitespace-nowrap">39272</td>
                                    <td class="whitespace-nowrap">2.541.986,07 - [27239]</td>
                                    <td>1.197.120,53 - [12033]</td>
                                    <td class="text-center">
                                        <span class="badge bg-danger/20 text-danger rounded-full hover:top-0">32.02%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">05</td>
                                    <td class="whitespace-nowrap">35649</td>
                                    <td class="whitespace-nowrap">2.169.188,49 - [23572]</td>
                                    <td>1.165.739,20 - [12077]</td>
                                    <td class="text-center">
                                        <span class="badge bg-danger/20 text-danger rounded-full hover:top-0">34.96%</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">06</td>
                                    <td class="whitespace-nowrap">34417</td>
                                    <td class="whitespace-nowrap">1.955.189,26 - [21915]</td>
                                    <td>1.175.173,07 - [12502]</td>
                                    <td class="text-center">
                                        <span class="badge bg-danger/20 text-danger rounded-full hover:top-0">37.54%</span>
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
import { inject } from "vue";
import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Risco Empresarial" });

export default {
    components: {},
    data() {
        const dataAtual = new Date();
        const dataInicial = new Date();
        dataInicial.setDate(dataAtual.getDate() - 365);

        return {
            request: Object(inject("api")),
            totalParcelas: 0,
            totalParcelasPagas: 0,
            totalInadimplencia: 0,
            caixaFuturo: 0,
            totalParcelasAtendimentos: 0,
            adimplente: 0,
            inadimplente: 0,
            parcelamento: {},
            dataAtual: dataAtual.toISOString().split("T")[0],
            dataInicial: dataInicial.toISOString().split("T")[0],
            dataFim: dataAtual.toISOString().split("T")[0],
        };
    },
    async mounted() {
        await this.processData();
    },
    methods: {
        async processData() {
            const data = await this.request.pegarDadosApi(`relatorio/risco_empresarial/${this.dataInicial}/${this.dataFim}`);

            const porcentagensRiscoEmpresarial = data.map((item) => parseFloat(item.porcentagem_risco_empresarial));

            data.forEach((item) => {
                item.parcelas.forEach((parcela) => {
                    // somando o total de parcelas
                    this.totalParcelas++;

                    // verifico se foi pago a parcela
                    if (parcela.pagamento) {
                        this.totalParcelasPagas++;
                        this.adimplente += parseFloat(parcela.valor);
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
                    if (parcela.historico && parcela.historico.some((h) => h.descricao === "EFETIVADO")) {
                        this.totalParcelasAtendimentos++;
                    }

                    // agrupa as parcelas
                    if (!this.parcelamento[parcela.parcela]) {
                        this.parcelamento[parcela.parcela] = {
                            numeroParcelas: 0,
                            valorPago: 0,
                            valorInadimplente: 0,
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
            Object.keys(this.parcelamento).forEach((parcela) => {
                this.parcelamento[parcela].inadimplencia =
                    this.parcelamento[parcela].valorInadimplente / (this.parcelamento[parcela].valorPago + this.parcelamento[parcela].valorInadimplente);
            });

            console.log(this.totalParcelas);
            console.log(this.totalParcelasPagas);
            console.log(this.adimplente);
            console.log(this.totalInadimplencia);
            console.log(this.inadimplente);
            console.log(this.caixaFuturo);
            console.log(this.totalParcelasAtendimentos);
            console.log(this.parcelamento);
            console.log(porcentagensRiscoEmpresarial);
        },
    },
};
</script>
