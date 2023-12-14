<script>
import Response from "@/api/Response";
import { useAppStore } from "@/stores";
import userInfo from "./user-info.vue";

export default {
    components: {
        userInfo,
    },
    data() {
        return {
            store: useAppStore(),
            dadosUsuario: [],
            loading: true,
        };
    },
    created() {
        this.buscarDadosUsuario();
    },
    methods: {
        /** EMIT */

        /** EMIT */

        async buscarDadosUsuario() {
            await this.store.request
                .pegarDadosApi(`/usuario/${this.store.getUserId()}`)
                .then((res) => {
                    if (res.status) {
                        this.dadosUsuario = res.list;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        atualizarDadosUsuario(formUsuario) {
            this.store.request
                .atualizarDadosApi(
                    `/usuario/${localStorage.getItem("user.id")}`,
                    {
                        email: this.dadosUsuario.email,
                        senha: formUsuario.antiga_senha,
                        nova_senha: formUsuario.nova_senha,
                    },
                )
                .then((res) => {
                    console.log(res);
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
        },
    },
};
</script>
<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
        <div class="panel col-span-4">
            <div
                v-if="loading"
                class="flex flex-col items-center justify-center">
                <span
                    class="animate-spin border-4 border-primary border-l-transparent rounded-full w-10 h-10 inline-block mx-auto m-auto mb-10"></span>
            </div>
            <userInfo
                v-else
                @update-user="atualizarDadosUsuario"
                :dados-usuario="dadosUsuario" />
        </div>
        <!-- SEGUNDO PAINEL -->
        <div class="panel col-span-4 xl:col-span-4"></div>
    </div>
</template>
