<script>
import Validacao from "@/helpers/ValidacaoInput";
import Response from "@/api/Response";
import Sanitaze from "@/helpers/Sanitaze";
import { useAppStore } from "@/stores";

export default {
    data() {
        return {
            store: useAppStore(),
            clinicaFormData: {
                nome: "",
                especialidade_id: "0",
                cep: "",
                rua: "",
                bairro: "",
                cidade: "0",
                estado: "0",
                tipo: "0",
                numero: "",
                complemento: "",
            },
            estados: {},
            tipoEndereco: {},
            cidades: {},
            especialidades: {},
        };
    },
    watch: {
        async "clinicaFormData.estado"(novo) {
            let cidadeResponse = await this.store.request.pegarDadosApi(
                `/cidade/${novo}`,
            );
            this.cidades = cidadeResponse.list;
        },
    },
    async created() {
        let estadoResponse = await this.store.request.pegarDadosApi(
            "/unidades-federativas",
        );
        this.estados = estadoResponse.list;

        let tipoEderecoResponse =
            await this.store.request.pegarDadosApi("/endereco/tipo");
        this.tipoEndereco = tipoEderecoResponse.list;

        let especialidadeResponse = await this.store.request.pegarDadosApi(
            `/medico/especialidade/${localStorage.getItem("user.id")}`,
        );
        this.especialidades = especialidadeResponse.list;
    },
    methods: {
        async cadastrarClinica() {
            // validar campos
            if (!Validacao.inputVazio(this.clinicaFormData)["status"]) {
                return Response.mensagemErro(
                    "Por favor, preencha todos os campos.",
                );
            }

            this.clinicaFormData.cidade =
                this.clinicaFormData.cidade.toString();

            this.store.request
                .enviarDadosApi("/medico/clinica", this.clinicaFormData)
                .then((res) => {
                    this.clinicaFormData = Sanitaze.clearItems(
                        this.clinicaFormData,
                    );
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          );
                })
                .finally(() => window.location.reload());
        },
    },
};
</script>
<template>
    <div class="grid space-y-6 grid-cols-1 items-center w-full">
        <!-- FORMULARIO -->
        <div class="flex flex-col items-center gap-5 mt-4">
            <!-- Nome da clinica -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname"
                    >{{ $t("name") }}*</label
                >
                <input
                    v-model="clinicaFormData.nome"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Clinica principal" />
            </div>
            <hr />

            <!-- CEP -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname">CEP*</label>
                <input
                    v-mask="'#####-###'"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: 87560-000"
                    @input="
                        ($event) => (clinicaFormData.cep = $event.target.value)
                    " />
            </div>

            <!-- Rua -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname"
                    >{{ $t("street") }}*</label
                >
                <input
                    v-model="clinicaFormData.rua"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Rua mercelo azevedo" />
            </div>

            <!-- Bairro -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname"
                    >{{ $t("neighborhood") }}*</label
                >
                <input
                    v-model="clinicaFormData.bairro"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Centro" />
            </div>

            <hr class="bg-dark" />

            <!-- Especialidade -->
            <select
                v-model="clinicaFormData.especialidade_id"
                class="form-select w-1/2 lowercase dark:text-white">
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("capabilities") }}*
                </option>
                <option
                    v-for="esspecialidade in especialidades"
                    :value="
                        // @ts-expect-error
                        esspecialidade.id
                    ">
                    {{
                        // @ts-expect-error
                        esspecialidade.descricao
                    }}
                </option>
            </select>
            <!-- Estado -->
            <select
                v-model="clinicaFormData.estado"
                class="form-select w-1/2 lowercase dark:text-white">
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("state") }}
                </option>
                <option
                    v-for="estado in estados"
                    :value="
                        // @ts-expect-error
                        estado.uf
                    ">
                    {{
                        // @ts-expect-error
                        estado.nome
                    }}
                </option>
            </select>

            <!-- Cidade -->
            <select
                v-model="clinicaFormData.cidade"
                class="form-select w-1/2 lowercase dark:text-white">
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("city") }}*
                </option>
                <option
                    v-for="cidade in cidades"
                    :value="
                        // @ts-expect-error
                        cidade.id
                    ">
                    {{
                        // @ts-expect-error
                        cidade.nome
                    }}
                </option>
            </select>

            <!-- Tipo de endereco -->
            <select
                v-model="clinicaFormData.tipo"
                class="form-select w-1/2 lowercase dark:text-white">
                <option value="0" disabled selected>
                    {{ $t("select") }} {{ $t("address") }}*
                </option>
                <option
                    v-for="tipo in tipoEndereco"
                    :value="
                        // @ts-expect-error
                        tipo.id
                    ">
                    {{
                        // @ts-expect-error
                        tipo.descricao
                    }}
                </option>
            </select>

            <!-- Numero -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname"
                    >{{ $t("number") }}*</label
                >
                <input
                    v-model="clinicaFormData.numero"
                    v-mask="'#####'"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: 233" />
            </div>

            <!-- Complemento -->
            <div class="w-1/2">
                <label class="capitalize" for="groupFname"
                    >{{ $t("adjunct") }}*</label
                >
                <input
                    v-model="clinicaFormData.complemento"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Ex.: Apto 12" />
            </div>
            <div class="w-1/2">
                <span class="text-sm lowercase"
                    >* {{ $t("required-fields") }}</span
                >
            </div>
        </div>
        <hr
            class="w-80 h-0.5 mx-auto bg-slate-700 border-0 rounded dark:bg-slate-400" />

        <div class="flex flex-col items-center font-semibold mt-6">
            <button class="btn btn-primary w-80" @click="cadastrarClinica()">
                {{ $t("register") }}
            </button>
        </div>
        <!-- FORMULARIO -->
    </div>
</template>
