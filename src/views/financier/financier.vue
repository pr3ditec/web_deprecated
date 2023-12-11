<script>
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import ApiConnection from "../../api/Api";
import Swal from "sweetalert2";

export default {
    components: {
        SelectMedico,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectedDoctor: null,
            list: [],
            list2: [],
            totalEfetivado: 0,
            totalProvisionado: 0,
            totalEfetivadoMesAtual: 0,
            totalEfetivadoSemanaAtual: 0,
            quantidadeEfetivadoMesAtual: 0,
            ultimosCinco: [],
            nameDoctor: "",
            formattedStartDate: 0,
            formattedEndDate: 0,
            startDate: new Date(
                new Date().setFullYear(new Date().getFullYear() - 1),
            ),
            endDate: new Date(),
        };
    },
    methods: {
        async fetchDoctorAvailability(doctorId) {
            // Primeira chamada de API
            let response1 = await this.request.pegarDadosApi(
                `/financeiro/medico/${doctorId}`,
            );

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

                let efetivadoIds = response1.list
                    .filter((item) => item.descricao === "EFETIVADO")
                    .map((item) => item.pre_agendamento_id);

                this.totalProvisionado = response1.list
                    .filter(
                        (item) =>
                            item.descricao === "PROVISIONADO" &&
                            !efetivadoIds.includes(item.pre_agendamento_id),
                    )
                    .reduce(
                        (total, item) =>
                            total + parseFloat(item.valor_desconto),
                        0,
                    );

                let dataAtual = new Date();
                this.totalEfetivadoMesAtual = response1.list
                    .filter((item) => {
                        let dataItem = new Date(item.created_at);
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
                        let dataItem = new Date(item.created_at);
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

                this.quantidadeEfetivadoMesAtual = response1.list.filter(
                    (item) => {
                        let dataItem = new Date(item.created_at);
                        return (
                            item.descricao === "EFETIVADO" &&
                            dataItem.getMonth() === dataAtual.getMonth()
                        );
                    },
                ).length;

                this.ultimosCinco = response1.list.slice(-5);
            } else {
                let menssage = this.$t(response1.messageCode);
                this.showMessage(menssage, "error");
                console.error(response1.messageCode);
            }

            // Segunda chamada de API
            this.formattedStartDate = this.startDate
                .toISOString()
                .split("T")[0];
            this.formattedEndDate = this.endDate.toISOString().split("T")[0];

            let response2 = await this.request.pegarDadosApi(
                `/financeiro/medico/${doctorId}/${this.formattedStartDate}/${this.formattedEndDate}`,
            );

            if (response2.status) {
                this.list2 = response2.list;
            } else {
                let menssage = this.$t(response1.messageCode);
                this.showMessage(menssage, "error");
                console.error(response2.messageCode);
            }
        },

        generateReport() {
            if (this.selectedDoctor && this.startDate && this.endDate) {
                this.fetchDoctorAvailability(this.selectedDoctor);
            } else {
                console.error(
                    "Por favor, selecione um médico e as datas antes de gerar o relatório.",
                );
            }
        },

        showMessage(msg = "", type = "success") {
            const toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    container: "toast",
                },
            });
            toast.fire({
                icon: type,
                title: msg,
                padding: "10px 20px",
            });
        },

        formatValor(valor) {
            return valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        },

        formatDate(data) {
            return new Date(data).toLocaleDateString("pt-BR");
        },

        handleSelectedProfessionalName(name) {
            this.nameDoctor = name;
        },
    },
};
</script>

