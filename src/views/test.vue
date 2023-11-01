<template>
    <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
            <a href="javascript:;" class="text-primary hover:underline">Test</a>
        </li>
    </ul>

    <div class="mt-5">
        <select v-model="selectedUnidadesFederativas" class="form-select">
            <option value="">Selecione...</option>
            <option v-for="estado in estados" :value="estado.id">{{ estado.nome }} - {{ estado.uf }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedUnidadesFederativas: '',
            estados: [],
        };
    },
    mounted() {
        // Faça a requisição Ajax para obter os usuários
        axios.get('http://localhost:8001/unidades_federativas')
            .then((response) => {
                this.estados = response.data.list;
                console.log(this.estados);
            })
            .catch((error) => {
                console.error('Erro ao obter dados:', error);
            });
    },
};
</script>
