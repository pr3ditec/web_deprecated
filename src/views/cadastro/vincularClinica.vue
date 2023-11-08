<script>
    import { inject } from 'vue';


    export default{
        data(){
            return{
                // Api requsts
                request: Object(inject('api')),
                addClinica: false,
                addMedico: false,
                clinicas: {
                    id: 0
                },
                medicos:{
                    id: 0
                },
                classeSelect: {
                    "w-1/2": true,
                    "p-3": true,
                    "rounded-md": true,
                    "border border-zinc-200": true,
                    "bg-slate-50": true,
                    "shadow-sm": true
                }
            }
        },

        async created(){

            this.medicos = await this.request.pegarDadosApi('/medico')
            this.clinicas = await this.request.pegarDadosApi('/clinicas')
        }
    }


</script>

<template>

    <div class="flex flex-row gap-2">
        <button @click="addClinica = !addClinica" class="btn bg-emerald-500 text-white">Vincular com clínica</button>
        <button @click="addMedico = !addMedico" class="btn bg-indigo-500  text-white ">Vincular com medico</button>
    </div>

    <div class="flex flex-col w-full items-center gap-4">
        <Transition>
            <div class="flex flex-row w-1/2 justify-center" v-show="addClinica">
                <select v-bind:class="classeSelect" v-model="clinicas.id" >
                    <option value="0" disabled selected>Selecione a clinica</option>
                    <option v-for="clinica in clinicas" :value="clinica.id">
                        {{ clinica.nome }}
                    </option>
                </select>
                <button class="btn btn-success">criar vinculo</button>
            </div>
        </Transition>
        
        <Transition>
            <div class="flex flex-row w-1/2 justify-center" v-show="addMedico">
                <select v-bind:class="classeSelect" v-model="clinicas.id">
                    <option value="0" disabled selected>Selecione o medico</option>
                    <option v-for="medico in medicos" :value="medico.id">
                        {{ medico.nome }}
                    </option>
                </select>
                <button class="btn btn-primary">criar vinculo</button>
            </div>
        </Transition>
    </div>
</template>