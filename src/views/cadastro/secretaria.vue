<!-- vuejs rodando em optionsjs -->
<script lang="ts">

    import { inject } from 'vue';
    import ValidacaoInput from '../../helpers/ValidacaoInput';

    export default {
        data(){
            return{
                // helpers
                addRelacao: false,
                // classe de requsicoes axios
                request: Object(inject('api')),
                // Formulario para castro
                secretariaFormData: {
                    nome: '',
                    cpf: '',
                    email: '', // not required
                    password: '',
                    nome_mae: '',
                    nascimento: '',
                    nacionalidade_id: '0',
                    clinica_id: '0', //not required
                    sexo: '0'
                    
                },
                nacionalidade:{
                    id: "",
                    descricao: "",
                    created_at: "",
                    updated_at: ""
                },

                // Classes css
                classeInputs:{
                    'p-3': true,
                    'h-10': true,
                    'w-1/2': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'shadow-sm': true,
                    'focus:outline-none': true
                },
                classePassword:{
                    'p-3': true,
                    'h-10': true,
                    'w-1/2': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'border border-red-600': false,
                    'shadow-sm': true,
                    'focus:outline-none': true
                },
                classeInputsRow:{
                    'p-3': true,
                    'h-10': true,
                    'w-1/2': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'shadow-sm': true,
                    'focus:outline-none': true
                },
                classeSelect:{
                    'w-1/2': true,
                    'p-3': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'bg-slate-50': true,
                    'shadow-sm': true
                }
            }
        },
        methods:{
            compararSenhas(entrada){
                if(this.secretariaFormData.password == entrada.target.value){

                    this.classePassword['border border-zinc-200'] = true
                    this.classePassword['border border-red-600'] = false
                    return 
                }   

                this.classePassword['border border-zinc-200'] = false
                this.classePassword['border border-red-600'] = true
            },
            async cadastrarSecretaria(){
                if(!ValidacaoInput.email(this.secretariaFormData.email)){
                    return
                }
                console.log(this.secretariaFormData)
            }
        },
        async created(){
            this.nacionalidade = await this.request.pegarDadosApi('/nacionalidade')
        }
    }
</script>

<template>
    <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
            <a href="javascript:;" class="text-primary hover:underline">Dashboard</a>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Cadastro</span>
        </li>
    </ul>

    <div class="grid space-y-6 grid-cols-1 items-center">  
        <!-- HEADER -->
        <div class="flex flex-row justify-center pt-6 pb-6">
            <h1 class="uppercase font-bold text-2xl underline-offset-5">secretária</h1>
        </div>        
        <!-- HEADER -->


        <!-- FORMULARIO -->
        <div class="flex flex-col items-center gap-5 mt-4  ">

            <div class="flex flex-row gap-1 w-1/2">
                <input v-bind:class="classeInputsRow" type="text" placeholder="Ex.: Nome completo" v-model="secretariaFormData.nome" />
                <input v-bind:class="classeInputsRow" type="text" placeholder="Ex.: Nome da Mae" v-model="secretariaFormData.nome_mae" />
            </div>

            <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

            <input v-bind:class="classeInputs" v-maska data-maska="###" type="text" placeholder="Ex.: 000.000.000-00" v-model="secretariaFormData.cpf" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: secretaria@sauvi.com" v-model="secretariaFormData.email" />
            <input v-bind:class="classeInputs" type="date" placeholder="Ex.: 00/00/0000" v-model="secretariaFormData.nascimento" />

            <select v-bind:class="classeSelect" v-model="secretariaFormData.sexo">
                <option value="0" disabled selected>Selecione o sexo</option>
                <option value="M">M</option>
                <option value="F">F</option>
                <option value="X">U</option>
            </select>

            <select v-bind:class="classeSelect" v-model="secretariaFormData.nacionalidade_id">
                <option value="0" disabled selected>Selecione a nacionalidade</option>
                <option v-for="nac in nacionalidade" :value="// @ts-expect-error
                                                                                nac.id">
                    {{ 
                        // @ts-expect-error
                        nac.descricao 
                    }}
                </option>
            </select>

            <!-- senhas -->
            <input v-bind:class="classeInputs" type="password" placeholder="Ex.: senha" v-model="secretariaFormData.password" />
            <input v-bind:class="classePassword" v-on:keyup="$event => compararSenhas($event)" type="password" placeholder="Ex.: repetir a senha" />
            <span class="flex flex-col items-start text-danger text-xs align-start mt-0 pt-0" v-show="classePassword['border border-red-600']">Senhas nao correspondem</span>

            <!-- <input class="checkbox" type="checkbox" v-model="addRelacao" />
            <Transition>
                <select v-bind:class="classeSelect" v-model="secretariaFormData.nacionalidade_id" v-show="addRelacao">
                    <option value="0" disabled selected>Selecione a nacionalidade</option>
                    <option value="1">ES</option>
                </select>
            </Transition> -->
        </div>
        <!-- Vinculo -->

        <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

        <div class="flex flex-col items-center font-semibold mt-6">
            <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria()" @click="cadastrarSecretaria()">Cadastrar</button>
        </div>
        <!-- FORMULARIO -->


    </div>
</template>

