<script lang="ts" setup>
import { ref } from "vue";

import { useAppStore } from "@/stores/index";
const store = useAppStore();

const removeMessage = (value: number) => {
    messages.value = messages.value.filter((d) => d.id !== value);
};

const messages = ref([
    {
        id: 1,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
        title: "Congratulations!",
        message: "Your OS has been updated.",
        time: "1hr",
    },
    {
        id: 2,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
        title: "Did you know?",
        message: "You can switch between artboards.",
        time: "2hr",
    },
    {
        id: 3,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
        title: "Something went wrong!",
        message: "Send Reposrt",
        time: "2days",
    },
    {
        id: 4,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
        title: "Warning",
        message: "Your password strength is low.",
        time: "5days",
    },
]);
</script>

<template>
    <div class="dropdown shrink-0">
        <Popper
            :placement="
                store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'
            "
            offsetDistance="8">
            <button
                type="button"
                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22 10C22.0185 10.7271 22 11.0542 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H13"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round" />
                    <path
                        d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round" />
                    <circle
                        cx="19"
                        cy="5"
                        r="3"
                        stroke="currentColor"
                        stroke-width="1.5" />
                </svg>
            </button>

            <template #content="{ close }">
                <ul
                    class="top-11 !py-0 text-dark dark:text-white-dark w-[300px] sm:w-[375px] text-xs">
                    <li class="mb-5">
                        <div
                            class="overflow-hidden relative rounded-t-md !p-5 text-white">
                            <div
                                class="absolute h-full w-full bg-[url('/assets/images/menu-heade.jpg')] bg-no-repeat bg-center bg-cover inset-0"></div>
                            <h4 class="font-semibold relative z-10 text-lg">
                                Messages
                            </h4>
                        </div>
                    </li>

                    <template v-for="msg in messages" :key="msg.id">
                        <li>
                            <div class="flex items-center py-3 px-5">
                                <div v-html="msg.image"></div>
                                <span class="px-3 dark:text-gray-500">
                                    <div
                                        class="font-semibold text-sm dark:text-white-light/90"
                                        v-text="msg.title"></div>
                                    <div v-text="msg.message"></div>
                                </span>
                                <span
                                    class="font-semibold bg-white-dark/20 rounded text-dark/60 px-1 ltr:ml-auto rtl:mr-auto whitespace-pre dark:text-white-dark ltr:mr-2 rtl:ml-2"
                                    v-text="msg.time"></span>
                                <button
                                    type="button"
                                    class="text-neutral-300 hover:text-danger"
                                    @click="removeMessage(msg.id)">
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
                        </li>
                    </template>

                    <template v-if="messages.length">
                        <li
                            class="border-t border-white-light text-center dark:border-white/10 mt-5">
                            <div
                                class="flex items-center py-4 px-5 text-primary font-semibold group dark:text-gray-400 justify-center cursor-pointer"
                                @click="close()">
                                <span
                                    class="group-hover:underline ltr:mr-1 rtl:ml-1"
                                    >VIEW ALL ACTIVITIES</span
                                >

                                <svg
                                    class="w-4 h-4 group-hover:translate-x-1 transition duration-300 ltr:ml-1 rtl:mr-1"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4 12H20M20 12L14 6M20 12L14 18"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </li>
                    </template>

                    <template v-if="!messages.length">
                        <li class="mb-5">
                            <div
                                class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                <div
                                    class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            opacity="0.5"
                                            d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                                            fill="currentColor" />
                                        <path
                                            d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                                            fill="currentColor" />
                                        <path
                                            d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                                            fill="currentColor" />
                                    </svg>
                                </div>
                                No data available.
                            </div>
                        </li>
                    </template>
                </ul>
            </template>
        </Popper>
    </div>
</template>
