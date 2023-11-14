<script>
import ComingSoonCover from "@/views/pages/coming-soon-cover.vue";
import { inject } from "vue";

export default {
    data() {
        return {
            // Api para fazer requests
            request: Object(inject("api")),
            // variaveis reativas
            encontrada: true,
            secretaria: {
                nome: "",
            },
            clinicas: {},
        };
    },
    methods: {
        async pesquisarSecretaria(cpf) {
            // escolher mascara
            if (cpf.length == 14) {
                cpf = cpf.replaceAll(".", "").replaceAll("-", "");
                await this.request
                    .pegarDadosApi(`/secretaria/${cpf}`)
                    .then((res) => {
                        console.log(res);
                        if (res.length === undefined) {
                            this.encontrada = true;
                            this.secretaria = res;
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

        criarVinculo() {
            if (this.secretaria.nome != "") {
                console.log("Vinculo solicitado"); // rota ainda nao implementada
            }
        },
    },
    async created() {
        this.clinicas = await this.request.pegarDadosApi(
            `/medico/clinica/${localStorage.getItem("user.id")}/`,
        );
    },
};
</script>

<template>
    <div
        class="flex flex-col items-center gap-1 mt-4 w-1/2"
        v-on:keyup.enter="criarVinculo"
    >
        <h1 class="text-3xl font-bold">Vincular com secretária</h1>
        <hr />
        <div class="w-full flex flex-col gap-0 p-6">
            <label>{{ $t("secretary") }}</label>
            <div class="flex flex-col w-full justify-center">
                <input
                    class="form-input"
                    v-mask="'###.###.###-##'"
                    type="text"
                    placeholder="Digite o cpf ........"
                    v-on:keyup="
                        ($event) => pesquisarSecretaria($event.target.value)
                    "
                />
                <span class="text-danger text-sm" v-show="!encontrada"
                    >secretaria não encontrada</span
                >
                <Transition>
                    <div
                        class="w-full mt-2 bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                        v-show="secretaria.nome != ''"
                    >
                        <div class="p-5 flex items-center flex-col sm:flex-row">
                            <div
                                class="mb-5 w-20 h-20 rounded-full overflow-hidden"
                            >
                                <img
                                    src="/assets/images/profile-12.jpeg"
                                    alt=""
                                    class="w-full h-full object-cover"
                                />
                            </div>
                            <div
                                class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left"
                            >
                                <h5
                                    class="text-[#3b3f5c] text-[15px] font-semibold mb-2 dark:text-white-light"
                                >
                                    {{ secretaria.nome }}
                                </h5>
                                <p class="mb-2 text-white-dark">
                                    {{ $t("secretary") }}
                                </p>
                                <span class="badge bg-primary rounded-full"
                                    >Ativo</span
                                >
                                <p
                                    class="font-semibold text-white-dark mt-4 sm:mt-8"
                                >
                                    Maecenas nec mi vel lacus condimentum
                                    rhoncus dignissim egestas orci. Integer
                                    blandit porta placerat. Vestibulum in
                                    ultricies.
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
                @click="criarVinculo"
                :disabled="secretaria.nome == ''"
            >
                Solicitar vinculo
            </button>
        </div>
    </div>
</template>
