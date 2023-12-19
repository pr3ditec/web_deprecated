<script>
import LogoSauvvi from "../../../public/assets/images/logos/logo.png";
import { useAppStore } from "@/stores";
import Response from "@/api/Response";

export default {
    data() {
        return {
            stores: useAppStore(),
            logo: LogoSauvvi,
            senhas: {
                senha: "",
                senha_confirmacao: "",
            },
        };
    },
    methods: {
        async trocarSenha() {
            const tkn = this.$route.params.token;
            await this.stores.request
                .atualizarDadosApi(`/recuperacao-senha/${tkn}`, {
                    senha: this.senhas.senha,
                    senha_confirmacao: this.senhas.senha_confirmacao,
                })
                .then((res) => {
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          );
                });
        },
    },
    computed: {
        placeholderPassword() {
            return this.$t("type-password");
        },
        passwordShort() {
            return this.senhas.senha.length < 8 && this.senhas.senha.length > 0
                ? true
                : false;
        },
        passwordMatch() {
            return this.senhas.senha != this.senhas.senha_confirmacao
                ? true
                : false;
        },
    },
};
</script>
<template>
    <div
        class="flex flex-col w-screen h-screen bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700">
        <div
            class="w-11/12 h-5/6 md:w-4/12 md:h-5/6 mx-auto my-auto rounded-lg shadow-lg bg-white">
            <div class="flex flex-col items-center mt-5 p-3">
                <img :src="logo" class="w-3/12" />
            </div>
            <hr class="w-3/4 mx-auto" />
            <h1
                class="text-center text-2xl mt-4 mb-1 capitalize font-semibold tracking-wide">
                {{ $t("password_recovery") }}
            </h1>
            <form class="flex flex-col p-8 gap-5">
                <div class="form-item">
                    <label class="mb-0">{{ $t("new-password") }}</label>
                    <input
                        type="password"
                        class="form-input p-4"
                        v-model="senhas.senha"
                        :placeholder="placeholderPassword" />
                    <label
                        class="lowercase text-danger mt-0"
                        v-show="passwordShort"
                        >{{ $t("password-short") }}</label
                    >
                </div>
                <div class="form-item">
                    <label class="mb-0">{{ $t("repeat-password") }}</label>
                    <input
                        type="password"
                        class="form-input p-4"
                        v-model="senhas.senha_confirmacao"
                        :placeholder="placeholderPassword" />
                    <label
                        class="lowercase text-danger mt-0"
                        v-show="passwordMatch"
                        >{{ $t("password-match") }}</label
                    >
                </div>
                <div class="form-item mt-5">
                    <button
                        @click="trocarSenha()"
                        type="button"
                        :disabled="passwordMatch && passwordShort"
                        class="btn btn-lg btn-primary mx-auto w-10/12 md:w-1/4">
                        {{ $t("change-password") }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
