<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useMeta } from "@/composables/use-meta";
import ThemeChanger from "@/components/layout/ThemeChanger.vue";
import LangChanger from "@/components/layout/LangChanger.vue";
import LogoSmallCircle from "@/components/layout/LogoSmallCircle.vue";
import LogoFull from "@/components/layout/LogoFull.vue";
import TextSauvvi from "@/components/layout/TextSauvvi.vue";

import FormPasswordReset from "@/components/layout/password-reset/FormPasswordReset.vue";

useMeta({ title: "Reset Password" });
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
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <div
                class="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                <div
                    class="flex w-full max-w-[440px] items-center justify-items-end gap-2 lg:absolute lg:end-6 lg:top-6 lg:max-w-full">
                    <span class="lg:hidden">
                        <LogoSmallCircle />
                    </span>
                    <ThemeChanger />
                    <LangChanger />
                </div>

                <div
                    class="relative hidden w-full items-center justify-center linear-background p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                    <div
                        class="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
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

                    <FormPasswordReset />

                    <p
                        class="absolute bottom-6 w-full text-center dark:text-white">
                        <TextSauvvi />
                        <br />
                        {{ new Date().getFullYear() }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.linear-background {
    background: linear-gradient(
        -137deg,
        rgb(18, 139, 68) 0%,
        rgba(133, 97, 238, 1) 100%
    );
}

.dark .linear-background {
    background: linear-gradient(
        -137deg,
        rgb(18, 139, 68) 0%,
        rgba(133, 97, 238, 1) 100%
    );
}

.text-shadow {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    box-shadow: none;
}
</style>
