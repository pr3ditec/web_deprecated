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
    <div class="mb-5" v-if="selectedDoctor">
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
                        <tr v-for="item in list" :key="item.medico_id">
                            <td>{{ item.medico_id }}</td>
                            <td>{{ item.recebimento_medico }}</td>
                            <td>
                                <span
                                    class="badge whitespace-nowrap bg-secondary"
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

    <div v-if="selectedDoctor">
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
                        <tr v-for="item in list2" :key="item.medico_id">
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
</template>
