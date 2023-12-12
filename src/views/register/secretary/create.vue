<script lang="ts">
import ValidacaoInput from "../../../helpers/ValidacaoInput";
import Response from "../../../api/Response";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            store: useAppStore(),
            // Formulario para castro
            secretariaFormData: {
                nome: "",
                cpf: "",
                email: "",
                password: "",
                nome_mae: "",
                nascimento: "",
                nacionalidade_id: "0",
                sexo: "0",
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
            //@ts-expect-error
            await this.$api.pegarDadosApi("/nacionalidade");
        this.nacionalidade = nacionalidadeResponse.list;
    },

    mounted() {
        // Adicionar via variavel de sessao
        this.secretariaFormData["medico_id"] = localStorage.getItem("user.id");
    },

    methods: {
        compararSenhas(entrada: any) {
            if (this.secretariaFormData.password == entrada.target.value) {
                this.classePassword["border border-zinc-200"] = true;
                this.classePassword["border border-red-600"] = false;
                return;
            }

            this.classePassword["border border-zinc-200"] = false;
            this.classePassword["border border-red-600"] = true;
        },

        async cadastrarSecretaria() {
            // testa os campos vazios
            if (
                ValidacaoInput.inputVazio(this.secretariaFormData)["status"] ==
                false
            ) {
                return Response.mensagemToast("error", this.$t("empty-data"));
            }
            // testa se o email ter formato valido
            if (
                ValidacaoInput.email(this.secretariaFormData.email)["status"] ==
                false
            ) {
                return Response.mensagemToast(
                    "error",
                    this.$t("invalid-email"),
                );
            }

            //testa se a senha possui mais de 8 caracteres
            if (this.secretariaFormData.password.length < 8) {
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
            this.secretariaFormData["cpf"] = this.secretariaFormData["cpf"]
                .replaceAll(".", "")
                .replaceAll("-", "");
            // salvando dados da secretaria

            //@ts-expect-error
            await this.$api
                .enviarDadosApi(
                    "medico/clinica/secretaria",
                    this.secretariaFormData,
                )
                .then((res) => {
                    if (res.status == false) {
                        return Response.mensagemErro(this.$t(res.messageCode));
                    } else {
                        return Response.mensagemSucesso(
                            this.$t(res.messageCode),
                        ).then(() => window.location.reload());
                    }
                });
        },
    },
};
</script>
<template>
    <div class="flex flex-col items-center gap-5 mt-4 w-1/2 dark:text-white">
        <div class="flex flex-row gap-1 w-full">
            <!-- Nome da secretaria -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname capitalize"
                    >{{ $t("name") }}*</label
                >
                <input
                    v-model="secretariaFormData.nome"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Fernanda" />
            </div>

            <!-- Nome da mae -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname capitalize"
                    >{{ $t("mother's name") }}*</label
                >
                <input
                    v-model="secretariaFormData.nome_mae"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Sabrina" />
            </div>
        </div>

        <!-- CPF  -->
        <div class="w-full gap-0">
            <label class="capitalize" for="groupFname capitalize">CPF*</label>
            <input
                v-mask="'###.###.###-##'"
                class="form-input dark:text-white"
                type="text"
                placeholder="Ex.: 000.000.000-00"
                @input="
                    ($event) => {
                        //@ts-expect-error
                        secretariaFormData.cpf = $event.target.value;
                    }
                " />
        </div>

        <!-- EMAIL -->
        <div class="w-full gap-0">
            <label class="capitalize" for="groupFname capitalize"
                >E-mail*</label
            >
            <input
                v-model="secretariaFormData.email"
                class="form-input dark:text-white"
                type="text"
                placeholder="Ex.: secretaria@sauvvitech.com" />
        </div>

        <!-- DATA DE NASCIMENTO -->
        <div class="w-full gap-0">
            <label class="justify-start capitalize"
                >{{ $t("birthdate") }}*</label
            >
            <input
                v-model="secretariaFormData.nascimento"
                type="date"
                class="form-input dark:text-white" />
        </div>

        <!-- SEXO -->
        <select
            v-model="secretariaFormData.sexo"
            class="form-select lowercase dark:text-white">
            <option value="0" disabled selected>
                {{ $t("select") }} {{ $t("gender") }}*
            </option>
            <option class="capitalize" value="F">{{ $t("female") }}</option>
            <option class="capitalize" value="M">{{ $t("male") }}</option>
            <option class="capitalize" value="X">{{ $t("other") }}</option>
        </select>

        <!-- NACIONALIDADE -->
        <select
            v-model="secretariaFormData.nacionalidade_id"
            class="form-select lowercase dark:text-white">
            <option value="0" disabled selected>
                {{ $t("select") }} {{ $t("citizenship") }}*
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

        <div class="w-full gap-0">
            <label class="capitalize justify-start"
                >{{ $t("password") }}*</label
            >
            <input
                v-model="secretariaFormData.password"
                class="form-input dark:text-white"
                type="password" />
        </div>

        <div class="w-full gap-0">
            <label class="capitalize justify-start"
                >{{ $t("repeat") }} {{ $t("password") }}*</label
            >
            <input
                class="form-input dark:text-white"
                :class="classePassword"
                type="password"
                @keyup="($event) => compararSenhas($event)" />
            <span
                v-show="classePassword['border border-red-600']"
                class="flex flex-col items-start text-danger text-xs align-start mt-0 pt-0"
                >{{ $t("password-match") }}</span
            >
        </div>
        <div class="w-full">
            <span class="text-sm lowercase">* {{ $t("required-fields") }}</span>
        </div>
        <div class="flex flex-col items-center font-semibold mt-6">
            <button
                class="btn btn-primary w-80"
                @keyup.enter="cadastrarSecretaria"
                @click="cadastrarSecretaria">
                {{ $t("register") }}
            </button>
        </div>
    </div>
</template>
