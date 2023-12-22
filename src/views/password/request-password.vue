<script>
import { useAppStore } from "@/stores";
import Response from "@/api/Response";
export default {
    data() {
        return {
            store: useAppStore(),
            email: "",
        };
    },
    methods: {
        async recuperarSenha() {
            await this.store.request
                .enviarDadosApi("/recuperacao-senha", {
                    email: this.email,
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
        },
    },
    computed: {
        emailPlaceholder() {
            return this.$t("type-email");
        },
    },
};
</script>
<template>
    <div class="flex flex-col gap-4 w-3/4">
        <div class="mb-10">
            <h1
                class="text-md font-extrabold uppercase !leading-snug text-danger md:text-3xl text-shadow">
                {{ $t("password_recovery") }}
            </h1>
            <p class="text-base font-bold leading-normal text-white-dark">
                {{ $t("enterCredentialsToContinue") }}
            </p>
        </div>
        <div class="flex flex-col mt-4">
            <label class="capitalize mb-0">Email</label>
            <input
                type="text"
                :placeholder="emailPlaceholder"
                class="form-input p-2"
                v-model="email" />
        </div>
        <div>
            <button
                type="button"
                class="btn btn-dark mx-auto w-full dark:btn-primary"
                @click="recuperarSenha">
                {{ $t("ask") }}
            </button>
        </div>
        <div class="text-center dark:text-white">
            <label
                @click="$emit('update:trocar')"
                class="cursor-pointer text-center text-primary underline transition hover:text-black dark:hover:text-white"
                >{{ $t("do-login") }}</label
            >
        </div>
    </div>
</template>
