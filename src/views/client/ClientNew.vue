<script lang="ts" setup>
import { ref } from "vue";
import InputText from "@/components/form/InputText.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import Divider from "@/components/layout/Divider.vue";
import Section from "@/components/layout/Section.vue";

/** OPTIONS */
const formData = ref({
    cliente: {
        nome: "",
        ativo: 0,
        status_cliente_id: 0,
    },
    telefone: {
        numero: "",
        tipo_telefone_id: 0,
    },
    documento: {
        numero: "",
        tipo_documento_id: 0,
    },
    endereco: {
        nome: "",
        rua: "",
        bairro: "",
        numero: "",
        cep: "",
        cidade_id: 0,
    },
});
/** OPTIONS */

/** FUNCOES */
const sendData = async () => {
    console.log(formData.value);
};
/** FUNCOES */
</script>
<template>
    <div class="flex flex-col w-5/6 mx-auto">
        <!-- CLIENTE -->
        <Section title="client">
            <InputText
                label="name"
                :required="true"
                @update-value="
                    (value: any) => (formData.cliente.nome = value)
                " />
            <FormSelect
                route="status-cliente"
                name="status"
                :required="true"
                field="status"
                @update-value="
                    (value: any) => (formData.cliente.status_cliente_id = value)
                " />
        </Section>
        <!-- CLIENTE -->

        <Divider />

        <!-- TELEFONE -->
        <Section title="telephone">
            <InputText
                label="telephone"
                :required="true"
                @update-value="
                    (value: any) => (formData.telefone.numero = value)
                " />
            <FormSelect
                route="tipo-telefone"
                name="phoneType"
                :required="true"
                field="tipo"
                @update-value="
                    (value: any) => (formData.telefone.tipo_telefone_id = value)
                " />
        </Section>
        <!-- TELEFONE -->

        <Divider />

        <!-- DOCUMENTO -->
        <Section title="document">
            <InputText
                label="number"
                :required="true"
                @update-value="
                    (value: any) => (formData.documento.numero = value)
                " />
            <FormSelect
                route="tipo-documento"
                name="docType"
                :required="true"
                field="tipo"
                @update-value="
                    (value: any) =>
                        (formData.documento.tipo_documento_id = value)
                " />
        </Section>
        <!-- DOCUMENTO -->

        <Divider />

        <!-- ENDERECO -->
        <Section title="address">
            <div class="flex flex-row gap-1">
                <InputText
                    label="name"
                    :required="true"
                    @update-value="
                        (value: any) => (formData.endereco.nome = value)
                    " />
                <InputText
                    label="cep"
                    :required="true"
                    :mask="'#####-###'"
                    @update-value="
                        (value: any) => (formData.endereco.cep = value)
                    " />
            </div>
            <div class="flex flex-row gap-1">
                <InputText
                    label="street"
                    :required="true"
                    @update-value="
                        (value: any) => (formData.endereco.rua = value)
                    " />
                <InputText
                    label="neighborhood"
                    :required="true"
                    @update-value="
                        (value: any) => (formData.endereco.bairro = value)
                    " />
                <InputText
                    label="number"
                    :required="true"
                    @update-value="
                        (value: any) => (formData.endereco.numero = value)
                    " />
            </div>
            <FormSelect
                route="cidade"
                name="city"
                field="nome"
                :selected="0"
                :required="true"
                @update-value="
                    (value: any) => (formData.endereco.cidade_id = value)
                " />
        </Section>
        <!-- ENDERECO -->

        <Divider />

        <div class="w-1/4 mx-auto mt-4">
            <ButtonForm
                text="register"
                type-class="btn-main"
                @action-callback="sendData()" />
        </div>
    </div>
</template>
