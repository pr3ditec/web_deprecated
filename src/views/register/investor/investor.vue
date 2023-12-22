<script>
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import IconRegister from "@/components/icons/IconRegister.vue";
import Create from "./create.vue";
import Questions from "./questions.vue";
import DocumentsUpload from "./documents-upload.vue";

export default {
    components: {
        Create,
        FormWizard,
        TabContent,
        IconRegister,
        Questions,
        DocumentsUpload,
    },
    data() {
        return {
            userId: null,
        };
    },
    methods: {
        nextTab() {
            this.$refs.wizard.nextTab();
        },
        updateUserId(id) {
            this.userId = id;
        },
    },
};
</script>

<template>
    <form-wizard ref="wizard" color="#4361ee" class="circle">
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                Cadastro de dados do Investidor
            </p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Create
                            @nextTab="nextTab"
                            :userId="userId"
                            @updateUserId="updateUserId" />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                Perguntas para o investidor
            </p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Questions @nextTab="nextTab" />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                Anexar Documentos
            </p>
            <div class="flex flex-col items-center gap-5 mt-4">
                <DocumentsUpload :userId="userId" />
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                Termo de Aceite
            </p>
        </tab-content>
    </form-wizard>
</template>
