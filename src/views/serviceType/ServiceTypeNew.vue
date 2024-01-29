<script lang="ts" setup>
import { ref, inject } from "vue";
import { useI18n } from "vue-i18n";
import TitleForm from "@/components/form/TitleForm.vue";
import InputText from "@/components/form/InputText.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import Response from "@/helpers/Response";
import Divider from "@/components/layout/Divider.vue";

/** CONTROLE */
const t = useI18n().t;
const request: any = Object(inject("request"));
/** CONTROLE */

/** OPTIONS */
const formData = ref({
    nome: "",
    ativo: true,
});
/** OPTIONS */

/** FUNCOES */
const storeData = async () => {
    await request
        .post("/tipo-servico", formData.value)
        .then((res: any) => {
            Response.mensagemToast(res.data.status, res.data.message);
        })
        .catch((err: any) => {
            Response.mensagemToast(false, "storeMethodFailed");
        });
};
/** FUNCOES */
</script>
<template>
    <TitleForm label="typeService" />
    <div class="flex flex-col w-3/4 mx-auto">
        <InputText
            label="name"
            :required="true"
            @update-value="(value: any) => (formData.nome = value)" />
        <Divider />
        <div class="flex flex-row mx-auto">
            <FormCheckbox
                @updateValue="(value: any) => (formData.ativo = value)" />
        </div>
        <div class="flex flex-row w-1/4 mx-auto">
            <ButtonForm
                text="register"
                type-class="btn-main"
                @action-callback="storeData" />
        </div>
    </div>
</template>
