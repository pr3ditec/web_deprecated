<!-- vuejs rodando em optionsjs -->
<script lang="ts">

    import ValidacaoInput from '../../helpers/ValidacaoInput';

    export default {
        data(){
            return{
                // helpers
                addRelacao: false,
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
                // Classes
                classeInputs:{
                    'p-3': true,
                    'h-10': true,
                    'w-1/2': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
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
            async cadasrarSecretaria(){
                    
                console.log(this.secretariaFormData)
            }
        },
        mounted(){

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

            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: 000.000.000-00" v-model="secretariaFormData.cpf" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: secretaria@sauvi.com" v-model="secretariaFormData.email" />
            <input v-bind:class="classeInputs" type="date" placeholder="Ex.: 00/00/0000" v-model="secretariaFormData.nascimento" />

            <select v-bind:class="classeSelect" v-model="secretariaFormData.sexo">
                <option value="0" disabled selected>Selecione o sexo</option>
                <option value="1">M</option>
                <option value="2">F</option>
                <option value="3">U</option>
            </select>

            <select v-bind:class="classeSelect" v-model="secretariaFormData.nacionalidade_id">
                <option value="0" disabled selected>Selecione a nacionalidade</option>
                <option value="1">BR</option>
                <option value="1">ES</option>
            </select>

            <input v-bind:class="classeInputs" type="password" placeholder="Ex.: senha" v-model="secretariaFormData.password" />
            <input v-bind:class="classeInputs" type="password" placeholder="Ex.: repetir a senha" />
            
            <input class="checkbox" type="checkbox" v-model="addRelacao" />
            <Transition>
                <select v-bind:class="classeSelect" v-model="secretariaFormData.nacionalidade_id" v-show="addRelacao">
                    <option value="0" disabled selected>Selecione a nacionalidade</option>
                    <option value="1">ES</option>
                </select>
            </Transition>
        </div>
        <!-- Vinculo -->

        <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

        <div class="flex flex-col items-center font-semibold mt-6">
            <button class="btn btn-primary w-80" @click="cadasrarSecretaria">Cadastrar</button>
        </div>
        <!-- FORMULARIO -->


        <!-- FOOTER -->
        <!-- <div class="col-3 bg-slate-200">3</div> -->
        <!-- FOOTER -->
    </div>
</template>


<!--             'nome' => 'required',
            'cpf' => 'required|max:14',
            'email' => 'email',
            'password' => 'required|min:8',
            'nome_mae' => 'required',
            'nascimento' => 'required|date_format:d/m/Y',
            'nacionalidade_id' => 'required|exists:nacionalidade,id',
            'clinica_id' => 'integer|exists:clinica.clinica,id',
            "sexo" => "required|max:1", -->
