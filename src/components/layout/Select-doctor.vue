<template>
    <div>
        <select v-model="selectedProfessional" class="form-select mb-4" @change="updateSelectedProfessional">
            <option disabled value="">Selecione um profissional</option>
            <option v-for="profissional in profissionais" :key="profissional.usuario_id" :value="profissional.usuario_id">
                {{ profissional.nome }}
            </option>
        </select>
    </div>
</template>

<script>
import { inject } from "vue";

export default {
    name: "SelectProfissional",
    data() {
        return {
            request: Object(inject("api")),
            selectedProfessional: "",
            profissionais: [],
            secretariaId: "1",
        };
    },
    async created() {
        try {
            this.profissionais = await this.request.pegarDadosApi(`/medico/clinica/secretaria/${this.secretariaId}`);
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        updateSelectedProfessional() {
            this.$emit("update:modelValue", this.selectedProfessional);
        },
    },
};
</script>
