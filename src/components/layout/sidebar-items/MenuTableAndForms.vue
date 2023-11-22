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
    <TitleDivision title="tables_and_forms" />

    <li class="menu nav-item">
        <router-link
            to="/tables"
            class="nav-link group"
            @click="toggleMobileMenu"
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
                        d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.75 8C18.75 8.41421 18.4142 8.75 18 8.75H6C5.58579 8.75 5.25 8.41421 5.25 8C5.25 7.58579 5.58579 7.25 6 7.25H18C18.4142 7.25 18.75 7.58579 18.75 8Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.75 12C18.75 12.4142 18.4142 12.75 18 12.75H6C5.58579 12.75 5.25 12.4142 5.25 12C5.25 11.5858 5.58579 11.25 6 11.25H18C18.4142 11.25 18.75 11.5858 18.75 12Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.75 16C18.75 16.4142 18.4142 16.75 18 16.75H6C5.58579 16.75 5.25 16.4142 5.25 16C5.25 15.5858 5.58579 15.25 6 15.25H18C18.4142 15.25 18.75 15.5858 18.75 16Z"
                        fill="currentColor"
                    />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t("tables") }}</span
                >
            </div>
        </router-link>
    </li>

    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{
                active: activeDropdown === 'datatables',
            }"
            @click="
                activeDropdown === 'datatables'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'datatables')
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
                        d="M4.97883 9.68508C2.99294 8.89073 2 8.49355 2 8C2 7.50645 2.99294 7.10927 4.97883 6.31492L7.7873 5.19153C9.77318 4.39718 10.7661 4 12 4C13.2339 4 14.2268 4.39718 16.2127 5.19153L19.0212 6.31492C21.0071 7.10927 22 7.50645 22 8C22 8.49355 21.0071 8.89073 19.0212 9.68508L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L4.97883 9.68508Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 8C2 8.49355 2.99294 8.89073 4.97883 9.68508L7.7873 10.8085C9.77318 11.6028 10.7661 12 12 12C13.2339 12 14.2268 11.6028 16.2127 10.8085L19.0212 9.68508C21.0071 8.89073 22 8.49355 22 8C22 7.50645 21.0071 7.10927 19.0212 6.31492L16.2127 5.19153C14.2268 4.39718 13.2339 4 12 4C10.7661 4 9.77318 4.39718 7.7873 5.19153L4.97883 6.31492C2.99294 7.10927 2 7.50645 2 8Z"
                        fill="currentColor"
                    />
                    <path
                        opacity="0.7"
                        d="M5.76613 10L4.97883 10.3149C2.99294 11.1093 2 11.5065 2 12C2 12.4935 2.99294 12.8907 4.97883 13.6851L7.7873 14.8085C9.77318 15.6028 10.7661 16 12 16C13.2339 16 14.2268 15.6028 16.2127 14.8085L19.0212 13.6851C21.0071 12.8907 22 12.4935 22 12C22 11.5065 21.0071 11.1093 19.0212 10.3149L18.2339 10L16.2127 10.8085C14.2268 11.6028 13.2339 12 12 12C10.7661 12 9.77318 11.6028 7.7873 10.8085L5.76613 10Z"
                        fill="currentColor"
                    />
                    <path
                        opacity="0.4"
                        d="M5.76613 14L4.97883 14.3149C2.99294 15.1093 2 15.5065 2 16C2 16.4935 2.99294 16.8907 4.97883 17.6851L7.7873 18.8085C9.77318 19.6028 10.7661 20 12 20C13.2339 20 14.2268 19.6028 16.2127 18.8085L19.0212 17.6851C21.0071 16.8907 22 16.4935 22 16C22 15.5065 21.0071 15.1093 19.0212 14.3149L18.2339 14L16.2127 14.8085C14.2268 15.6028 13.2339 16 12 16C10.7661 16 9.77318 15.6028 7.7873 14.8085L5.76613 14Z"
                        fill="currentColor"
                    />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t("datatables") }}</span
                >
            </div>
            <div
                class="rtl:rotate-180"
                :class="{
                    '!rotate-90': activeDropdown === 'datatables',
                }"
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
        <vue-collapsible :isOpen="activeDropdown === 'datatables'">
            <ul class="sub-menu text-gray-500">
                <li>
                    <router-link
                        to="/datatables/basic"
                        @click="toggleMobileMenu"
                        >{{ $t("basic") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/advanced"
                        @click="toggleMobileMenu"
                        >{{ $t("advanced") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/skin"
                        @click="toggleMobileMenu"
                        >{{ $t("skin") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/order-sorting"
                        @click="toggleMobileMenu"
                        >{{ $t("order_sorting") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/columns-filter"
                        @click="toggleMobileMenu"
                        >{{ $t("columns_filter") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/multi-column"
                        @click="toggleMobileMenu"
                        >{{ $t("multi_column") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/multiple-tables"
                        @click="toggleMobileMenu"
                        >{{ $t("multiple_tables") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/alt-pagination"
                        @click="toggleMobileMenu"
                        >{{ $t("alt_pagination") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/checkbox"
                        @click="toggleMobileMenu"
                        >{{ $t("checkbox") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/range-search"
                        @click="toggleMobileMenu"
                        >{{ $t("range_search") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/export"
                        @click="toggleMobileMenu"
                        >{{ $t("export") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/sticky-header"
                        @click="toggleMobileMenu"
                        >{{ $t("sticky_header") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/clone-header"
                        @click="toggleMobileMenu"
                        >{{ $t("clone_header") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/datatables/column-chooser"
                        @click="toggleMobileMenu"
                        >{{ $t("column_chooser") }}</router-link
                    >
                </li>
            </ul>
        </vue-collapsible>
    </li>

    <li class="menu nav-item">
        <button
            type="button"
            class="nav-link group w-full"
            :class="{ active: activeDropdown === 'forms' }"
            @click="
                activeDropdown === 'forms'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'forms')
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
                        d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z"
                        fill="currentColor"
                    />
                    <path
                        d="M16.5189 16.5013C16.6939 16.3648 16.8526 16.2061 17.1701 15.8886L21.1275 11.9312C21.2231 11.8356 21.1793 11.6708 21.0515 11.6264C20.5844 11.4644 19.9767 11.1601 19.4083 10.5917C18.8399 10.0233 18.5356 9.41561 18.3736 8.94849C18.3292 8.82066 18.1644 8.77687 18.0688 8.87254L14.1114 12.8299C13.7939 13.1474 13.6352 13.3061 13.4987 13.4811C13.3377 13.6876 13.1996 13.9109 13.087 14.1473C12.9915 14.3476 12.9205 14.5606 12.7786 14.9865L12.5951 15.5368L12.3034 16.4118L12.0299 17.2323C11.9601 17.4419 12.0146 17.6729 12.1708 17.8292C12.3271 17.9854 12.5581 18.0399 12.7677 17.9701L13.5882 17.6966L14.4632 17.4049L15.0135 17.2214L15.0136 17.2214C15.4394 17.0795 15.6524 17.0085 15.8527 16.913C16.0891 16.8004 16.3124 16.6623 16.5189 16.5013Z"
                        fill="currentColor"
                    />
                    <path
                        d="M22.3665 10.6922C23.2112 9.84754 23.2112 8.47812 22.3665 7.63348C21.5219 6.78884 20.1525 6.78884 19.3078 7.63348L19.1806 7.76071C19.0578 7.88348 19.0022 8.05496 19.0329 8.22586C19.0522 8.33336 19.0879 8.49053 19.153 8.67807C19.2831 9.05314 19.5288 9.54549 19.9917 10.0083C20.4545 10.4712 20.9469 10.7169 21.3219 10.847C21.5095 10.9121 21.6666 10.9478 21.7741 10.9671C21.945 10.9978 22.1165 10.9422 22.2393 10.8194L22.3665 10.6922Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H14.5C14.9142 8.25 15.25 8.58579 15.25 9C15.25 9.41421 14.9142 9.75 14.5 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9ZM7.25 13C7.25 12.5858 7.58579 12.25 8 12.25H11C11.4142 12.25 11.75 12.5858 11.75 13C11.75 13.4142 11.4142 13.75 11 13.75H8C7.58579 13.75 7.25 13.4142 7.25 13ZM7.25 17C7.25 16.5858 7.58579 16.25 8 16.25H9.5C9.91421 16.25 10.25 16.5858 10.25 17C10.25 17.4142 9.91421 17.75 9.5 17.75H8C7.58579 17.75 7.25 17.4142 7.25 17Z"
                        fill="currentColor"
                    />
                </svg>

                <span
                    class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                    >{{ $t("forms") }}</span
                >
            </div>
            <div
                class="rtl:rotate-180"
                :class="{
                    '!rotate-90': activeDropdown === 'forms',
                }"
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
        <vue-collapsible :isOpen="activeDropdown === 'forms'">
            <ul class="sub-menu text-gray-500">
                <li>
                    <router-link to="/forms/basic" @click="toggleMobileMenu">{{
                        $t("basic")
                    }}</router-link>
                </li>
                <li>
                    <router-link
                        to="/forms/input-group"
                        @click="toggleMobileMenu"
                        >{{ $t("input_group") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/layouts"
                        @click="toggleMobileMenu"
                        >{{ $t("layouts") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/validation"
                        @click="toggleMobileMenu"
                        >{{ $t("validation") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/input-mask"
                        @click="toggleMobileMenu"
                        >{{ $t("input_mask") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/select2"
                        @click="toggleMobileMenu"
                        >{{ $t("select2") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/touchspin"
                        @click="toggleMobileMenu"
                        >{{ $t("touchspin") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/checkbox-radio"
                        @click="toggleMobileMenu"
                        >{{ $t("checkbox_and_radio") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/switches"
                        @click="toggleMobileMenu"
                        >{{ $t("switches") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/wizards"
                        @click="toggleMobileMenu"
                        >{{ $t("wizards") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/file-upload"
                        @click="toggleMobileMenu"
                        >{{ $t("file_upload") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/quill-editor"
                        @click="toggleMobileMenu"
                        >{{ $t("quill_editor") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/markdown-editor"
                        @click="toggleMobileMenu"
                        >{{ $t("markdown_editor") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/date-picker"
                        @click="toggleMobileMenu"
                        >{{ $t("date_and_range_picker") }}</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/forms/clipboard"
                        @click="toggleMobileMenu"
                        >{{ $t("clipboard") }}</router-link
                    >
                </li>
            </ul>
        </vue-collapsible>
    </li>
</template>
