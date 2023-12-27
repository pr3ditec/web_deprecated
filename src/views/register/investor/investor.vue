<script>
import { FormWizard, TabContent } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
import IconRegister from "@/components/icons/IconRegister.vue";
import Create from "./create.vue";
import Questions from "./questions.vue";
import DocumentsUpload from "./documents-upload.vue";
import PrivacyPolicy from "./privacy-policy.vue";

export default {
    components: {
        Create,
        FormWizard,
        TabContent,
        IconRegister,
        Questions,
        DocumentsUpload,
        PrivacyPolicy,
    },
    data() {
        return {
            userId: null,
            verificacaoFinalizacao: [],
        };
    },
    methods: {
        nextTab() {
            this.$refs.wizard.nextTab();
        },
        prevTab() {
            this.$refs.wizard.prevTab();
        },
        updateUserId(id) {
            this.userId = id;
        },

        updateVerificacaoFinalizacao(componente) {
            this.verificacaoFinalizacao.push({ [componente]: "finalizado" });
            console.log(this.verificacaoFinalizacao);
        },
    },
};
</script>

<template>
    <form-wizard ref="wizard" color="#4361ee" class="circle">
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                {{ $t("additional-investor-data") }}
            </p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Create
                            @nextTab="nextTab"
                            :userId="userId"
                            @updateUserId="updateUserId"
                            @finalize="updateVerificacaoFinalizacao" />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                {{ $t("questions-for-the-investor") }}
            </p>
            <div
                class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                <Transition>
                    <div class="flex flex-col items-center gap-5 mt-4">
                        <Questions
                            :verificacaoFinalizacao="verificacaoFinalizacao"
                            @nextTab="nextTab"
                            @prevTab="prevTab"
                            @finalize="updateVerificacaoFinalizacao" />
                    </div>
                </Transition>
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                {{ $t("attach-documents") }}
            </p>
            <div class="flex flex-col items-center gap-5 mt-4">
                <DocumentsUpload
                    :userId="userId"
                    :verificacaoFinalizacao="verificacaoFinalizacao"
                    @nextTab="nextTab"
                    @prevTab="prevTab"
                    @finalize="updateVerificacaoFinalizacao" />
            </div>
        </tab-content>
        <tab-content :customIcon="IconRegister">
            <p class="text-center text-2xl font-bold text-blue-600">
                {{ $t("acceptance-term") }}
            </p>
            <div class="flex flex-col items-center gap-5 mt-4">
                <PrivacyPolicy
                    :userId="userId"
                    :verificacaoFinalizacao="verificacaoFinalizacao"
                    @prevTab="prevTab" />
            </div>
        </tab-content>
    </form-wizard>
</template>
