<script>
import ApiConnection from "../../api/Api";

export default {
    name: "SelectProfissional",
    data() {
        return {
            request: new ApiConnection(),
            selectedProfessional: "",
            profissionais: [],
        };
    },
    async created() {
        if (
            localStorage.getItem("secretary.id") &&
            localStorage.getItem("secretary.id") != "null"
        ) {
            try {
                let response = await this.request.pegarDadosApi(
                    `/medico/clinica/secretaria/${localStorage.getItem(
                        "secretary.id",
                    )}`,
                );

                if (response.status) {
                    this.profissionais = response.list;
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            this.profissionais = [
                {
                    medico_id: localStorage.getItem("doctor.id"),
                    nome: localStorage.getItem("user.name"),
                },
            ];
        }
    },
    methods: {
        updateSelectedProfessional() {
            this.$emit("update:modelValue", this.selectedProfessional);
        },
    },
};
</script>

<template>
    <div class="flex justify-center">
        <div class="w-1/2">
            <select
                v-model="selectedProfessional"
                class="form-select mb-6"
                @change="updateSelectedProfessional">
                <option disabled value="">Selecione um profissional</option>
                <option
                    v-for="profissional in profissionais"
                    :key="profissional.medico_id"
                    :value="profissional.medico_id">
                    {{ profissional.nome }}
                </option>
            </select>
        </div>
    </div>
</template>
