<script>
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import SelectDate from "../../components/layout/SelectDate.vue";
import ApiConnection from "../../api/Api";

export default {
    components: {
        SelectMedico,
        SelectDate,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectedDoctor: null,
            startDate: null,
            endDate: null,
            list: [],
            list2: [],
            totalEfetivado: 0,
            totalProvisionado: 0,
            totalEfetivadoMesAtual: 0,
            totalEfetivadoSemanaAtual: 0,
            ultimosCinco: [],
        };
    },
    methods: {
        async fetchDoctorAvailability(doctorId) {
            // Primeira chamada de API
            let response1 = await this.request.pegarDadosApi(
                `/financeiro/medico/${doctorId}`,
            );

            console.log(response1);

            if (response1.status) {
                this.list = response1.list.filter(
                    (item) => item.descricao === "PROVISIONADO",
                );
                this.totalEfetivado = response1.list
                    .filter((item) => item.descricao === "EFETIVADO")
                    .reduce(
                        (total, item) =>
                            total + parseFloat(item.valor_desconto),
                        0,
                    );
                this.totalProvisionado = response1.list
                    .filter((item) => item.descricao === "PROVISIONADO")
                    .reduce(
                        (total, item) =>
                            total + parseFloat(item.valor_desconto),
                        0,
                    );

                let dataAtual = new Date();
                this.totalEfetivadoMesAtual = response1.list
                    .filter((item) => {
                        let dataItem = new Date(item.updated_at);
                        return (
                            item.descricao === "EFETIVADO" &&
                            dataItem.getMonth() === dataAtual.getMonth()
                        );
                    })
                    .reduce(
                        (total, item) =>
                            total + parseFloat(item.valor_desconto),
                        0,
                    );

                let inicioSemana = dataAtual.getDate() - dataAtual.getDay();
                let fimSemana = inicioSemana + 6;
                this.totalEfetivadoSemanaAtual = response1.list
                    .filter((item) => {
                        let dataItem = new Date(item.updated_at);
                        return (
                            item.descricao === "EFETIVADO" &&
                            dataItem.getDate() >= inicioSemana &&
                            dataItem.getDate() <= fimSemana
                        );
                    })
                    .reduce(
                        (total, item) =>
                            total + parseFloat(item.valor_desconto),
                        0,
                    );

                this.ultimosCinco = response1.list.slice(-5);
            } else {
                console.error("A resposta da API não é um objeto: ", response1);
            }

            // Segunda chamada de API
            let response2 = await this.request.pegarDadosApi(
                `/financeiro/medico/${doctorId}/${this.startDate}/${this.endDate}`,
            );

            console.log(response2);

            if (response2.status) {
                this.list2 = response2.list;
            } else {
                console.error("A resposta da API não é um objeto: ", response2);
            }
        },
        generateReport() {
            console.log(this.selectedDoctor);
            console.log(this.startDate);
            console.log(this.endDate);
            if (this.selectedDoctor && this.startDate && this.endDate) {
                this.fetchDoctorAvailability(this.selectedDoctor);
            } else {
                console.error(
                    "Por favor, selecione um médico e as datas antes de gerar o relatório.",
                );
            }
        },
    },
};
</script>

<template>
    <div>
        <h1 class="capitalize text-4xl font-bold mb-5 lead">
            {{ $t("financialReceiving") }}
        </h1>
        <SelectMedico v-model="selectedDoctor" />
        <SelectDate
            @update:start="startDate = $event"
            @update:end="endDate = $event"
            @generate="generateReport" />
    </div>

    <div>
        <div class="pt-5">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div class="panel h-full sm:col-span-2 lg:col-span-1">
                    <div
                        class="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 class="font-semibold text-lg">Statisticas</h5>
                    </div>
                    <div
                        class="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold">
                        <div>
                            <div>
                                <div>Total Recebido</div>
                                <div class="text-[#f8538d] text-lg">
                                    {{ this.totalEfetivado }}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>Valores Provisionados</div>
                                <div class="text-[#f8538d] text-lg">
                                    {{ this.totalProvisionado }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div
                        class="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 class="font-semibold text-lg">
                            Acompanhamento Semanal
                        </h5>
                        <div class="dropdown"></div>
                    </div>
                    <div class="text-[#e95f2b] text-3xl font-bold my-10">
                        <span class="ltr:mr-2 rtl:ml-2">{{
                            this.totalEfetivadoSemanaAtual
                        }}</span>
                        <span
                            class="text-black text-sm dark:text-white-light ltr:mr-1 rtl:ml-1">
                        </span>
                    </div>
                </div>

                <div
                    class="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                    style="
                        background: linear-gradient(
                            0deg,
                            #00c6fb -227%,
                            #005bea
                        ) !important;
                    ">
                    <div
                        class="flex items-start justify-between text-white-light mb-16 z-[7]">
                        <h5 class="font-semibold text-lg">Total Mensal</h5>

                        <div class="relative text-xl whitespace-nowrap">
                            {{ this.totalEfetivadoMesAtual }}
                            <span
                                class="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto"
                                >+ 2453 recebimentos/mês</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 mb-6">
                <div class="panel h-full p-0 lg:col-span-2">
                    <div
                        class="flex items-start justify-between dark:text-white-light mb-5 p-5 border-b border-[#e0e6ed] dark:border-[#1b2e4b]">
                        <h5 class="font-semibold text-lg">
                            Valores Recebidos / Período
                        </h5>
                        <div class="dropdown"></div>
                    </div>
                    <div class="table-responsive">
                        <div class="bg-white shadow rounded-lg p-6">
                            <table class="table-hover">
                                <thead>
                                    <tr>
                                        <th>ID do Médico</th>
                                        <th>Recebimento Médico</th>
                                        <th>Descrição</th>
                                        <th>Valor Desconto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in list2"
                                        :key="item.medico_id">
                                        <td>{{ item.medico_id }}</td>
                                        <td>{{ item.recebimento_medico }}</td>
                                        <td>
                                            <span
                                                class="badge whitespace-nowrap bg-success"
                                                >{{ item.descricao }}</span
                                            >
                                        </td>
                                        <td>{{ item.valor_desconto }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div
                        class="flex items-start justify-between dark:text-white-light mb-5 -mx-5 p-5 pt-0 border-b border-[#e0e6ed] dark:border-[#1b2e4b]">
                        <h5 class="font-semibold text-lg">
                            Histórico últimos lançamentos
                        </h5>
                        <div class="dropdown"></div>
                    </div>

                    <div class="space-y-7">
                        <div
                            v-for="(item, index) in ultimosCinco"
                            :key="index"
                            class="flex">
                            <div
                                class="shrink-0 ltr:mr-2 rtl:ml-2 relative z-10 before:w-[2px] before:h-[calc(100%-24px)] before:bg-white-dark/30 before:absolute before:top-10 before:left-4">
                                <div
                                    class="bg-success shadow-success w-8 h-8 rounded-full flex items-center justify-center text-white">
                                    <svg
                                        class="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                            stroke="currentColor"
                                            stroke-width="1.5" />
                                        <path
                                            d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h5 class="font-semibold dark:text-white-light">
                                    Médico ID: {{ item.medico_id }}
                                    <br />
                                    Descrição: {{ item.descricao }}
                                    <br />
                                    Valor desconto:
                                    {{ item.valor_desconto }}
                                    <br />
                                    Data: {{ item.data }}
                                </h5>
                                <p class="text-white-dark text-xs">
                                    {{
                                        new Date(item.data).toLocaleDateString()
                                    }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
