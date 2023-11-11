<script>

import { inject } from 'vue'

export default {
    data() {
        return {
            // Api para fazer requests
            request: Object(inject('api')),
            // variaveis reativas
            encontrada: true,
            medico: {},
            clinicas: []
        }
    },
    methods: {

        async pesquisarMedico(cpf) {
            if(cpf.length == 14){
                cpf = cpf.replaceAll('.', '').replaceAll('-', '')
                await this.request.pegarDadosApi(`/medico/${cpf}`).then((res) => {
                    if (res.length === undefined) {
                        this.encontrada = true
                        this.medico = res
                    } else {
                        this.encontrada = false
                    }
                })
            }else{

            }
        },

        criarVinculo() {
            if (this.clinicas != false) {

                console.log('vinculo solicitado') // rota ainda nao implementada
            }
        }
    },
    async created() {

        this.clinicas = await this.request.pegarDadosApi('/medico/clinica/4/') // colocar id do medico
    }
}


</script>

<template>
    <div class="flex flex-col items-center gap-1 mt-4 w-1/2" v-on:keyup.enter="criarVinculo">

        <h1 class="text-3xl font-bold capitalize">{{ $t('join') }} {{ $t('clinic') }}</h1>
        <hr>
        <div class="w-full flex flex-col gap-0 p-6">
            <label class="capitalize">{{ $t('doctor') }}</label>
            <div class="flex flex-col w-full justify-center">

                <!-- bucas do meidico -->
                <input class="form-input" type="text" v-mask="'###.###.###-##'" placeholder="Digite o cpf ........"
                    v-on:keyup="$event => pesquisarMedico($event.target.value)" />
                    <span class="text-danger text-sm" v-show="!encontrada">medico não encontrado</span>
                <Transition>
                    <div class="w-full mt-2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                        v-show="clinicas.length != 0">
                        <div class="p-5 flex items-center flex-col sm:flex-row">
                            <div class="mb-5 w-20 h-20 rounded-full overflow-hidden">
                                <img src="/assets/images/profile-34.jpeg" alt="" class="w-full h-full object-cover" />
                            </div>
                            <div class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <h5 class="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">{{
                                    clinicas.medico }}</h5>
                                <p class="mb-2 text-white-dark">{{ $t('clinic') }}</p>
                                <span class="badge bg-primary rounded-full">Ativo</span>
                                <p class="font-semibold text-white-dark mt-4 sm:mt-8">Maecenas nec mi vel lacus condimentum
                                    rhoncus dignissim egestas orci. Integer blandit porta placerat. Vestibulum in ultricies.
                                </p>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- Select das clinicas -->
                <select class="form-select mt-5">
                    <option selected disabled>Selecione a clínica</option>
                    <option v-for="clinica in clinicas" :value="clinica.id">
                        {{ clinica.nome }}
                    </option>
                </select>
            </div>
        </div>
        <hr>
        <div class="flex flex-col items-center font-semibold mt-2">
            <button class="btn btn-primary w-80 capitalize" @click="criarVinculo" :disabled="clinicas.length == 0">{{
                $t('join') }}</button>
        </div>
    </div>
</template>