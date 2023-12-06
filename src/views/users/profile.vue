<script>
import Api from "@/api/Api";
import Response from "@/api/Response";
import FormatoData from "@/helpers/FormatoData";

export default {
    data() {
        return {
            request: new Api(),
            dadosUsuario: [],
            formUsuario: {
                antiga_senha: "",
                nova_senha: "",
                repetir_nova_senha: "",
            },
        };
    },
    methods: {
        buscarDadosUsuario() {
            this.request
                .pegarDadosApi(`/usuario/${localStorage.getItem("user.id")}`)
                .then((res) => {
                    console.log(res);
                    if (res.status) {
                        this.dadosUsuario = res.list;
                    }
                });
        },

        atualizarDadosUsuario() {
            this.request
                .enviarDadosApi("/usuario", {
                    email: this.dadosUsuario.email,
                    senha: this.formUsuario.antiga_senha,
                    nova_senha: this.formUsuario.nova_senha,
                })
                .then((res) => {
                    res.status
                        ? Response.mensagemToast("success", res.message)
                        : Response.mensagemToast("error", res.message);
                });
        },
    },
    computed: {
        /** LIEBERAR BOTAO E SENHAS NOVAS */
        habilitarNovaSenha() {
            if (this.formUsuario.antiga_senha.length < 8) {
                return true;
            } else {
                return false;
            }
        },
        habilitarBotao() {
            if (
                this.formUsuario.nova_senha !=
                    this.formUsuario.repetir_nova_senha ||
                this.formUsuario.repetir_nova_senha.length < 8
            ) {
                return true;
            } else {
                return false;
            }
        },
        /** LIEBERAR BOTAO E SENHAS NOVAS */
    },
    async created() {
        this.buscarDadosUsuario();
    },
};
</script>
<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
        <div class="panel col-span-4">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">
                    {{ $t("profile") }}
                </h5>
            </div>
            <div class="mb-5">
                <div class="flex flex-col justify-center items-center">
                    <img
                        :src="
                            dadosUsuario.foto_perfil ??
                            '/assets//images/profile-34.jpeg'
                        "
                        alt=""
                        class="w-24 h-24 rounded-full object-cover mb-5" />
                    <p class="font-semibold text-primary text-xl">
                        {{ dadosUsuario.nome }}
                    </p>
                </div>
                <ul
                    class="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 shrink-0">
                            <path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M7 4V2.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                            <path
                                opacity="0.5"
                                d="M17 4V2.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                            <path
                                opacity="0.5"
                                d="M2 9H22"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>
                        {{ dadosUsuario.nascimento }}
                    </li>
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 shrink-0">
                            <path
                                opacity="0.5"
                                d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <circle
                                cx="12"
                                cy="10"
                                r="3"
                                stroke="currentColor"
                                stroke-width="1.5" />
                        </svg>
                        {{ dadosUsuario.nacionalidade_id }}
                    </li>
                    <li>
                        <a href="javascript:;" class="flex items-center gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 shrink-0">
                                <path
                                    opacity="0.5"
                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                    stroke="currentColor"
                                    stroke-width="1.5" />
                                <path
                                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                            <span class="text-primary truncate">{{
                                dadosUsuario.email
                            }}</span></a
                        >
                    </li>
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5">
                            <path
                                d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>
                        <span class="whitespace-nowrap" dir="ltr">{{
                            dadosUsuario.telefone_medico ?? "vazio"
                        }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- SEGUNDO PAINEL -->
        <div class="panel col-span-4 xl:col-span-4">
            <form
                class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-[#0e1726]">
                <h6 class="text-lg font-bold mb-5">
                    {{ $t("change-password") }}
                </h6>
                <div class="flex flex-col sm:flex-row">
                    <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                        <img
                            :src="
                                dadosUsuario.foto_perfil ??
                                '/assets//images/profile-34.jpeg'
                            "
                            alt=""
                            class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                    </div>
                    <div class="flex flex-col w-full gap-4">
                        <!-- SENHA ANTIGA -->
                        <div>
                            <label for="old_password">{{
                                $t("old-password")
                            }}</label>
                            <input
                                id="old_password"
                                type="password"
                                class="form-input"
                                v-model="formUsuario.antiga_senha" />
                        </div>
                        <!-- SENHA ANTIGA -->

                        <!-- NOVA SENHA -->
                        <div class="flex flex-row justify-around gap-2">
                            <div class="w-full">
                                <label for="password">{{
                                    $t("new-password")
                                }}</label>
                                <input
                                    id="password"
                                    type="password"
                                    v-model="formUsuario['nova_senha']"
                                    :disabled="habilitarNovaSenha"
                                    class="form-input" />
                                <label
                                    v-if="
                                        formUsuario.nova_senha.length > 0 &&
                                        formUsuario.nova_senha.length < 8
                                    "
                                    class="text-danger text-sm mt-0"
                                    >{{ $t("password-short") }}</label
                                >
                            </div>
                            <div class="w-full">
                                <label for="repeat-password">{{
                                    $t("repeat-password")
                                }}</label>
                                <input
                                    id="repeat-password"
                                    type="password"
                                    v-model="formUsuario.repetir_nova_senha"
                                    :disabled="habilitarNovaSenha"
                                    class="form-input" />
                                <label
                                    v-if="
                                        formUsuario.nova_senha !=
                                        formUsuario.repetir_nova_senha
                                    "
                                    class="text-danger text-sm mt-0"
                                    >{{ $t("password-match") }}</label
                                >
                            </div>
                        </div>
                        <!-- NOVA SENHA -->

                        <!-- BUTTON FORM -->
                        <div class="sm:col-span-2 mt-3">
                            <button
                                type="button"
                                class="btn btn-primary capitalize"
                                :disabled="habilitarBotao"
                                @click="atualizarDadosUsuario()">
                                {{ $t("update") }}
                            </button>
                        </div>
                        <!-- BUTTON FORM -->
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
