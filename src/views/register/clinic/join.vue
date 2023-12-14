<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores";
export default {
    data() {
        return {
            store: useAppStore(),
            especialidade: [],
            especialidadeSelect: 0,
            // variaveis reativas
            encontrada: true,
            dadosClinicas: [],
        };
    },
    async created() {},
    created() {
        this.pegarEspecialidades();
    },
    methods: {
        async pesquisarMedico(cpf) {
            if (cpf.length == 14) {
                cpf = cpf.replaceAll(".", "").replaceAll("-", "");
                await this.store.request
                    .pegarDadosApi(`/medico/cpf/${cpf}`)
                    .then(async (res) => {
                        if (res.status) {
                            this.encontrada = true;
                            this.dadosClinicas = res.list;
                        } else {
                            this.encontrada = false;
                        }
                    });
            }
        },
        async criarVinculo(clinica) {
            if (this.especialidadeSelect == 0) {
                return;
            } else {
                await Response.mesagemConfirmacao(
                    "question",
                    this.$t("ask"),
                    this.$t("cancel"),
                    this.$t("ask-for-join"),
                ).then((res) => {
                    if (res) {
                        this.store.request
                            .enviarDadosApi("/clinica/medico", {
                                clinica_id: clinica,
                                medico_id: localStorage.getItem("doctor.id"),
                                especialidade_id: this.especialidadeSelect,
                            })
                            .then((response) => {
                                console.log(response);
                                response.status
                                    ? Response.mensagemToast(
                                          "success",
                                          this.$t(response.messageCode),
                                      )
                                    : Response.mensagemToast(
                                          "error",
                                          this.$t(response.messageCode),
                                      );
                            });
                    }
                });
            }
        },

        async pegarEspecialidades() {
            this.store.request
                .pegarDadosApi(
                    `/medico/especialidade/${localStorage.getItem(
                        "doctor.id",
                    )}`,
                )
                .then((res) => {
                    this.especialidade = res.list;
                });
        },
    },
};
</script>

<template>
    <div
        class="flex flex-col items-center gap-1 mt-4 w-1/2"
        @keyup.enter="criarVinculo">
        <h1 class="text-3xl font-bold capitalize">
            {{ $t("join") }} {{ $t("clinic") }}
        </h1>
        <hr />
        <div class="w-full flex flex-col gap-0 p-6">
            <label class="capitalize">{{ $t("doctor") }}</label>
            <div class="flex flex-col w-full justify-center">
                <!-- bucas do meidico -->
                <input
                    v-mask="'###.###.###-##'"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Digite o cpf ........"
                    @keyup="($event) => pesquisarMedico($event.target.value)" />
                <span v-show="!encontrada" class="text-danger text-sm">{{
                    $t("doctor-not-found")
                }}</span>
                <label class="capitalize mt-8">{{ $t("clinic") }}</label>
                <!-- CARD COM CLINICA -->
                <div v-for="clinica in dadosClinicas.clinica">
                    <select
                        v-model="especialidadeSelect"
                        class="form-input dark:text-white">
                        <option value="0">
                            {{ $t("select-capabilites") }}
                        </option>
                        <option v-for="item in especialidade" :value="item.id">
                            {{ item.descricao }}
                        </option>
                    </select>
                    <Transition>
                        <div
                            v-show="encontrada"
                            class="w-full mt-2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none hover:border-slate-900"
                            @click="criarVinculo(clinica.id)">
                            <div
                                class="p-5 flex items-center flex-col sm:flex-row">
                                <div
                                    class="mb-5 w-20 h-20 rounded-full overflow-hidden">
                                    <img
                                        src="/assets/images/logo.png"
                                        alt=""
                                        class="w-full h-full object-cover" />
                                </div>
                                <div
                                    class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                    <h5
                                        class="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light">
                                        {{ clinica.nome }}
                                    </h5>
                                    <p class="mb-2 text-white-dark">
                                        {{ dadosClinicas.nome }}
                                    </p>
                                    <span
                                        class="badge bg-primary rounded-full"
                                        >{{ $t("active") }}</span
                                    >
                                    <p
                                        class="font-semibold text-white-dark mt-4 sm:mt-8 dark:text-white">
                                        {{ $t("clinic-linked") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <hr />
    </div>
</template>
