<script lang="ts" setup>
import ButtonForm from "@/components/form/ButtonForm.vue";
import ButtonReturn from "@/components/form/ButtonReturn.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import PlaceholderInput from "@/components/form/PlaceholderInput.vue";
import TitleForm from "@/components/form/TitleForm.vue";
import IconEditDisabled from "@/components/icons/IconEditDisabled.vue";
import IconEditEnable from "@/components/icons/IconEditEnable.vue";
import IconLoading from "@/components/icons/IconLoading.vue";
import TabdividerClient from "@/components/layout/TabdividerClient.vue";
import AddressProfile from "@/components/profile/AddressProfile.vue";
import DocumentProfile from "@/components/profile/DocumentProfile.vue";
import NotAvailable from "@/components/profile/NotAvailable.vue";
import TelephoneProfile from "@/components/profile/TelephoneProfile.vue";
import Response from "@/helpers/Response";
import { inject, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

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
const selected_id = ref(-1);
/** CONTROLE */

/** FUNCOES */
const retrieveData = async () => {
    await request
        .get(`/cliente/${route.params.id}`)
        .then((res: any) => {
            formData.value = res.data.content;
        })
        .then(() => (isLoading.value = false));
};
const updateData = async (updateRoute: string, data: any) => {
    await request
        .put(updateRoute, data)
        .then((res: any) => {
            Response.mensagemToast(res.data.status, res.data.message);
        })
        .catch((err: any) => console.log("err"))
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
    <div v-else class="flex flex-col w-3/4 mx-auto mt-4">
        <TabdividerClient>
            <template #client>
                <!-- NOME -->
                <PlaceholderInput
                    :lock="lockUpdate"
                    :model="formData.cliente.nome"
                    label="name"
                    @updateValue="
                        (value: any) => (formData.cliente.nome = value)
                    " />
                <!-- NOME -->
                <!-- STATUS DO CLIENTE GERAL -->
                <FormCheckbox
                    @updateValue="(value: any) => (formData.ativo = value)" />
                <!-- STATUS DO CLIENTE GERAL -->

                <div class="w-1/4 mt-3">
                    <ButtonForm
                        text="atualizar"
                        typeClass="btn-main"
                        @actionCallback="
                            updateData(
                                `/cliente/${route.params.id}`,
                                formData.cliente,
                            )
                        " />
                </div>
            </template>
            <template #status>
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
                <div class="w-1/4 mt-3">
                    <ButtonForm
                        text="atualizar"
                        typeClass="btn-main"
                        @actionCallback="
                            updateData(
                                `/status-cliente/${formData.status.id}`,
                                formData.status,
                            )
                        " />
                </div>
            </template>
            <template #telphone>
                <!-- TELEFONE -->
                <TelephoneProfile
                    v-if="formData.telefone.length != 0"
                    :telephone="formData.telefone"
                    @update-selected-id="(value: any) => (selected_id = value)"
                    @update-value="
                        (value: any) => (formData.telefone = value)
                    " />
                <NotAvailable v-else label="noPhoneAvailable" />
                <!-- TELEFONE -->
                <div class="w-1/4 mt-3">
                    <ButtonForm
                        v-if="formData.telefone.length != 0"
                        text="atualizar"
                        typeClass="btn-main"
                        @actionCallback="
                            updateData(
                                `/telefone/${formData.telefone[selected_id].id}`,
                                formData.telefone[selected_id],
                            )
                        " />
                </div>
            </template>
            <template #document>
                <!-- DOCUMENTO -->
                <DocumentProfile
                    v-if="formData.documento.length != 0"
                    :document="formData.documento" />
                <NotAvailable v-else label="noDocAvailable" />
                <!-- DOCUMENTO -->
                <div class="w-1/4 mt-3">
                    <ButtonForm
                        v-if="formData.documento.length != 0"
                        text="atualizar"
                        typeClass="btn-main"
                        @actionCallback="
                            updateData(
                                `/documento/${formData.documento.id}`,
                                formData.documento,
                            )
                        " />
                </div>
            </template>
            <template #address>
                <!-- ENDERECO -->
                <AddressProfile
                    v-if="formData.endereco.length != 0"
                    :address="formData.endereco"
                    @update-selected-id="(value: any) => (selected_id = value)"
                    @update-value="
                        (value: any) => (formData.endereco = value)
                    " />
                <NotAvailable v-else label="noAddrAvailable" />
                <!-- ENDERECO -->
                <div class="w-1/4 mt-3">
                    <ButtonForm
                        v-if="formData.endereco.length != 0"
                        text="atualizar"
                        typeClass="btn-main"
                        @actionCallback="
                            updateData(
                                `/endereco/${formData.endereco[selected_id].id}`,
                                formData.endereco[selected_id],
                            )
                        " />
                </div>
            </template>
        </TabdividerClient>
    </div>
    <!-- FORM -->
</template>
