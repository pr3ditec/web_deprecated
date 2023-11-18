<template>
    <div>
        <select v-model="selectedProfessional" class="form-select mb-4" @change="updateSelectedProfessional">
            <option disabled value="">Selecione um profissional</option>
            <option
                v-for="profissional in profissionais"
                :key="profissional.usuario_id"
                :value="profissional.usuario_id"
            >
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
        };
    },
    async created() {
        if (localStorage.getItem("secretary.id") && localStorage.getItem("secretary.id") != "null") {
            try {
                this.profissionais = await this.request.pegarDadosApi(
                    `/medico/clinica/secretaria/${localStorage.getItem("secretary.id")}`,
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            this.profissionais = [
                {
                    usuario_id: localStorage.getItem("doctor.id"),
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
