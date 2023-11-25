<script lang="ts" setup>
import { useMeta } from "@/composables/use-meta";
import ThemeChanger from "@/components/layout/ThemeChanger.vue";
import LangChanger from "@/components/layout/LangChanger.vue";
import FormLogin from "@/components/layout/login/FormLogin.vue";
import LogoSmallCircle from "@/components/layout/LogoSmallCircle.vue";
import LogoFull from "@/components/layout/LogoFull.vue";
import TextSauvvi from "@/components/layout/TextSauvvi.vue";

useMeta({ title: "Login" });
</script>

<template>
    <div>
        <div class="absolute inset-0">
            <img
                src="/assets/images/auth/bg-gradient.png"
                alt="image"
                class="h-full w-full object-cover" />
        </div>

        <div
            class="relative flex min-h-screen items-center justify-center dark:bg-[#060818] sm:px-16">
            <!-- <div class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"> -->
            <!-- <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[50%]" /> -->

            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                <div
                    class="relative hidden w-full items-center justify-center bg-[linear-gradient(-137deg,rgba(139,18,98,1)_0%,rgba(133,97,238,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                    <!-- <div class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div> -->

                    <div class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
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

                    <FormLogin />

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
