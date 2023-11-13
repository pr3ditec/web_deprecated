<script lang="ts">
import ValidacaoInput from "../../../helpers/ValidacaoInput";
import Response from "../../../api/Response";
import { inject } from "vue";
import { useAppStore } from "@/stores/index";

export default {
    data() {
        return {
            request: Object(inject("api")),
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

    methods: {
        compararSenhas(entrada) {
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
            if (ValidacaoInput.inputVazio(this.secretariaFormData)["status"] == false) {
                return Response.mensagemErro("Campos não podem estar vazios");
            }
            // testa se o email ter formato valido
            if (ValidacaoInput.email(this.secretariaFormData.email)["status"] == false) {
                return Response.mensagemErro("tipo de email invalido");
            }
            // testa se as senhas correspondem
            if (this.classePassword["border border-red-600"] == true) {
                return Response.mensagemErro("senhas não correspondem");
            }
            // limpando cpf
            this.secretariaFormData["cpf"] = this.secretariaFormData["cpf"].replaceAll(".", "").replaceAll("-", "");
            // salvando dados da secretaria
            await this.request.enviarDadosApi("medico/clinica/secretaria", this.secretariaFormData).then((res) => {
                if (res.status == false) {
                    return Response.mensagemErro(res.message);
                } else {
                    return Response.mensagemSucesso(res.message);
                }
            });
        },
    },

    async created() {
        this.nacionalidade = await this.request.pegarDadosApi("/nacionalidade");
    },

    mounted() {
        // Adicionar via variavel de sessao
        this.secretariaFormData["medico_id"] = "1";
    },
};
</script>
<template>
    <div class="flex flex-col items-center gap-5 mt-4 w-1/2">
        <div class="flex flex-row gap-1 w-full">
            <!-- Nome da secretaria -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname capitalize">{{ $t("name") }}</label>
                <input class="form-input" type="text" placeholder="Ex.: Fernanda" v-model="secretariaFormData.nome" />
            </div>

            <!-- Nome da mae -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname capitalize">{{ $t("mother's name") }}</label>
                <input class="form-input" type="text" placeholder="Ex.: Sabrina" v-model="secretariaFormData.nome_mae" />
            </div>
        </div>

        <!-- CPF  -->
        <div class="w-full gap-0">
            <label class="capitalize" for="groupFname capitalize">CPF</label>
            <input
                class="form-input"
                v-mask="'###.###.###-##'"
                type="text"
                placeholder="Ex.: 000.000.000-00"
                v-on:input="
                    ($event) => {
                        //@ts-expect-error
                        secretariaFormData.cpf = $event.target.value;
                    }
                "
            />
        </div>

        <!-- EMAIL -->
        <div class="w-full gap-0">
            <label class="capitalize" for="groupFname capitalize">E-mail</label>
            <input class="form-input" type="text" placeholder="Ex.: secretaria@sauvi.com" v-model="secretariaFormData.email" />
        </div>

        <!-- DATA DE NASCIMENTO -->
        <div class="w-full gap-0">
            <label class="justify-start capitalize">{{ $t("birthdate") }}</label>
            <input class="form-input" v-mask="'##/##/####'" type="text" placeholder="Ex.: 00/00/0000" v-model="secretariaFormData.nascimento" />
        </div>

        <!-- SEXO -->
        <select class="form-select" v-model="secretariaFormData.sexo">
            <option value="0" disabled selected>{{ $t("select") }} {{ $t("gender") }}</option>
            <option class="capitalize" value="F">{{ $t("female") }}</option>
            <option class="capitalize" value="M">{{ $t("male") }}</option>
            <option class="capitalize" value="X">{{ $t("other") }}</option>
        </select>

        <!-- NACIONALIDADE -->
        <select class="form-select" v-model="secretariaFormData.nacionalidade_id">
            <option value="0" disabled selected>{{ $t("select") }} {{ $t("citizenship") }}</option>
            <option
                v-for="nac in nacionalidade"
                :value="
                    // @ts-expect-error
                    nac.id
                "
            >
                {{
                    // @ts-expect-error
                    nac.descricao
                }}
            </option>
        </select>

        <div class="w-full gap-0">
            <label class="capitalize justify-start">{{ $t("password") }}</label>
            <input class="form-input" type="password" v-model="secretariaFormData.password" />
        </div>

        <div class="w-full gap-0">
            <label class="capitalize justify-start">{{ $t("repeat") }} {{ $t("password") }}</label>
            <input class="form-input" v-bind:class="classePassword" v-on:keyup="($event) => compararSenhas($event)" type="password" />
            <span class="flex flex-col items-start text-danger text-xs align-start mt-0 pt-0" v-show="classePassword['border border-red-600']"
                >Senhas nao correspondem</span
            >
        </div>

        <div class="flex flex-col items-center font-semibold mt-6">
            <button class="btn btn-primary w-80" v-on:keyup.enter="cadastrarSecretaria" @click="cadastrarSecretaria">Cadastrar</button>
        </div>
    </div>
</template>
