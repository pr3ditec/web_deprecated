<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useAppStore } from "@/stores/index";
import VueCollapsible from "vue-height-collapsible/vue3";

import TitleDivision from "@/components/layout/sidebar-items/TitleDivision.vue";

const store = useAppStore();
const activeDropdown: any = ref("");
const subActive: any = ref("");

onMounted(() => {
    const selector = document.querySelector(
        '.sidebar ul a[href="' + window.location.pathname + '"]',
    );

    if (selector) {
        selector.classList.add("active");
        const ul: any = selector.closest("ul.sub-menu");

        if (ul) {
            let ele: any =
                ul.closest("li.menu").querySelectorAll(".nav-link") || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    store.toggleMobileMenu();
};
</script>

<template>
    <TitleDivision title="register" />

    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{ active: activeDropdown === 'register' }"
            @click="
                activeDropdown === 'register'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'register')
            "
        >
            <div class="flex items-center">
                <svg
                    class="group-hover:!text-primary shrink-0"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        opacity="0.5"
                        d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                        fill="currentColor"
                    />
                    <path
                        d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                        fill="currentColor"
                    />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                >
                    {{ $t("register") }}
                </span>
            </div>
            <div
                class="rtl:rotate-180"
                :class="{ '!rotate-90': activeDropdown === 'register' }"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 5L15 12L9 19"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
        </button>

        <vue-collapsible :isOpen="activeDropdown === 'register'">
            <ul class="sub-menu text-gray-500">
                <li>
                    <router-link to="/secretaria" @click="toggleMobileMenu()">{{
                        $t("Secretaria")
                    }}</router-link>
                </li>
                <li>
                    <router-link to="/clinica" @click="toggleMobileMenu()">{{
                        $t("Clinica")
                    }}</router-link>
                </li>
            </ul>
        </vue-collapsible>
    </li>
</template>
