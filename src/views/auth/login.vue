<script lang="ts" setup>
import { useMeta } from "@/composables/use-meta";
import ThemeChanger from "@/components/layout/ThemeChanger.vue";
import LangChanger from "@/components/layout/LangChanger.vue";
import FormLogin from "@/components/layout/login/FormLogin.vue";
import LogoSmallCircle from "@/components/layout/LogoSmallCircle.vue";
import LogoFull from "@/components/layout/LogoFull.vue";
import TextSauvvi from "@/components/layout/TextSauvvi.vue";
import FormRequestPassword from "@/views/password/request-password.vue";
import { ref } from "vue";

useMeta({ title: "Login" });

const login = ref(true);

function mostrarLogin(value: boolean) {
    login.value = value;
}
</script>

<template>
    <div>
        <!-- IMAGEM DE FUNDO (TROCAR) -->
        <div class="absolute inset-0">
            <img
                src="/assets/images/auth/bg-gradient.png"
                alt="image"
                class="h-full w-full object-cover" />
        </div>
        <!-- IMAGEM DE FUNDO -->

        <div
            class="relative flex min-h-screen items-center justify-center sm:px-16">
            <div
                class="relative flex w-full flex-col justify-between overflow-hidden rounded-md lg:min-h-full lg:flex-row lg:gap-10 xl:gap-0">
                <div
                    class="relative hidden w-full items-center justify-center p-5 lg:inline-flex lg:w-full xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                    <div
                        class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg] text-center">
                        <LogoFull />
                    </div>
                </div>

                <div
                    class="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div
                        class="flex w-full max-w-[440px] items-center justify-items-end gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                        <span class="lg:hidden">
                            <LogoSmallCircle />
                        </span>
                        <ThemeChanger />
                        <LangChanger />
                    </div>

                    <FormLogin
                        v-show="login"
                        @update:trocar="mostrarLogin(false)" />
                    <FormRequestPassword
                        v-show="!login"
                        @update:trocar="mostrarLogin(true)" />

                    <button
                        @click="$router.push('/app-policy')"
                        class="lowercase underline">
                        Politica de exclusão de dados
                    </button>

                    <p
                        class="absolute lg:bottom-6 md:bottom-1 bottom-1 w-full text-center dark:text-white mt-10">
                        <TextSauvvi />
                        <br />
                        {{ new Date().getFullYear() }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
