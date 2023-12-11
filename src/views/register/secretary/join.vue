<script>
import Response from "@/api/Response";

export default {
    data() {
        return {
            // variaveis reativas
            encontrada: true,
            secretaria: {
                nome: "",
            },
            clinicas: {},
        };
    },
    async created() {
        let clinicasResponse = await this.$api.pegarDadosApi(
            `/medico/clinica/${localStorage.getItem("user.id")}/`,
        );
        this.clinicas = clinicasResponse.list;
    },
    methods: {
        async pesquisarSecretaria(cpf) {
            // escolher mascara
            if (cpf.length == 14) {
                cpf = cpf.replaceAll(".", "").replaceAll("-", "");
                await this.$api
                    .pegarDadosApi(`/secretaria/${cpf}`)
                    .then((res) => {
                        if (res.status) {
                            this.encontrada = true;
                            this.secretaria = res.list;
                        } else {
                            this.encontrada = false;
                        }
                    });
            } else {
                this.secretaria = {
                    nome: "",
                };
            }
        },

        async criarVinculo() {
            if (this.secretaria.nome != "") {
                await this.$api
                    .enviarDadosApi("/secretaria/medico", {
                        secretaria_id: this.secretaria.secretaria_id,
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
            }
        },
    },
};
</script>

<template>
    <div
        class="flex flex-col items-center gap-1 mt-4 w-1/2"
        @keyup.enter="criarVinculo">
        <h1 class="text-3xl font-bold">{{ $t("ask-for-join") }}</h1>
        <hr />
        <div class="w-full flex flex-col gap-0 p-6">
            <label>{{ $t("secretary") }}</label>
            <div class="flex flex-col w-full justify-center">
                <input
                    v-mask="'###.###.###-##'"
                    class="form-input dark:text-white"
                    type="text"
                    placeholder="Digite o cpf ..."
                    @keyup="
                        ($event) => pesquisarSecretaria($event.target.value)
                    " />
                <span v-show="!encontrada" class="text-danger text-sm">{{
                    $t("secretary-not-found")
                }}</span>
                <Transition>
                    <div
                        v-show="secretaria.nome != ''"
                        class="w-full mt-2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                        <div class="p-5 flex items-center flex-col sm:flex-row">
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
                                    {{ secretaria.nome }}
                                </h5>
                                <p class="mb-2 text-white-dark">
                                    {{ $t("secretary") }}
                                </p>
                                <span class="badge bg-primary rounded-full"
                                    >Ativo</span
                                >
                                <p
                                    class="font-semibold text-white-dark mt-4 sm:mt-8 dark:text-white">
                                    {{ $t("secretary-linked") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
        <hr />
        <div class="flex flex-col items-center font-semibold mt-2">
            <button
                class="btn btn-primary w-80"
                :class="{ 'btn-dark': secretaria.nome == '' }"
                :disabled="secretaria.nome == ''"
                @click="criarVinculo">
                {{ $t("ask-for-join") }}
            </button>
        </div>
    </div>
</template>
