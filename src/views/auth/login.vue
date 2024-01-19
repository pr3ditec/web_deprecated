<script lang="ts" setup>
import { useMeta } from "@/composables/use-meta";
import ThemeChanger from "@/components/layout/ThemeChanger.vue";
import LangChanger from "@/components/layout/LangChanger.vue";
import FormLogin from "@/components/layout/login/FormLogin.vue";
import LogoSmallCircle from "@/components/layout/LogoSmallCircle.vue";
import LogoFull from "@/components/layout/LogoFull.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import { ref } from "vue";

useMeta({ title: "Login" });
</script>

<template>
    <div>

        <div class="relative flex h-full items-center justify-center">
            <div
                class="relative flex w-full flex-col justify-between overflow-hidden lg:h-screen lg:flex-row lg:gap-10 xl:gap-0">
                <div
                    class="relative hidden w-full items-center bg-blue-800 dark:bg-blue-600 justify-center p-5 lg:inline-flex h-screen lg:w-full xl:-ms-28 ltr:xl:skew-x-[14deg]">
                    <div
                        class="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg] text-center">
                        <LogoIcon h="339" w="356" />
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
                </div>
            </div>
        </div>
    </div>
</template>
