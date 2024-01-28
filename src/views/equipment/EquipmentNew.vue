<script lang="ts" setup>
import { ref, inject } from "vue";
import { useI18n } from "vue-i18n";
import TitleForm from "@/components/form/TitleForm.vue";
import InputText from "@/components/form/InputText.vue";

/** CONTROLE */
const t = useI18n().t;
const request: any = Object(inject("request"));
/** CONTROLE */

/** OPTIONS */
const formData = ref({
    nome: "",
    modelo: ""
});
/** OPTIONS */
</script>
<template>
    <div class="flex flex-col">
        <TitleForm label="Aparelho" />
        <InputText label="name" :required="true" @update-value="(value: any) => formData.nome = value"/>
    </div>
</template>
