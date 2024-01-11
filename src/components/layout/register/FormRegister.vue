<script lang="ts">
import IconUser from "@/components/icons/IconUser.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
import IconPassword from "@/components/icons/IconPassword.vue";
import IconRegister from "@/components/icons/IconRegister.vue";
import Validacao from "@/helpers/ValidacaoInput";
import Response from "@/api/Response";

import { useAppStore } from "@/stores/index";
import { useRouter } from "vue-router";

export default {
    components: {
        IconUser,
        IconEmail,
        IconPassword,
        IconRegister,
    },
    data() {
        return {
            store: useAppStore(),
            router: useRouter(),
            submitBtnDisabled: false,
            investidorFormData: {
                nome: "",
                cpf: "",
                email: "",
                password: "",
                nome_mae: "",
                nascimento: "",
                nacionalidade_id: "0",
                sexo: "0",
                estado_civil_id: 0,
                tipo_usuario: "6",
            },

            estadoCivil: {
                id: 0,
                estado_civil: "",
            },

            nacionalidade: {
                id: "",
                descricao: "",
                created_at: "",
                updated_at: "",
            },

            classePassword: {
                "border border-red-600": false,
            },
        };
    },

    async created() {
        let nacionalidadeResponse =
            await this.store.request.pegarDadosApi("/nacionalidade");
        if (nacionalidadeResponse) {
            this.nacionalidade = nacionalidadeResponse.list;
        }

        let estadoCiviResponse =
            await this.store.request.pegarDadosApi("/estado-civil");
        this.estadoCivil = estadoCiviResponse.list;
    },
    methods: {
        compararSenhas(entrada: any) {
            if (this.investidorFormData.password == entrada.target.value) {
                this.classePassword["border border-zinc-200"] = true;
                this.classePassword["border border-red-600"] = false;
                return;
            }

            this.classePassword["border border-zinc-200"] = false;
            this.classePassword["border border-red-600"] = true;
        },

        async cadastrarInvestidor() {
            try {
                // testa os campos vazios
                if (
                    Validacao.inputVazio(this.investidorFormData)["status"] ==
                    false
                ) {
                    return Response.mensagemToast(
                        "error",
                        this.$t("empty-data"),
                    );
                }
                // testa se o email ter formato valido
                if (
                    Validacao.email(this.investidorFormData.email)["status"] ==
                    false
                ) {
                    return Response.mensagemToast(
                        "error",
                        this.$t("invalid-email"),
                    );
                }

                //testa se a senha possui mais de 8 caracteres
                if (this.investidorFormData.password.length < 8) {
                    return Response.mensagemToast(
                        "error",
                        this.$t("password-short"),
                    );
                }

                // testa se as senhas correspondem
                if (this.classePassword["border border-red-600"] == true) {
                    return Response.mensagemToast(
                        "error",
                        this.$t("password-match"),
                    );
                }
                // limpando cpf
                this.investidorFormData["cpf"] = this.investidorFormData["cpf"]
                    .replaceAll(".", "")
                    .replaceAll("-", "");

                this.submitBtnDisabled = true;
                await this.store.request
                    .enviarDadosApi(
                        "/usuario/cadastro",
                        this.investidorFormData,
                    )
                    .then((res) => {
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
                            this.router.push("/auth/login");
                        }
                    });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },
    },
};
</script>

