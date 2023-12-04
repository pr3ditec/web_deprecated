<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
const search = ref(false);
</script>

<template>
    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
        <form
            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
            :class="{ '!block': search }"
            @submit.prevent="search = false">
            <div class="relative">
                <input
                    type="text"
                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                    placeholder="Search..." />
                <button
                    type="button"
                    class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                    <svg
                        class="mx-auto"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="11.5"
                            cy="11.5"
                            r="9.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            opacity="0.5" />
                        <path
                            d="M18.5 18.5L22 22"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                    @click="search = false">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                            opacity="0.5"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="1.5" />
                        <path
                            d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </form>

        <button
            type="button"
            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
            @click="search = !search">
            <svg
                class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="11.5"
                    cy="11.5"
                    r="9.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    opacity="0.5" />
                <path
                    d="M18.5 18.5L22 22"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
        </button>
    </div>
</template>