<template>
    <div class="row mt-5 p-4">
        <SelectMedico
            v-model="selectedDoctor"
            @change="generateReport"
            @selectedProfessionalName="handleSelectedProfessionalName" />
    </div>

    <div v-if="selectedDoctor && totalEfetivado">
        <div class="pt-5">
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div class="panel h-full sm:col-span-2 lg:col-span-1">
                    <div
                        class="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 class="font-semibold text-lg">
                            {{ $t("statistics") }}
                        </h5>
                    </div>
                    <div
                        class="grid sm:grid-cols-2 gap-8 text-sm text-[#515365] font-bold dark:text-white">
                        <div>
                            <div>
                                <div>{{ $t("totalReceived") }}</div>
                                <div class="text-[#f8538d] text-lg">
                                    {{ formatValor(totalEfetivado) }}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div>{{ $t("provisionedValues") }}</div>
                                <div class="text-[#f8538d] text-lg">
                                    {{ formatValor(totalProvisionado) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel h-full">
                    <div
                        class="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 class="font-semibold text-lg">
                            {{ $t("weeklyMonitoring") }}
                        </h5>
                        <div class="dropdown"></div>
                    </div>
                    <div class="text-[#e95f2b] text-3xl font-bold my-10">
                        <span class="ltr:mr-2 rtl:ml-2">{{
                            formatValor(totalEfetivadoSemanaAtual)
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
                        <h5 class="font-semibold text-lg">
                            {{ $t("monthlyTotal") }}
                        </h5>

                        <div class="relative text-xl whitespace-nowrap">
                            {{ formatValor(totalEfetivadoMesAtual) }}
                            <span
                                class="table text-[#d3d3d3] bg-[#4361ee] rounded p-1 text-xs mt-1 ltr:ml-auto rtl:mr-auto"
                                >+
                                {{ quantidadeEfetivadoMesAtual }}
                                {{ $t("receiptMonth") }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid lg:grid-cols-3 gap-6 mb-6">
                <div class="panel h-full p-0 lg:col-span-2">
                    <div
                        class="flex items-start justify-between dark:text-white mb-5 p-5 border-b border-[#e0e6ed] dark:border-[#1b2e4b]">
                        <h5 class="font-semibold text-lg">
                            {{ $t("amountsReceivedPeriod") }} <br />
                            <span class="text-sm text-gray-500 dark:text-white"
                                >{{ formatDate(formattedStartDate) }} -
                                {{ formatDate(formattedEndDate) }}</span
                            >
                        </h5>
                        <div class="dropdown"></div>
                    </div>
                    <div class="table-responsive">
                        <div class="shadow rounded-lg p-6 dark:text-white">
                            <table class="table-hover">
                                <thead>
                                    <tr>
                                        <th class="!text-center">
                                            ID {{ $t("doctor") }}
                                        </th>
                                        <th class="!text-left">
                                            {{ $t("name") }}
                                        </th>
                                        <th class="!text-center">
                                            {{ $t("description") }}
                                        </th>
                                        <th class="!text-right">
                                            {{ $t("value") }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="item in list2"
                                        :key="item.medico_id">
                                        <td class="!text-center">
                                            {{ item.medico_id }}
                                        </td>
                                        <td class="!text-left">
                                            {{ nameDoctor }}
                                        </td>
                                        <td class="!text-center">
                                            <span
                                                class="badge whitespace-nowrap bg-success"
                                                >{{ item.descricao }}</span
                                            >
                                        </td>
                                        <td class="!text-right">
                                            {{
                                                formatValor(item.valor_desconto)
                                            }}
                                        </td>
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
                            {{ $t("historyLatestReleases") }}
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
                                    v-if="item.descricao === 'EFETIVADO'"
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
                                <div
                                    v-else-if="
                                        item.descricao === 'PROVISIONADO'
                                    "
                                    class="bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white">
                                    <svg
                                        class="w-4 h-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M4 12.9L7.14286 16.5L15 7.5"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M20.0002 7.5625L11.4286 16.5625L11.0002 16"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h5 class="font-semibold dark:text-white-light">
                                    {{ $t("doctor") }} ID: {{ item.medico_id }}
                                    <br />
                                    {{ $t("description") }}:
                                    {{ item.descricao }}
                                    <br />
                                    {{ $t("valeu") }}:
                                    {{ formatValor(item.valor_desconto) }}
                                    <br />
                                </h5>
                                <p class="text-white-dark text-xs">
                                    {{
                                        new Date(
                                            item.created_at,
                                        ).toLocaleDateString()
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
