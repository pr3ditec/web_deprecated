<script lang="ts" setup>
import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/index";
import LogoIcon from "@/components/icons/LogoIcon.vue";

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
            hover
            :placement="
                store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'
            "
            offsetDistance="8"
            class="!block">
            <button type="button" class="relative group block">
                <LogoIcon h="29" w="46" />
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
                    <li
                        class="border-t border-white-light dark:border-white-light/10">
                        <router-link
                            to="/auth/login"
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