<template>
    <div class="w-full max-w-[440px] lg:mt-16">
        <div class="mb-5">
            <h1
                class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">
                {{ $t("signup") }}
            </h1>
            <p class="text-base font-bold leading-normal text-white-dark">
                {{ $t("enter-your-details-to-register") }}
            </p>
        </div>

        <div class="space-y-5 dark:text-white capitalize">
            <div>
                <label for="Name">{{ $t("name") }}</label>
                <div class="relative text-white-dark">
                    <input
                        v-model="investidorFormData.nome"
                        id="Name"
                        type="text"
                        placeholder="Enter Name"
                        class="form-input ps-10 dark:text-white" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconUser />
                    </span>
                </div>
            </div>

            <!-- estado civil -->
            <select
                class="form-input"
                v-model="investidorFormData.estado_civil_id">
                <option disabled selected :value="0">
                    {{ $t("select-marital-status") }}
                </option>
                <option
                    v-for="status in estadoCivil"
                    :value="
                        //@ts-expect-error
                        status.id
                    ">
                    {{
                        //@ts-expect-error
                        status.estado_civil
                    }}
                </option>
            </select>

            <div>
                <label for="mother">{{ $t("mother's name") }}</label>
                <div class="relative text-white-dark">
                    <input
                        v-model="investidorFormData.nome_mae"
                        id="mother"
                        type="text"
                        placeholder="Enter Name mother"
                        class="form-input ps-10 dark:text-white" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconUser />
                    </span>
                </div>
            </div>

            <div>
                <label for="cpf">CPF</label>
                <div class="relative text-white-dark">
                    <input
                        v-mask="'###.###.###-##'"
                        id="cpf"
                        type="text"
                        placeholder="Enter CPF"
                        class="form-input ps-10 dark:text-white"
                        @input="
                            ($event) => {
                                //@ts-expect-error
                                investidorFormData.cpf = $event.target.value;
                            }
                        " />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconRegister />
                    </span>
                </div>
            </div>

            <div>
                <label for="Email">Email</label>
                <div class="relative text-white-dark">
                    <input
                        v-model="investidorFormData.email"
                        id="Email"
                        type="email"
                        placeholder="Enter Email"
                        class="form-input ps-10 dark:text-white" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconEmail />
                    </span>
                </div>
            </div>

            <div>
                <label for="Email">{{ $t("birthdate") }}</label>
                <div class="relative text-white-dark">
                    <input
                        v-model="investidorFormData.nascimento"
                        type="date"
                        class="form-input dark:text-white" />
                </div>
            </div>

            <div>
                <div class="relative text-white-dark">
                    <select
                        v-model="investidorFormData.sexo"
                        class="form-select capitalize dark:text-white">
                        <option value="0" disabled selected>
                            {{ $t("select") }} {{ $t("gender") }}
                        </option>
                        <option value="F">
                            {{ $t("female") }}
                        </option>
                        <option value="M">
                            {{ $t("male") }}
                        </option>
                        <option value="X">
                            {{ $t("other") }}
                        </option>
                    </select>
                </div>
            </div>

            <div>
                <div class="relative text-white-dark">
                    <select
                        v-model="investidorFormData.nacionalidade_id"
                        class="form-select capitalize dark:text-white">
                        <option value="0" disabled selected>
                            {{ $t("select") }} {{ $t("citizenship") }}
                        </option>
                        <option
                            v-for="nac in nacionalidade"
                            :value="
                                // @ts-expect-error
                                nac.id
                            ">
                            {{
                                // @ts-expect-error
                                nac.descricao
                            }}
                        </option>
                    </select>
                </div>
            </div>

            <div>
                <label for="Password">{{ $t("password") }}</label>
                <div class="relative text-white-dark">
                    <input
                        v-model="investidorFormData.password"
                        id="Password"
                        type="password"
                        placeholder="Enter Password"
                        class="form-input ps-10 placeholder:text-white-dark" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconPassword />
                    </span>
                </div>
            </div>

            <div>
                <label for="Confirme-password">{{
                    $t("confirm-password")
                }}</label>
                <div class="relative text-white-dark">
                    <input
                        id="Confirme-password"
                        :class="classePassword"
                        type="password"
                        placeholder="Enter Password"
                        class="form-input ps-10 placeholder:text-white-dark"
                        @keyup="($event) => compararSenhas($event)" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <IconPassword />
                    </span>
                    <span
                        v-show="classePassword['border border-red-600']"
                        class="flex flex-col items-start text-danger text-xs align-start mt-0 pt-0"
                        >{{ $t("password-match") }}</span
                    >
                </div>
            </div>

            <button
                class="btn btn-gradient text-shadow bg-primary !mt-6 w-full border-2 border-black-dark-light uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                @keyup.enter="cadastrarInvestidor"
                @click="cadastrarInvestidor"
                :disabled="submitBtnDisabled">
                {{ $t("signup") }}
            </button>
        </div>

        <div class="text-center dark:text-white mt-4">
            {{ $t("already-have-an-account") }} ?
            <router-link
                to="/auth/login"
                class="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                {{ $t("signin") }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    box-shadow: none;
}
</style>
