<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores/index";

export default {
    props: ["userId"],
    data() {
        return {
            store: useAppStore(),
            rgcpf: "",
            foto: "",
            // comprovante: "",
        };
    },
    methods: {
        toBase64(id) {
            let fileInput = this.$refs[id].files[0];
            let reader = new FileReader();
            reader.readAsDataURL(fileInput);
            reader.onload = () => {
                this[id] = reader.result.split(",")[1];
            };
            reader.onerror = (error) => {
                console.log("Erro ao converter para Base64:", error);
            };
        },
        async enviarDocumentos() {
            try {
                let data = {
                    selfie: this.foto,
                    documento_frente: this.rgcpf,
                };

                await this.store.request
                    .enviarDadosApi("/foto/validar", data)
                    .then((res) => {
                        console.log(res);
                        if (res.status == false) {
                            return Response.mensagemErro(
                                this.$t(res.messageCode),
                            );
                        } else {
                            Response.mensagemSucesso(this.$t(res.messageCode));
                            // Avança para a próxima etapa do form-wizard
                            this.$emit("nextTab");
                        }
                    });
                console.log(this.userId);

                // data = {
                //     comprovante_residencia: this.comprovante,
                //     paciente_id: this.userId,
                // };
                // await this.store.request
                //     .enviarDadosApi("/comprovante-residencia/validar", data)
                //     .then((res) => {
                //         console.log(res);
                //         if (res.status == false) {
                //             return Response.mensagemErro(
                //                 this.$t(res.messageCode),
                //             );
                //         } else {
                //             Response.mensagemSucesso(this.$t(res.messageCode));
                //             // Avança para a próxima etapa do form-wizard
                //             this.$emit("nextTab");
                //         }
                //     });
            } catch (error) {
                console.error("Ocorreu um erro:", error);
            }
        },
    },
};
</script>

<template>
    <div class="p-8 panel h-full">
        <div class="mb-4">
            <label for="rgcpf">RG ou CPF - Frente e Verso:</label>
            <input
                type="file"
                id="rgcpf"
                ref="rgcpf"
                @change="toBase64('rgcpf')" />
        </div>
        <div class="mb-4">
            <label for="foto">foto:</label>
            <input
                type="file"
                id="foto"
                ref="foto"
                @change="toBase64('foto')" />
        </div>

        <!-- <div class="mb-4">
            <label for="comprovante">Comprovante de Endereço:</label>
            <input
                type="file"
                id="comprovante"
                ref="comprovante"
                @change="toBase64('comprovante')" />
        </div> -->
        <button
            @click="enviarDocumentos"
            class="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 focus:ring-green-500">
            Enviar Documentos
        </button>
    </div>
</template>
