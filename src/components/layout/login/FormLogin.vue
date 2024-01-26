<script lang="ts" setup>
import axios from "axios";
import { useAppStore } from "@/stores/index";
const store = useAppStore();
import { useRouter } from "vue-router";
const router = useRouter();
import { getBaseURL } from "@/helpers/Host";
import { onMounted, reactive, ref } from "vue";
import ButtonForm from "@/components/form/ButtonForm.vue";
import AuthPassword from "@/components/auth/AuthPassword.vue";
import AuthEmail from "@/components/auth/AuthEmail.vue";
import AuthHeader from "@/components/auth/AuthHeader.vue";
import Response from "@/helpers/Response";

onMounted(async () => {
    req.url = (await getBaseURL()) + "/admin/login";
});

const loginForm = reactive({
    login: "",
    password: "",
});

const req = {
    method: "post",
    maxBodyLength: 10000,
    url: "",
    data: loginForm,
};

const submitBtnDisabled = ref(false);

const submitForm = async () => {
    submitBtnDisabled.value = true;
    Response.mensagemToast(submitBtnDisabled.value, "loginSuccess");
    router.push("/");

    // try {
    //     store.logout();

    //     const response = await axios.request(req);

    //     if (response.data.status) {
    //         store.setUserLogin(response.data.list.token);
    //         store.setUserName(response.data.list.nome);
    //         store.setUserId(response.data.list.usuario_id);
    //         store.setDoctorId(response.data.list.medico_id);
    //         store.setSecretaryId(response.data.list.secretaria_id);
    //         store.setDevId(response.data.list.desenvolvedor_id);
    //         store.setManagerId(response.data.list.gestor_id);
    //         store.setPermissoes(response.data.list.permissoes);
    //         // Instanciando a conexao global do axios
    //         store.setRequest(response.data.list.token);

    //         router.push("/");
    //     } else {
    //         Swal.fire("Login failed", response.data.message, "info");
    //     }
    // } catch (error) {
    //     Swal.fire("Request failed: " + error);
    // } finally {
    //     submitBtnDisabled.value = false;
    // }
};
</script>

<template>
    <div class="w-full md:w-11/12 lg:mt-20 mx-auto">
        <AuthHeader label="login" secondaryLabel="enterCredentialsToContinue" />

        <form
            class="space-y-5 dark:text-white p-4"
            @submit.prevent="submitForm">
            <AuthEmail label="idDoc" @updateValue="loginForm.login" />

            <AuthPassword label="password" @updateValue="loginForm.password" />

            <ButtonForm
                :disabled="submitBtnDisabled"
                type="submit"
                text="login"
                typeClass="btn-main"
                @actionCallback="(value: any) => null" />
        </form>
    </div>
</template>
