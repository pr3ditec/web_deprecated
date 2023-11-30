<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";
import VueCollapsible from "vue-height-collapsible/vue3";

import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

const store = useAppStore();
const activeDropdown: any = ref("");
const subActive: any = ref("");

onMounted(() => {});

const toggleMobileMenu = () => {
    store.toggleMobileMenu();
};
</script>
<template>
    <TitleDivision title="user_and_pages" />

    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{ active: activeDropdown === 'users' }"
            @click="
                activeDropdown === 'users'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'users')
            ">
            <div class="flex items-center">
                <svg
                    class="group-hover:!text-primary shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle
                        opacity="0.5"
                        cx="15"
                        cy="6"
                        r="3"
                        fill="currentColor" />
                    <ellipse
                        opacity="0.5"
                        cx="16"
                        cy="17"
                        rx="5"
                        ry="3"
                        fill="currentColor" />
                    <circle cx="9.00098" cy="6" r="4" fill="currentColor" />
                    <ellipse
                        cx="9.00098"
                        cy="17.001"
                        rx="7"
                        ry="4"
                        fill="currentColor" />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t("users") }}</span
                >
            </div>
            <div
                class="rtl:rotate-180"
                :class="{
                    '!rotate-90': activeDropdown === 'users',
                }">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </button>
        <vue-collapsible :isOpen="activeDropdown === 'users'">
            <ul class="sub-menu text-gray-500">
                <li>
                    <router-link
                        to="/users/profile"
                        @click="toggleMobileMenu"
                        >{{ $t("profile") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/users/user-account-settings"
                        @click="toggleMobileMenu"
                        >{{ $t("account_settings") }}</router-link
                    >
                </li>
            </ul>
        </vue-collapsible>
    </li>

    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{ active: activeDropdown === 'pages' }"
            @click="
                activeDropdown === 'pages'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'pages')
            ">
            <div class="flex items-center">
                <svg
                    class="group-hover:!text-primary shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        opacity="0.5"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V10C2 6.22876 2 4.34315 3.17157 3.17157C4.34315 2 6.23869 2 10.0298 2C10.6358 2 11.1214 2 11.53 2.01666C11.5166 2.09659 11.5095 2.17813 11.5092 2.26057L11.5 5.09497C11.4999 6.19207 11.4998 7.16164 11.6049 7.94316C11.7188 8.79028 11.9803 9.63726 12.6716 10.3285C13.3628 11.0198 14.2098 11.2813 15.0569 11.3952C15.8385 11.5003 16.808 11.5002 17.9051 11.5001L18 11.5001H21.9574C22 12.0344 22 12.6901 22 13.5629V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22Z"
                        fill="currentColor" />
                    <path
                        d="M6 13.75C5.58579 13.75 5.25 14.0858 5.25 14.5C5.25 14.9142 5.58579 15.25 6 15.25H14C14.4142 15.25 14.75 14.9142 14.75 14.5C14.75 14.0858 14.4142 13.75 14 13.75H6Z"
                        fill="currentColor" />
                    <path
                        d="M6 17.25C5.58579 17.25 5.25 17.5858 5.25 18C5.25 18.4142 5.58579 18.75 6 18.75H11.5C11.9142 18.75 12.25 18.4142 12.25 18C12.25 17.5858 11.9142 17.25 11.5 17.25H6Z"
                        fill="currentColor" />
                    <path
                        d="M11.5092 2.2601L11.5 5.0945C11.4999 6.1916 11.4998 7.16117 11.6049 7.94269C11.7188 8.78981 11.9803 9.6368 12.6716 10.3281C13.3629 11.0193 14.2098 11.2808 15.057 11.3947C15.8385 11.4998 16.808 11.4997 17.9051 11.4996L21.9574 11.4996C21.9698 11.6552 21.9786 11.821 21.9848 11.9995H22C22 11.732 22 11.5983 21.9901 11.4408C21.9335 10.5463 21.5617 9.52125 21.0315 8.79853C20.9382 8.6713 20.8743 8.59493 20.7467 8.44218C19.9542 7.49359 18.911 6.31193 18 5.49953C17.1892 4.77645 16.0787 3.98536 15.1101 3.3385C14.2781 2.78275 13.862 2.50487 13.2915 2.29834C13.1403 2.24359 12.9408 2.18311 12.7846 2.14466C12.4006 2.05013 12.0268 2.01725 11.5 2.00586L11.5092 2.2601Z"
                        fill="currentColor" />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t("pages") }}</span
                >
            </div>
            <div
                class="rtl:rotate-180"
                :class="{
                    '!rotate-90': activeDropdown === 'pages',
                }">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </button>
        <vue-collapsible :isOpen="activeDropdown === 'pages'">
            <ul class="sub-menu text-gray-500">
                <li>
                    <router-link
                        to="/pages/knowledge-base"
                        @click="toggleMobileMenu"
                        >{{ $t("knowledge_base") }}</router-link
                    >
                </li>
                <li @click="toggleMobileMenu">
                    <router-link to="/pages/contact-us" target="_blank">{{
                        $t("contact_form")
                    }}</router-link>
                </li>
                <li>
                    <router-link to="/pages/faq" @click="toggleMobileMenu">{{
                        $t("faq")
                    }}</router-link>
                </li>
                <li @click="toggleMobileMenu">
                    <router-link to="/pages/coming-soon" target="_blank">{{
                        $t("coming_soon")
                    }}</router-link>
                </li>
                <li class="menu nav-item">
                    <button
                        type="button"
                        class="w-full before:bg-gray-300 before:w-[5px] before:h-[5px] before:rounded ltr:before:mr-2 rtl:before:ml-2 dark:text-[#888ea8] hover:bg-gray-100 dark:hover:bg-gray-900"
                        @click="
                            subActive === 'error'
                                ? (subActive = null)
                                : (subActive = 'error')
                        ">
                        {{ $t("error") }}
                        <div
                            class="ltr:ml-auto rtl:mr-auto rtl:rotate-180"
                            :class="{
                                '!rotate-90': subActive === 'error',
                            }">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M6.25 19C6.25 19.3139 6.44543 19.5946 6.73979 19.7035C7.03415 19.8123 7.36519 19.7264 7.56944 19.4881L13.5694 12.4881C13.8102 12.2073 13.8102 11.7928 13.5694 11.5119L7.56944 4.51194C7.36519 4.27364 7.03415 4.18773 6.73979 4.29662C6.44543 4.40551 6.25 4.68618 6.25 5.00004L6.25 19Z"
                                    fill="currentColor" />
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10.5119 19.5695C10.1974 19.2999 10.161 18.8264 10.4306 18.5119L16.0122 12L10.4306 5.48811C10.161 5.17361 10.1974 4.70014 10.5119 4.43057C10.8264 4.161 11.2999 4.19743 11.5695 4.51192L17.5695 11.5119C17.8102 11.7928 17.8102 12.2072 17.5695 12.4881L11.5695 19.4881C11.2999 19.8026 10.8264 19.839 10.5119 19.5695Z"
                                    fill="currentColor" />
                            </svg>
                        </div>
                    </button>

                    <vue-collapsible :isOpen="subActive === 'error'">
                        <ul :unmount="false" class="sub-menu text-gray-500">
                            <li @click="toggleMobileMenu">
                                <router-link
                                    to="/pages/error404"
                                    target="_blank"
                                    >{{ $t("404") }}</router-link
                                >
                            </li>
                            <li @click="toggleMobileMenu">
                                <router-link
                                    to="/pages/error500"
                                    target="_blank"
                                    >{{ $t("500") }}</router-link
                                >
                            </li>
                            <li @click="toggleMobileMenu">
                                <router-link
                                    to="/pages/error503"
                                    target="_blank"
                                    >{{ $t("503") }}</router-link
                                >
                            </li>
                        </ul>
                    </vue-collapsible>
                </li>
                <li>
                    <router-link to="/pages/maintenence" target="_blank">{{
                        $t("maintenence")
                    }}</router-link>
                </li>
            </ul>
        </vue-collapsible>
    </li>
</template>
