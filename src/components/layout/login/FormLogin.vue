<script lang="ts" setup>
import axios from "axios";
import { useAppStore } from "@/stores/index";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import AuthPassword from "@/components/auth/AuthPassword.vue";
import AuthEmail from "@/components/auth/AuthEmail.vue";
import AuthHeader from "@/components/auth/AuthHeader.vue";
import Response from "@/helpers/Response";

/** CONTROLE */
const router = useRouter();
const store = useAppStore();
const request = Object(inject("request"));
/** CONTROLE */

/** OPTIONS */
const submitBtnDisabled = ref(false);
const loginForm = ref({
    email: "",
    senha: "",
});
/** OPTIONS */

/** FUNCOES */
const submitForm = async () => {
    submitBtnDisabled.value = true;
    await request
        .post("/login", loginForm.value)
        .then((res: any) => {
            console.log(res.data.content.token);

            if (res.data.status) {
                Response.mensagemToast(res.data.status, res.data.message);
                router.push("/");
            } else {
                Response.mensagemToast(res.data.status, res.data.message);
                submitBtnDisabled.value = false;
            }
        })
        .catch((err: any) => {
            Response.mensagemToast(false, "errorOnLogin");
            submitBtnDisabled.value = false;
        });
};
/** FUNCOES */
</script>

<template>
    <div
        class="w-full md:w-11/12 lg:mt-20 mx-auto"
        @keypress.enter="submitForm">
        <AuthHeader label="login" secondaryLabel="enterCredentialsToContinue" />

        <div class="space-y-5 dark:text-white p-4">
            <AuthEmail
                label="idDoc"
                @updateValue="(value: any) => (loginForm.email = value)" />

            <AuthPassword
                label="password"
                @updateValue="(value: any) => (loginForm.senha = value)" />

            <ButtonForm
                :disabled="submitBtnDisabled"
                text="login"
                typeClass="btn-main"
                @actionCallback="submitForm" />
        </div>
    </div>
</template>
