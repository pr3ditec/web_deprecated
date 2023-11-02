<template>
    <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
            <a href="javascript:;" class="text-primary hover:underline">Test</a>
        </li>
    </ul>

    <div class="mt-5">
        <select v-model="selectedUnidadesFederativas" class="form-select">
            <option value="">Selecione...</option>
            <option v-for="uf in unidadesFederativas" :value="uf.id">{{ uf.nome }} - {{ uf.uf }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            selectedUnidadesFederativas: '',
            unidadesFederativas: [],
        };
    },
    mounted() {
        // Faça a requisição Ajax para obter os usuários
        axios.get('http://localhost:8001/unidades_federativas')
            .then((response) => {
                this.unidadesFederativas = response.data.list;
                console.log(this.estados);
            })
            .catch((error) => {
                console.error('Erro ao obter dados:', error);
            });
    },
};
</script>
