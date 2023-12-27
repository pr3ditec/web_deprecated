<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    props: ["userId", "verificacaoFinalizacao"],
    data() {
        return {
            store: useAppStore(),
            rgf: "",
            rgv: "",
            cnh: "",
            foto: "",
            enviando: false,
        };
    },
    methods: {
        toBase64(id) {
            return new Promise((resolve, reject) => {
                let fileInput = this.$refs[id].files[0];
                if (fileInput) {
                    let reader = new FileReader();
                    reader.readAsDataURL(fileInput);
                    reader.onload = () => {
                        this[id] = reader.result.split(",")[1];
                        resolve();
                    };
                    reader.onerror = (error) => {
                        console.log("Erro ao converter para Base64:", error);
                        reject(error);
                    };
                } else {
                    console.log("Nenhum arquivo selecionado.");
                    reject(new Error("Nenhum arquivo selecionado."));
                }
            });
        },

        finalize() {
            // Finalizar o componente
            this.$emit("finalize", "Documents");
        },

        async enviarDocumentos() {
            if (
                !this.verificacaoFinalizacao.some(
                    (obj) => obj.Questions === "finalizado",
                )
            ) {
                this.$emit("prevTab");
                return Response.mensagemErro(
                    this.$t("please-complete-previous-step-proceed"),
                );
            }

            this.enviando = true;
            try {
                let promises = [];
                if (this.$refs["foto"].files[0])
                    promises.push(this.toBase64("foto"));
                if (this.$refs["cnh"].files[0])
                    promises.push(this.toBase64("cnh"));
                if (this.$refs["rgf"].files[0])
                    promises.push(this.toBase64("rgf"));
                if (this.$refs["rgv"].files[0])
                    promises.push(this.toBase64("rgv"));

                await Promise.all(promises);

                if (!this.foto) {
                    this.enviando = false;
                    return Response.mensagemErro(this.$t("photo-is-mandatory"));
                }

                if (!this.cnh && (!this.rgf || !this.rgv)) {
                    this.enviando = false;
                    return Response.mensagemErro(
                        this.$t("you-must-send-your-drivers-license-or-id"),
                    );
                }

                let data = {};
                if (this.cnh) {
                    data = {
                        selfie: this.foto,
                        documento_frente: this.cnh,
                    };
                } else {
                    data = {
                        selfie: this.foto,
                        documento_frente: this.rgf,
                        documento_verso: this.rgv,
                    };
                }

                await this.store.request
                    .enviarDadosApi("/foto/validar", data)
                    .then((res) => {
                        if (res.status == false) {
                            this.enviando = false;
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            this.enviando = false;
                            Response.mensagemSucesso(this.$t(res.messageCode));
                            this.finalize();
                            this.cadastrarDocumentoCelcoin();
                            // Avança para a próxima etapa do form-wizard
                            this.$emit("nextTab");
                        }
                    });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },

        async cadastrarDocumentoCelcoin() {
            try {
                await this.store.request
                    .enviarDadosApi("celcoin/pessoa/documento-cadastrar")
                    .then((res) => {
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
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
    <div class="p-8 panel h-full bg-gray-100 rounded-lg shadow-md">
        <div class="mb-4">
            <p class="text-red-500">
                * A foto do rosto é obrigatória. Você pode escolher entre enviar
                a CNH ou o RG (frente e verso).
            </p>
        </div>

        <div class="mb-4">
            <label
                for="foto"
                class="block text-sm font-medium text-gray-700 dark:text-white"
                >Foto:</label
            >
            <input
                type="file"
                id="foto"
                ref="foto"
                @change="toBase64('foto')"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>

        <div class="mb-4">
            <label
                for="cnh"
                class="block text-sm font-medium text-gray-700 dark:text-white"
                >CNH:</label
            >
            <input
                type="file"
                id="cnh"
                ref="cnh"
                @change="toBase64('cnh')"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
            <label
                for="rgf"
                class="block text-sm font-medium text-gray-700 dark:text-white"
                >RG Frente:</label
            >
            <input
                type="file"
                id="rgf"
                ref="rgf"
                @change="toBase64('rgf')"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
            <label
                for="rgv"
                class="block text-sm font-medium text-gray-700 dark:text-white"
                >RG Verso:</label
            >
            <input
                type="file"
                id="rgv"
                ref="rgv"
                @change="toBase64('rgv')"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button
            @click="enviarDocumentos"
            :disabled="enviando"
            class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            Enviar Documentos
        </button>
    </div>
</template>
