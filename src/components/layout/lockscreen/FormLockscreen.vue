<script lang="ts" setup>
import axios from "axios";
import Swal from "sweetalert2";

import { useAppStore } from "@/stores/index";
const store = useAppStore();

import { useRouter } from "vue-router";
const router = useRouter();

import { useMeta } from "@/composables/use-meta";
import { computed, reactive, ref } from "vue";

const userName = store.getUserName();
</script>

<template>
    <div class="w-full max-w-[440px] lg:mt-16">
        <div class="mb-10 flex items-center">
            <div
                class="flex h-16 w-16 items-end justify-center overflow-hidden rounded-full bg-white ltr:mr-4 rtl:ml-4">
                <img
                    src="/assets/images/logo.png"
                    class="w-full object-cover"
                    alt="images" />
            </div>

            <div class="flex-1">
                <h1 class="text-2xl text-warning" v-text="userName"></h1>
                <p class="text-base font-bold leading-normal text-white-dark">
                    Enter your password to unlock your ID
                </p>
            </div>
        </div>

        <form
            class="space-y-5 dark:text-white"
            @submit.prevent="router.push('/')">
            <div>
                <label for="Password">Password</label>
                <div class="relative text-white-dark">
                    <input
                        id="Password"
                        type="password"
                        placeholder="Enter Password"
                        class="form-input ps-10 placeholder:text-white-dark" />
                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none">
                            <path
                                opacity="0.5"
                                d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z"
                                fill="currentColor" />
                            <path
                                d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z"
                                fill="currentColor" />
                            <path
                                d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z"
                                fill="currentColor" />
                            <path
                                d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z"
                                fill="currentColor" />
                            <path
                                d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z"
                                fill="currentColor" />
                        </svg>
                    </span>
                </div>
            </div>

            <button
                type="submit"
                class="btn btn-gradient text-shadow bg-warning !mt-6 w-full border-2 border-black-dark-light uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                UNLOCK
            </button>
        </form>
    </div>
</template>

<style scoped>
.text-shadow {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    box-shadow: none;
}
</style>
