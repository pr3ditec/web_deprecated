<script lang="ts" setup>
import { ref } from "vue";

const search = ref("");
const emit = defineEmits(["enterAction", "typeAction"]);

function callEmit(nameEmit: any, dataEmit: any) {
    emit(nameEmit, dataEmit);
}
</script>
<template>
    <form
        class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
        @submit.prevent="callEmit('enterAction', search)">
        <div class="relative">
            <input
                type="text"
                class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                @keyup="($event) => callEmit('typeAction', $event.key)"
                v-model="search"
                placeholder="Search..." />
            <button
                @click="callEmit('enterAction', search)"
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
        </div>
    </form>
</template>
