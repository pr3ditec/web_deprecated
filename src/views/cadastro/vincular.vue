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
        methods:{
            vincularMedico(id){
                this.$emit('medicoValor',id)
            },
            vincularClinica(id){
                this.$emit('clinicaValor', id)
            },
            ativarVinculoMedico(){
                this.addMedico = !this.addMedico
                this.$emit('medicoStatus',this.addMedico)
            },
            ativarVinculoClinica(){
                this.addClinica = !this.addClinica
                this.$emit('clinicaStatus', this.addClinica)
            }
        },  
        async created(){

            this.medicos = await this.request.pegarDadosApi('/medico')
            this.clinicas = await this.request.pegarDadosApi('/medico/clinica/1') // colocar o id do usuario
        }
    }


</script>

<template>

    <div class="flex flex-row gap-2">
        <button @click="ativarVinculoClinica" class="btn bg-emerald-500 text-white">Vincular com clínica</button>
        <button @click="ativarVinculoMedico" class="btn bg-indigo-500  text-white ">Vincular com medico</button>
    </div>

    <div class="flex flex-col w-full items-center gap-4">
        <Transition>
            <div class="flex flex-row w-1/2 justify-center" v-show="addClinica">
                <select v-bind:class="classeSelect" @change="vincularClinica($event.target.value)">
                    <option value="0" disabled selected>Selecione a clinica</option>
                    <option v-for="clinica in clinicas" :value="clinica.id">
                        {{ clinica.nome }}
                    </option>
                </select>
            </div>
        </Transition>
        
        <Transition>
            <div class="flex flex-row w-1/2 justify-center" v-show="addMedico">
                <select v-bind:class="classeSelect" @change="vincularMedico($event.target.value)">
                    <option value="0" disabled selected>Selecione o medico</option>
                    <option v-for="medico in medicos" :value="medico.medico_id">
                        {{ medico.nome }}
                    </option>
                </select>
            </div>
        </Transition>
    </div>
</template>