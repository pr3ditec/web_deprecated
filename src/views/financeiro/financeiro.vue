<script>
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import ApiConnection from "../../api/Api";

export default {
    components: {
        SelectMedico,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectedDoctor: null,
            list: [],
        };
    },
    watch: {
        selectedDoctor: {
            immediate: true,
            handler(newDoctor) {
                if (newDoctor) {
                    this.fetchDoctorAvailability(newDoctor);
                }
            },
        },
    },
    methods: {
        async fetchDoctorAvailability(doctorId) {
            try {
                const response = await this.request.pegarDadosApi(
                    `/financeiro/medico/${doctorId}`,
                );

                console.log(response);

                if (response.status) {
                    this.list = response.list;
                } else {
                    console.error(
                        "A resposta da API não é um objeto: ",
                        response,
                    );
                }
            } catch (error) {
                console.error("Erro ao buscar financeiro do médico: ", error);
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" :key="item.medico_id">
                            <td>{{ item.medico_id }}</td>
                            <td>{{ item.recebimento_medico }}</td>
                            <td>
                                <span
                                    class="badge whitespace-nowrap"
                                    :class="{
                                        'bg-success':
                                            item.descricao === 'EFETIVADO',
                                        'bg-secondary':
                                            item.descricao === 'PROVISIONADO',
                                    }"
                                    >{{ item.descricao }}</span
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
