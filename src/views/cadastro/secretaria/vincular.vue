<script>

import { inject } from 'vue';

export default{
    data(){
        return{
            request: Object(inject('api')),
            // secretaroas
            secretaria_id: 0,
            secretarias:{},
            // medico
            medico_id: 0,
            medicos:{},
            // clinica
            clinica_id: 0,
            clinicas:{}
        }
    },
    methods:{
        vincularClinica(){
            this.request.enviarDadosApi('/secretaria/medico',{
                "clinica_id": this.clinica_id,
                "secretaria_d": "",
                "ativo": "1"
            })
        },  
        vincularMedico(){
            this.request.enviarDadosApi('/secretaria/medico',{
                "medico_id": this.medico_id,
                "secretaria_d": '',
                "ativo": "1"
            })
        }
    },
    async created(){

        this.secretarias = []
        this.medicos = await this.request.pegarDadosApi('/medico')
        this.clinicas = await this.request.pegarDadosApi('/medico/clinica/1') // colocar o id do usuario
    }

}

</script>
<template>

    <div class="flex flex-col items-center gap-5 mt-4 w-full">

        <!-- secretarias -->
        <div class="flex flex-col gap-2 w-full pl-6">
            <h1 class="text-lg">Vincular secretaria com médicos</h1>
            <hr>
            <div class="flex flex-row w-full justify-center p-6">
                <select class="form-select" @change="secretaria_id = $event.target.value">
                    <option value="0" disabled selected>Selecione o medico</option>
                    <option v-for="secretaria in secretarias" :value="secretaria.medico_id">
                        {{ secretaria.nome }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col items-center font-semibold mt-2">
                <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria" @click="vincularMedico" :disabled="medico_id == 0">Vincular com medico</button>
            </div>

        </div>

        <!-- Vincular com medicos -->
        <div class="flex flex-col gap-2 w-full pl-6">
            <h1 class="text-lg">Vincular secretaria com médicos</h1>
            <hr>
            <div class="flex flex-row w-full justify-center p-6">
                <select class="form-select" @change="medico_id = $event.target.value">
                    <option value="0" disabled selected>Selecione o medico</option>
                    <option v-for="medico in medicos" :value="medico.medico_id">
                        {{ medico.nome }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col items-center font-semibold mt-2">
                <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria" @click="vincularMedico" :disabled="medico_id == 0">Vincular com medico</button>
            </div>

        </div>

        <!-- Vincular com clinicas -->
        <div class="flex flex-col gap-2 w-full pl-6">
            <h1 class="text-lg">Vincular secretaria com médicos</h1>
            <hr>
            <div class="flex flex-row w-full justify-center p-6">
                <hr>
                <select class="form-select" @change="clinica_id = $event.target.value">
                    <option value="0" disabled selected>Selecione a clinica</option>
                    <option v-for="clinica in clinicas" :value="clinica.id">
                        {{ clinica.nome }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col items-center font-semibold mt-2">
                <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria" @click="vincularClinica" :disabled="clinica_id == 0">Vincular com clinica</button>
            </div>
        
        </div>

    </div>

</template>