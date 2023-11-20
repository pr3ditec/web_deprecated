<script>
import { inject } from "vue";
import ValidacaoInput from "../../../helpers/ValidacaoInput";
import Response from "../../../api/Response";

export default {
    data() {
        return {
            request: Object(inject("api")),
            clinicaFormData: {
                nome: "",
                especialidade_id: "0",
            },
            clinicaEnderecoFormData: {
                cep: "",
                rua: "",
                bairro: "",
                cidade: "0",
                estado: "0",
                tipo: "0",
                numero: "",
                complemento: "",
                clinica_id: "0",
            },
            estados: {},
            tipoEndereco: {},
            cidades: {},
            especialidades: {},
        };
    },
    methods: {
        async cadastrarClinica() {
            // validar campos
            if (
                ValidacaoInput.inputVazio(this.clinicaFormData)["status"] ==
                    false ||
                ValidacaoInput.inputVazio(this.clinicaEnderecoFormData)[
                    "status"
                ] == false
            ) {
                return Response.mensagemErro("Campos naos podem estar vazios");
            }

            // sanitizar
            this.clinicaEnderecoFormData["cep"] = this.clinicaEnderecoFormData[
                "cep"
            ].replaceAll("-", "");

            this.request
                .enviarDadosApi("/medico/clinica", this.clinicaFormData)
                .then((res) => {
                    if (res.status == true) {
                        // console.log(res)
                        // adiciona o id que foi criado pela clinica
                        this.clinicaEnderecoFormData["clinica_id"] =
                            res.list.id;
                        this.clinicaEnderecoFormData["cidade"] =
                            this.clinicaEnderecoFormData["cidade"].toString();

                        this.request
                            .enviarDadosApi(
                                "medico/clinica/endereco",
                                this.clinicaEnderecoFormData,
                            )
                            .then((res) => {
                                console.log(res);

                                if (res.status == false) {
                                    return Response.mensagemErro(res.message);
                                } else {
                                    return Response.mensagemSucesso(
                                        res.message,
                                    );
                                }
                            });
                    } else {
                        return Response.mensagemErro(res.message);
                    }
                });
        },
    },
    watch: {
        async "clinicaEnderecoFormData.estado"(novo) {
            this.cidades = await this.request.pegarDadosApi(`/cidade/${novo}`);
        },
    },
    async created() {
        this.estados = await this.request.pegarDadosApi(
            "/unidades-federativas",
        );
        this.tipoEndereco = await this.request.pegarDadosApi("/endereco/tipo");
        this.especialidades = await this.request.pegarDadosApi(
            `/medico/especialidade/${localStorage.getItem("user.id")}`,
        );
    },
};
</script>
<template>
    <div class="grid space-y-6 grid-cols-1 items-center w-full">
        <!-- FORMULARIO -->
        <div class="flex flex-col items-center gap-5 mt-4">
            <!-- Nome da clinica -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">{{
                    $t("name")
                }}</label>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Ex.: Clinica principal"
                    v-model="clinicaFormData.nome"
                />
            </div>
            <hr />

            <!-- CEP -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">CEP</label>
                <input
                    class="form-input"
                    v-mask="'#####-###'"
                    type="text"
                    placeholder="Ex.: 87560-000"
                    v-on:input="
                        ($event) =>
                            (clinicaEnderecoFormData.cep = $event.target.value)
                    "
                />
            </div>

            <!-- Rua -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">{{
                    $t("street")
                }}</label>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Ex.: Rua mercelo azevedo"
                    v-model="clinicaEnderecoFormData.rua"
                />
            </div>

            <!-- Bairro -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">{{
                    $t("neighborhood")
                }}</label>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Ex.: Centro"
                    v-model="clinicaEnderecoFormData.bairro"
                />
            </div>

            <hr class="bg-dark" />

            <!-- Especialidade -->
            <select
                class="form-select w-1/2"
                v-model="clinicaFormData.especialidade_id"
            >
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("capabilities") }}
                </option>
                <option
                    v-for="esspecialidade in especialidades"
                    :value="
                        // @ts-expect-error
                        esspecialidade.id
                    "
                >
                    {{
                        // @ts-expect-error
                        esspecialidade.descricao
                    }}
                </option>
            </select>
            <!-- Estado -->
            <select
                class="form-select w-1/2"
                v-model="clinicaEnderecoFormData.estado"
            >
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("state") }}
                </option>
                <option
                    v-for="estado in estados"
                    :value="
                        // @ts-expect-error
                        estado.uf
                    "
                >
                    {{
                        // @ts-expect-error
                        estado.nome
                    }}
                </option>
            </select>

            <!-- Cidade -->
            <select
                class="form-select w-1/2"
                v-model="clinicaEnderecoFormData.cidade"
            >
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("city") }}
                </option>
                <option
                    v-for="cidade in cidades"
                    :value="
                        // @ts-expect-error
                        cidade.id
                    "
                >
                    {{
                        // @ts-expect-error
                        cidade.nome
                    }}
                </option>
            </select>

            <!-- Tipo de endereco -->
            <select
                class="form-select w-1/2"
                v-model="clinicaEnderecoFormData.tipo"
            >
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("address") }}
                </option>
                <option
                    v-for="tipo in tipoEndereco"
                    :value="
                        // @ts-expect-error
                        tipo.id
                    "
                >
                    {{
                        // @ts-expect-error
                        tipo.descricao
                    }}
                </option>
            </select>

            <!-- Numero -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">{{
                    $t("number")
                }}</label>
                <input
                    class="form-input"
                    v-mask="'#####'"
                    type="text"
                    placeholder="Ex.: 233"
                    v-model="clinicaEnderecoFormData.numero"
                />
            </div>

            <!-- Complemento -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">{{
                    $t("adjunct")
                }}</label>
                <input
                    class="form-input"
                    type="text"
                    placeholder="Ex.: Apto 12"
                    v-model="clinicaEnderecoFormData.complemento"
                />
            </div>
        </div>

        <hr
            class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-700"
        />

        <div class="flex flex-col items-center font-semibold mt-6">
            <button @click="cadastrarClinica()" class="btn btn-primary w-80">
                Cadastrar
            </button>
        </div>
        <!-- FORMULARIO -->
    </div>
</template>
