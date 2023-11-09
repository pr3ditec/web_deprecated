<!-- vuejs rodando em optionsjs -->
<script lang="ts">

    import ValidacaoInput from '../../helpers/ValidacaoInput';
    import Response from '../../helpers/Response'
    import { inject } from 'vue';
import Vincular from './vincular.vue';

    export default {
    data() {
        return {
            // helpers
            addRelacao: false,
            // ApiConnection
            request: Object(inject("api")),
            // Formulario para castro
            secretariaFormData: {
                nome: "",
                cpf: "",
                email: "",
                password: "",
                nome_mae: "",
                nascimento: "",
                nacionalidade_id: "0",
                sexo: "0"
            },
            vinculoMedico: {
                status: false,
                valor: 0,
            },
            vinculoClinica: {
                status: false,
                valor: 0
            },
            nacionalidade: {
                id: "",
                descricao: "",
                created_at: "",
                updated_at: ""
            },
            // Classes css
            classeInputs: {
                "p-3": true,
                "h-10": true,
                "w-1/2": true,
                "rounded-md": true,
                "border border-zinc-200": true,
                "shadow-sm": true,
                "focus:outline-none": true,
                "dark:text-slate-400": true,
                "dark:bg-slate-800": true,
                "dark:border-0": true
            },
            classePassword: {
                "p-3": true,
                "h-10": true,
                "w-1/2": true,
                "rounded-md": true,
                "border border-zinc-200": true,
                "border border-red-600": false,
                "shadow-sm": true,
                "focus:outline-none": true,
                "dark:text-slate-400": true,
                "dark:bg-slate-800": true,
                "dark:border-0": true
            },
            classeInputsRow: {
                "p-3": true,
                "h-10": true,
                "w-1/2": true,
                "rounded-md": true,
                "border border-zinc-200": true,
                "shadow-sm": true,
                "focus:outline-none": true,
                "dark:text-slate-400": true,
                "dark:bg-slate-800": true,
                "dark:border-0": true
            },
            classeSelect: {
                "w-1/2": true,
                "p-3": true,
                "rounded-md": true,
                "border border-zinc-200": true,
                "bg-slate-50": true,
                "shadow-sm": true,
                "dark:text-slate-400": true,
                "dark:bg-slate-800": true,
                "dark:border-0": true
            }
        };
    },
    methods: {
        compararSenhas(entrada: any) {
            if (this.secretariaFormData.password == entrada.target.value) {
                this.classePassword["border border-zinc-200"] = true;
                this.classePassword["border border-red-600"] = false;
                return;
            }
            this.classePassword["border border-zinc-200"] = false;
            this.classePassword["border border-red-600"] = true;
        },
        async cadastrarSecretaria() {
            // testa os campos vazios
            if (ValidacaoInput.inputVazio(this.secretariaFormData)["status"] == false) {
                return Response.mensagemErro("Campos não podem estar vazios");
            }
            // testa se o email ter formato valido
            if (ValidacaoInput.email(this.secretariaFormData.email)["status"] == false) {
                return Response.mensagemErro("tipo de email invalido");
            }
            // testa se as senhas correspondem
            if (this.classePassword["border border-red-600"] == true) {
                return Response.mensagemErro("senhas não correspondem");
            }
            // limpando cpf
            this.secretariaFormData["cpf"] = this.secretariaFormData["cpf"].replaceAll(".", "").replaceAll("-", "");
            // salvando dados da secretaria
            await this.request.enviarDadosApi("medico/clinica/secretaria", this.secretariaFormData).then((res) => {
                if (res.status == false) {
                    return Response.mensagemErro(res.message);
                }
                else {

                    if(this.vinculoMedico['status'] && this.vinculoMedico['valor'] != 0){
                        this.request.enviarDadosApi('/secretaria/medico', {
                            "secretataria_id": res.list[1].id
                        })
                    }
                    if(this.vinculoClinica['status'] && this.vinculoClinica['valor'] != 0){
                        this.request.enviarDadosApi('/secretaria/medico', {
                            "secretataria_id": res.list[1].id,
                            "clinica_id": this.vinculoClinica['valor']
                        })
                    }

                    return Response.mensagemSucesso(res.message);
                }
            });
        },

        /** EVENTOS DE COMPONENTE */
        // medico
        medicoStatusEmit(status:any){
            this.vinculoMedico['status'] = status
        },
        medicoValorEmit(valor:any){
            this.vinculoMedico['valor'] = valor
        },
        // clinica
        clinicaStatusEmit(status:any){
            this.vinculoClinica['status'] = status
        },
        clinicaValorEmit(valor:any){
            this.vinculoClinica['valor'] = valor
        }
    },
    mounted() {
        this.secretariaFormData["medico_id"] = "1";
    },
    // HOOK CREATED
    async created() {
        // pega as nacionalidades para colocar no select
        this.nacionalidade = await this.request.pegarDadosApi("/nacionalidade");
    },
    components: { Vincular }
}
</script>

<template>

    <div class="grid space-y-6 grid-cols-1 items-center">  
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4">{{ $t('Secretary') }}</h1>
        </div>       
        <!-- HEADER -->


        <!-- FORMULARIO -->
        <div class="flex flex-col items-center gap-5 mt-4">

            <div class="flex flex-row gap-1 w-1/2">
                <input v-bind:class="classeInputsRow" type="text" placeholder="Ex.: Nome completo" v-model="secretariaFormData.nome" />
                <input v-bind:class="classeInputsRow" type="text" placeholder="Ex.: Nome da Mae" v-model="secretariaFormData.nome_mae" />
            </div>

            <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">
            
            <input v-bind:class="classeInputs" v-mask="'###.###.###-##'" type="text" placeholder="Ex.: 000.000.000-00" v-on:input="$event => {
                //@ts-expect-error
                secretariaFormData.cpf = $event.target.value 
            }" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: secretaria@sauvi.com" v-model="secretariaFormData.email" />
            <input v-bind:class="classeInputs" v-mask="'##/##/####'" type="text" placeholder="Ex.: 00/00/0000" v-model="secretariaFormData.nascimento" />

            <select v-bind:class="classeSelect" v-model="secretariaFormData.sexo">
                <option value="0" disabled selected>Selecione o sexo</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
                <option value="X">Outro</option>
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
            
            <Vincular @medicoStatus="medicoStatusEmit" @medicoValor="medicoValorEmit" 
                        @clinicaValor="clinicaValorEmit" @clinicaStatus="clinicaStatusEmit" />

        </div>


        <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

        <div class="flex flex-col items-center font-semibold mt-6">
            <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria()" @click="cadastrarSecretaria()">Cadastrar</button>
        </div>
        <!-- FORMULARIO -->


    </div>
</template>