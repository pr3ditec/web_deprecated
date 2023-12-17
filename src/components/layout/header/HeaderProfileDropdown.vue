<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";

import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/index";

const store = useAppStore();
const route = useRoute();

onMounted(() => {
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const setActiveDropdown = () => {
    const selector = document.querySelector(
        'ul.horizontal-menu a[href="' + window.location.pathname + '"]',
    );
    if (selector) {
        selector.classList.add("active");
        const all: any = document.querySelectorAll(
            "ul.horizontal-menu .nav-link.active",
        );
        for (let i = 0; i < all.length; i++) {
            all[0]?.classList.remove("active");
        }
        const ul: any = selector.closest("ul.sub-menu");
        if (ul) {
            let ele: any = ul.closest("li.menu").querySelectorAll(".nav-link");
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele?.classList.add("active");
                });
            }
        }
    }
};

const userName = computed(() => {
    let fullName = store.getUserName();
    if (fullName === null) {
        return null;
    }

    let firstName = fullName.split(" ")[0];

    return firstName;
});
</script>

<template>
    <div class="dropdown shrink-0">
        <Popper
            :placement="
                store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'
            "
            offsetDistance="8"
            class="!block">
            <button type="button" class="relative group block">
                <img
                    v-show="store.theme === 'light'"
                    class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/logos/plus-light.png"
                    alt="" />

                <img
                    v-show="store.theme === 'dark'"
                    class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/logos/plus-dark.png"
                    alt="" />
            </button>

            <template #content="{ close }">
                <ul
                    class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                    <li>
                        <div class="flex items-center px-4 py-4">
                            <div class="flex-none">
                                <img
                                    v-show="store.theme === 'light'"
                                    class="rounded-md w-10 h-10 object-cover"
                                    src="/assets/images/logos/plus-light.png"
                                    alt="" />
                                <img
                                    v-show="store.theme === 'dark'"
                                    class="rounded-md w-10 h-10 object-cover"
                                    src="/assets/images/logos/plus-dark.png"
                                    alt="" />
                            </div>
                            <div class="ltr:pl-1 rtl:pr-1 truncate">
                                <h4 class="text-base">
                                    <span v-text="userName"></span>
                                    <span
                                        class="text-xs bg-success-light rounded text-success px-1 ltr:ml-1 rtl:ml-1"
                                        >Adm</span
                                    >
                                </h4>
                                <a
                                    class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                    href="javascript:;"
                                    >admin@sauvvitech.com</a
                                >
                            </div>
                        </div>
                    </li>
                    <li>
                        <router-link
                            to="/users/profile"
                            class="dark:hover:text-white"
                            @click="close()">
                            <svg
                                class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle
                                    cx="12"
                                    cy="6"
                                    r="4"
                                    stroke="currentColor"
                                    stroke-width="1.5" />
                                <path
                                    opacity="0.5"
                                    d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"
                                    stroke="currentColor"
                                    stroke-width="1.5" />
                            </svg>

                            {{ $t("profile") }}
                        </router-link>
                    </li>
                    <div v-if="false">
                        <li>
                            <router-link
                                to="/apps/mailbox"
                                class="dark:hover:text-white"
                                @click="close()">
                                <svg
                                    class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        opacity="0.5"
                                        d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                        stroke="currentColor"
                                        stroke-width="1.5" />
                                    <path
                                        d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>

                                {{ $t("mailbox") }}
                            </router-link>
                        </li>

                        <li>
                            <router-link
                                to="/auth/lockscreen"
                                class="dark:hover:text-white"
                                @click="close()">
                                <svg
                                    class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                        stroke="currentColor"
                                        stroke-width="1.5" />
                                    <path
                                        opacity="0.5"
                                        d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round" />
                                    <g opacity="0.5">
                                        <path
                                            d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z"
                                            fill="currentColor" />
                                        <path
                                            d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                                            fill="currentColor" />
                                        <path
                                            d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                                            fill="currentColor" />
                                    </g>
                                </svg>

                                {{ $t("lockscreen") }}
                            </router-link>
                        </li>
                    </div>
                    <li
                        class="border-t border-white-light dark:border-white-light/10">
                        <router-link
                            to="/auth/logout"
                            class="text-danger !py-3"
                            @click="close()">
                            <svg
                                class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M17 9.00195C19.175 9.01406 20.3529 9.11051 21.1213 9.8789C22 10.7576 22 12.1718 22 15.0002V16.0002C22 18.8286 22 20.2429 21.1213 21.1215C20.2426 22.0002 18.8284 22.0002 16 22.0002H8C5.17157 22.0002 3.75736 22.0002 2.87868 21.1215C2 20.2429 2 18.8286 2 16.0002L2 15.0002C2 12.1718 2 10.7576 2.87868 9.87889C3.64706 9.11051 4.82497 9.01406 7 9.00195"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round" />
                                <path
                                    d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>

                            {{ $t("signout") }}
                        </router-link>
                    </li>
                </ul>
            </template>
        </Popper>
    </div>
</template>
