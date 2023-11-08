<template>
    <div>
        <select v-model="selectedProfessional" class="form-select mb-4" @change="updateSelectedProfessional">
            <option disabled value="">Selecione um profissional</option>
            <option v-for="profissional in profissionais" :key="profissional.usuario_id">
                {{ profissional.nome }}
            </option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SelectProfissional',
    data() {
        return {
            selectedProfessional: '',
            profissionais: [],
            token: '15a7afa7c8c3311e65818d11fa1c9ce5',
            secretariaId: 1
        };
    },
    methods: {
        getApiUrl(route) {
            return `http://localhost:8001/${route}`;
        },
        updateSelectedProfessional() {
            console.log(this.selectedProfessional);
            this.$emit('update:modelValue', this.selectedProfessional);
        }
    },
    mounted() {
        const apiUrl = this.getApiUrl(`medico/clinica/secretaria/${this.secretariaId}`);
        axios.get(apiUrl, {
            headers: {
                'Authorization':`${this.token}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.data.status) {
                this.profissionais = response.data.list;
            } else {
                console.error(response.data.message);
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
};
</script>
