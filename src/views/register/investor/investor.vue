<script>
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import IconRegister from "@/components/icons/IconRegister.vue";
import Create from "./create.vue";
import Questions from "./questions.vue";

export default {
    components: {
        Create,
        FormWizard,
        TabContent,
        IconRegister,
        Questions,
    },
    methods: {
        nextTab() {
            this.$refs.wizard.nextTab();
        },
    },
};
</script>

<template>
    <form-wizard ref="wizard" color="#4361ee" class="circle">
        <tab-content :customIcon="IconRegister">
            <p>Cadastro de dados do Investidor</p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Create @nextTab="nextTab" />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p>Perguntas para o investidor</p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Questions />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p>Wonderful transition effects.</p>
        </tab-content>
    </form-wizard>
</template>
