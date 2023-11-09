<script>

    import ValidacaoInput from '../../helpers/ValidacaoInput';
    import Response from '../../helpers/Response';
    import { inject } from 'vue';

    export default {
        data(){
            return{
                // Api
                request: Object(inject('api')),
                clinicaFormData:{
                    nome: "",
                    especialidade_id: "0"
                },
                clinicaEnderecoFormData:{
                    cep: "",
                    rua: "",
                    bairro: "",
                    cidade: "0",
                    estado: "0",
                    tipo: "0",
                    numero: "",
                    complemento: "",
                    clinica_id: "0"
                },
                estados:{},
                tipoEndereco: {},
                cidades:{},
                especialidades:{},
                //classes
                classeInputs:{
                    'p-3': true,
                    'h-10': true,
                    'w-1/2': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'shadow-sm': true,
                    'focus:outline-none': true,
                    'dark:text-slate-400': true,
                    'dark:bg-slate-800': true,
                    "dark:border-0": true
                },
                classeSelect:{
                    'w-1/2': true,
                    'p-3': true,
                    'rounded-md': true,
                    'border border-zinc-200': true,
                    'bg-slate-50': true,
                    'shadow-sm': true,
                    'dark:text-slate-400': true,
                    'dark:bg-slate-800': true,
                    "dark:border-0": true
                }
            }
        },
        methods:{

            async cadastrarClinica(){
                // validar campos
                if(ValidacaoInput.inputVazio(this.clinicaFormData)['status'] == false || ValidacaoInput.inputVazio(this.clinicaEnderecoFormData)['status'] == false){
                    return Response.mensagemErro('Campos naos podem estar vazios')
                }

                // sanitizar
                this.clinicaEnderecoFormData['cep'] = this.clinicaEnderecoFormData['cep'].replaceAll('-', '')
                
                this.request.enviarDadosApi('/medico/clinica', this.clinicaFormData).then( (res) => {
                    if(res.status == true){
                        // console.log(res)
                        // adiciona o id que foi criado pela clinica
                        this.clinicaEnderecoFormData['clinica_id'] = res.list.id
                        this.clinicaEnderecoFormData['cidade'] = this.clinicaEnderecoFormData['cidade'].toString()

                        this.request.enviarDadosApi('medico/clinica/endereco', this.clinicaEnderecoFormData).then(res => {
                            console.log(res)

                            if(res.status == false){

                                return Response.mensagemErro(res.message)
                            }else{

                                return Response.mensagemSucesso(res.message)
                            }
                        })
                    }else{
                        return Response.mensagemErro(res.message)
                    }
                })
            }


        },
        watch:{
            async 'clinicaEnderecoFormData.estado'(novo){
                this.cidades = await this.request.pegarDadosApi(`/cidade/${novo}`)
            }
        },
        async created(){

            this.estados = await this.request.pegarDadosApi('/unidades_federativas')
            this.tipoEndereco = await this.request.pegarDadosApi('/endereco/tipo')
            this.especialidades = await this.request.pegarDadosApi('/medico/especialidade/1')    
        }


    }
</script>

<template>

    <div class="grid space-y-6 grid-cols-1 items-center">  
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4">{{ $t("Clinic") }}</h1>
        </div>       
        <!-- HEADER -->


        <!-- FORMULARIO -->
        <div class="flex flex-col items-center gap-5 mt-4  ">

            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: Nome da clinica" v-model="clinicaFormData.nome" />
            <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

            <input v-bind:class="classeInputs" v-mask="'#####-###'" type="text" placeholder="Ex.: 87560-000" v-on:input="$event => clinicaEnderecoFormData.cep = $event.target.value" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: Rua" v-model="clinicaEnderecoFormData.rua" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: bairro" v-model="clinicaEnderecoFormData.bairro" />

            <select v-bind:class="classeSelect" v-model="clinicaFormData.especialidade_id" >
                <option value="0" disabled selected>Selecione a especialidade</option>
                <option v-for="esspecialidade in especialidades" :value="// @ts-expect-error
                                                        esspecialidade.id">
                    {{ 
                        // @ts-expect-error
                        esspecialidade.descricao
                    }}
                </option>
            </select>

            <select v-bind:class="classeSelect" v-model="clinicaEnderecoFormData.estado" >
                <option value="0" disabled selected>Selecione o estado</option>
                <option v-for="estado in estados" :value="// @ts-expect-error
                                                        estado.uf">
                    {{ 
                        // @ts-expect-error
                        estado.nome 
                    }}
                </option>
            </select>

            <select v-bind:class="classeSelect" v-model="clinicaEnderecoFormData.cidade" >
                <option value="0" disabled selected>Selecione a cidade</option>
                <option v-for="cidade in cidades" :value="// @ts-expect-error
                                                        cidade.id">
                    {{ 
                        // @ts-expect-error
                        cidade.nome 
                    }}
                </option>
            </select>
            

            <select v-bind:class="classeSelect" v-model="clinicaEnderecoFormData.tipo" >
                <option value="0" disabled selected>Selecione o tipo de enreço</option>
                <option v-for="tipo in tipoEndereco" :value="// @ts-expect-error
                                                    tipo.id">
                    {{ 
                        // @ts-expect-error
                        tipo.descricao 
                    }}
                </option>
            </select>

            <input v-bind:class="classeInputs" v-mask="'#####'" type="text" placeholder="Ex.: numero" v-model="clinicaEnderecoFormData.numero" />
            <input v-bind:class="classeInputs" type="text" placeholder="Ex.: complemento" v-model="clinicaEnderecoFormData.complemento" />

        </div>

        <hr class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700">

        <div class="flex flex-col items-center font-semibold mt-6">
            <button @click="cadastrarClinica()" class="btn btn-primary w-80" >Cadastrar</button>
        </div>
        <!-- FORMULARIO -->
    </div>
</template>