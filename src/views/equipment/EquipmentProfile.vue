<script lang="ts" setup>
import { ref, watch, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import IconLoading from "@/components/icons/IconLoading.vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import PlaceholderInput from "@/components/form/PlaceholderInput.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import TitleForm from "@/components/form/TitleForm.vue";
import IconPassword from "@/components/icons/IconPassword.vue";
import IconEditDisabled from "@/components/icons/IconEditDisabled.vue";
import IconEditEnable from "@/components/icons/IconEditEnable.vue";
import ButtonReturn from "@/components/form/ButtonReturn.vue";
import Response from "@/helpers/Response";
import FormSelect from "@/components/form/FormSelect.vue";
import Divider from "@/components/layout/Divider.vue";

/** CONTROLE */
const route = useRoute();
const router = useRouter();
const formData: any = ref({});
const isLoading: any = ref(true);
const request: any = Object(inject("request"));
const lockUpdate: any = ref(true);
/** CONTROLE */

/** FUNCOES */
const retrieveData = async () => {
    await request
        .get(`/aparelho/${route.params.id}`)
        .then((res: any) => {
            formData.value = res.data.content;
        })
        .then(() => (isLoading.value = false));
};
const updateData = async () => {
    await request
        .put(`/aparelho/${route.params.id}`, formData.value)
        .then((res: any) => {
            Response.mensagemToast(res.data.status, res.data.message);
        })
        .finally(() => {
            isLoading.value = true;
        });
};
/** FUNCOES */

/** WATCHER */
watch(isLoading, (old, novo) => {
    if (old && !novo) {
        retrieveData();
    }
});
/** WATCHER */

/** HOOKS */
onMounted(() => {
    retrieveData();
});
/** HOOKS */
</script>
<template>
    <!-- HEADER -->
    <ButtonReturn pushRoute="/equipment/list" />
    <div class="flex flex-col gap-2 items-center">
        <TitleForm label="equipment" />
        <label v-show="!lockUpdate" class="text-danger lowercase">{{
            $t("editEnabled")
        }}</label>
        <IconEditDisabled v-if="lockUpdate" @click="lockUpdate = !lockUpdate" />
        <IconEditEnable v-else @click="lockUpdate = !lockUpdate" />
    </div>
    <!-- HEADER -->

    <!-- FORM -->
    <IconLoading v-if="isLoading" class="mt-4" />
    <div v-else class="flex flex-col w-3/4 mx-auto">
        <PlaceholderInput
            :lock="lockUpdate"
            :model="formData.nome"
            label="name"
            @updateValue="(value: any) => (formData.nome = value)" />
        <PlaceholderInput
            :lock="lockUpdate"
            :model="formData.descricao"
            label="description"
            @updateValue="(value: any) => (formData.descricao = value)" />
        <FormSelect
            route="tipo-aparelho"
            name="equipment-type"
            :required="true"
            field="nome"
            :selected="formData.tipo_aparelho_id"
            @updateValue="
                (value: any) => (formData.tipo_aparelho_id = value)
            " />
        <Divider />
        <FormCheckbox @updateValue="(value: any) => (formData.ativo = value)" />
        <div class="w-1/4 mt-3">
            <ButtonForm
                v-if="!lockUpdate"
                text="atualizar"
                typeClass="btn-main"
                @actionCallback="updateData()" />
        </div>
    </div>
    <!-- FORM -->
</template>
