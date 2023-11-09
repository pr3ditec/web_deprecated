<script>

import Criar from './criar.vue';
import Vincular from './vincular.vue';


export default{
    data(){
        return{
            criar: true,
            tipo: 'Create',
        }
    },
    components:{
        Criar,
        Vincular
    },
    methods:{
        trocarModo(){
            this.criar = !this.criar
            if(this.criar == true){
                this.tipo = 'Create'
            }else{
                this.tipo = 'Join'
            }
        }
    }

}

</script>

<template>
    <div class="grid space-y-6 grid-cols-1 items-center">  
        <!-- HEADER -->
        <div>
            <h1 class="text-4xl font-bold mb-4">{{ $t('Clinic') }}</h1>

            <div class="flex flex-row gap-4 align-items-center">
                <h6  class="text-xl font-bold mb-4">{{ $t("Create") }}</h6>
                <label @click="trocarModo" class="w-12 h-6 relative">
                    <input type="checkbox" class="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" />
                    <span class="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                </label>
                <h6 class="text-xl font-bold mb-4">{{ $t("Join") }}</h6>
            </div>

        </div>       
        <!-- HEADER -->

        <!-- FORMULARIO -->
        <Transition>
            <div class="flex flex-col items-center gap-5 mt-4" v-show="criar">
                <!-- Compónente de criacao -->
                <Criar />
            </div>
        </Transition>

        <Transition>
            <div class="flex flex-col items-center gap-5 mt-4" v-show="!criar">
                <!-- Componente de vincular -->
                <Vincular />
            </div> 
        </Transition>

        <!-- FORMULARIO -->

    </div>
</template>