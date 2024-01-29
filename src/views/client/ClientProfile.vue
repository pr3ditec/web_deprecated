<script lang="ts" setup>
import { ref, watch, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import IconLoading from "@/components/icons/IconLoading.vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import PlaceholderInput from "@/components/form/PlaceholderInput.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import TitleForm from "@/components/form/TitleForm.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import IconEditDisabled from "@/components/icons/IconEditDisabled.vue";
import IconEditEnable from "@/components/icons/IconEditEnable.vue";
import ButtonReturn from "@/components/form/ButtonReturn.vue";
import AddressProfile from "@/components/profile/AddressProfile.vue";
import DocumentProfile from "@/components/profile/DocumentProfile.vue";
import TelephoneProfile from "@/components/profile/TelephoneProfile.vue";
import NotAvailable from "@/components/profile/NotAvailable.vue";
import Response from "@/helpers/Response";

/** CONTROLE */
const route = useRoute();
const router = useRouter();
const formData: any = ref({
    cliente: {},
    telefone: {},
    documento: {},
    endereco: {},
});
const isLoading: any = ref(true);
const request: any = Object(inject("request"));
const lockUpdate: any = ref(true);
/** CONTROLE */

/** FUNCOES */
const retrieveData = async () => {
    await request
        .get(`/cliente/${route.params.id}`)
        .then((res: any) => {
            console.log(res.data.content.documento);
            formData.value = res.data.content;
        })
        .then(() => (isLoading.value = false));
};
const updateData = async () => {
    await request
        .put(`/cliente/${route.params.id}`, formData.value)
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
    <ButtonReturn pushRoute="/client/list" />
    <div class="flex flex-col gap-2 items-center">
        <TitleForm label="client" />
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
        <!-- NOME -->
        <PlaceholderInput
            :lock="lockUpdate"
            :model="formData.cliente.nome"
            label="name"
            @updateValue="(value: any) => (formData.cliente.nome = value)" />
        <!-- NOME -->

        <!-- STATUS DO CLIENTE GERAL -->
        <FormCheckbox @updateValue="(value: any) => (formData.ativo = value)" />
        <!-- STATUS DO CLIENTE GERAL -->

        <!-- STATUS DO CLIENTE -->
        <div class="mb-2">
            <PlaceholderInput
                v-if="lockUpdate"
                :lock="lockUpdate"
                :model="formData.status.status"
                label="status" />
            <FormSelect
                v-else
                route="/status-cliente"
                name="status"
                :required="true"
                :field="'status'"
                @updateValue="
                    (value: any) => formData.cliente.status_cliente_id
                " />
        </div>
        <!-- STATUS DO CLIENTE -->

        <!-- TELEFONE -->
        <TelephoneProfile
            v-if="formData.telefone.length != 0"
            :telephone="formData.telefone" />
        <NotAvailable v-else label="noPhoneAvailable" />
        <!-- TELEFONE -->

        <!-- DOCUMENTO -->
        <DocumentProfile
            v-if="formData.documento.length != 0"
            :document="formData.documento" />
        <NotAvailable v-else label="noDocAvailable" />
        <!-- DOCUMENTO -->

        <!-- ENDERECO -->
        <AddressProfile
            v-if="formData.endereco.length != 0"
            :address="formData.endereco" />
        <NotAvailable v-else label="noAddrAvailable" />
        <!-- ENDERECO -->

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
