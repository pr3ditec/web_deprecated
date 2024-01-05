<script lang="ts">
import DocumentationAutenticate from "./documentation-autenticate.vue";
import DocumentationNoAutenticate from "./documentation-no-autenticate.vue";
import DocumentationRouteDetails from "./documentation-route-details.vue";

export default {
    components: {
        DocumentationAutenticate,
        DocumentationNoAutenticate,
        DocumentationRouteDetails,
    },
    data() {
        return {
            isEdit: false,
            selectedTab: "admin",
            detailsRoute: false,
            isShowMailMenu: false,
            searchText: "",
            route: "",
            details: "",
            autenticate: true,
            parameters: [],
            responses: [],
        };
    },
    methods: {
        tabChanged(tabType) {
            this.isEdit = false;
            this.selectedTab = tabType;
            let routeClass = document.querySelector(".route-class");
            if (routeClass) {
                routeClass.scrollIntoView();
            }
        },
        showDetailsRoute(route, details, parameters, responses, autenticate) {
            this.detailsRoute = true;
            this.route = route;
            this.details = details;
            this.parameters = parameters;
            this.responses = responses;
            this.isShowMailMenu = !this.isShowMailMenu;
            this.autenticate = autenticate;
        },
        searchRoute() {
            let routes = document.getElementsByClassName("documentation-route");
            let divideRoutes =
                document.getElementsByClassName("divider-routes");
            let routeClass = document.querySelector(".route-class");

            for (let i = 0; i < routes.length; i++) {
                let route = routes[i];
                let routeLower = route.textContent?.toLowerCase();

                if (
                    routeLower &&
                    routeLower.indexOf(this.searchText.toLowerCase()) !== -1
                ) {
                    if (
                        this.selectedTab != "autenticate" &&
                        this.selectedTab != "no-autenticate"
                    ) {
                        this.selectedTab = "admin";
                    }

                    route.parentElement?.parentElement?.classList.remove(
                        "hidden",
                    );
                    if (divideRoutes[i]) {
                        divideRoutes[i].classList.remove("hidden");
                    }
                } else {
                    if (
                        this.selectedTab != "autenticate" &&
                        this.selectedTab != "no-autenticate"
                    ) {
                        this.selectedTab = "all";
                    }

                    route.parentElement?.parentElement?.classList.add("hidden");
                    if (divideRoutes[i]) {
                        divideRoutes[i].classList.add("hidden");
                    }
                }
            }

            if (routeClass) {
                routeClass.scrollIntoView();
            }
        },
    },
};
</script>

<template>
    <div>
        <div class="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            <div
                class="overlay bg-black/60 z-[5] w-full h-full absolute rounded-md hidden"
                :class="{ '!block xl:!hidden': isShowMailMenu }"
                @click="isShowMailMenu = !isShowMailMenu"></div>
            <div
                class="panel xl:block p-4 dark:gray-50 w-[350px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden"
                :class="{ '!block': isShowMailMenu }">
                <div class="flex flex-col h-full">
                    <div class="space-y-1 mb-2">
                        <div class="relative group space-y-1 mb-1">
                            <input
                                type="text"
                                placeholder="Search Routes"
                                class="form-input ltr:pr-8 rtl:pl-8 peer"
                                v-model="searchText"
                                @keyup="searchRoute()" />
                            <div
                                class="absolute ltr:right-[11px] rtl:left-[11px] top-4 -translate-y-1/2 peer-focus:text-primary">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4">
                                    <circle
                                        cx="11.5"
                                        cy="11.5"
                                        r="9.5"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        opacity="0.5"></circle>
                                    <path
                                        d="M18.5 18.5L22 22"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"></path>
                                </svg>
                            </div>
                        </div>
                        <button
                            type="button"
                            class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                            :class="{
                                'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]':
                                    !isEdit && selectedTab === 'autenticate',
                            }"
                            @click="tabChanged('autenticate')">
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
                                        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                        fill="currentColor" />
                                    <path
                                        d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z"
                                        fill="currentColor" />
                                    <path
                                        d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                                        fill="currentColor" />
                                    <path
                                        d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                                        fill="currentColor" />
                                    <path
                                        d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C17.8174 10.0089 18.3135 10.022 18.75 10.0546V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
                                        fill="currentColor" />
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">
                                    {{ $t("authentication") }}
                                </div>
                            </div>
                        </button>
                        <button
                            type="button"
                            class="w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10"
                            :class="{
                                'bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]':
                                    !isEdit && selectedTab === 'no-autenticate',
                            }"
                            @click="tabChanged('no-autenticate')">
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
                                        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C5.68651 10.022 6.18264 10.0089 6.75 10.0036V8Z"
                                        fill="#1C274C" />
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">
                                    {{ $t("no-authentication") }}
                                </div>
                            </div>
                        </button>
                    </div>

                    <div
                        class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

                    <perfect-scrollbar
                        :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }"
                        class="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                        <div class="space-y-1">
                            <div class="route-class"></div>

                            <Transition>
                                <div
                                    v-show="
                                        selectedTab === 'autenticate' ||
                                        selectedTab === 'all'
                                    "
                                    class="flex flex-col gap-5 mt-4">
                                    <DocumentationAutenticate
                                        :showDetailsRoute="showDetailsRoute" />
                                </div>
                            </Transition>
                            <Transition>
                                <div
                                    v-show="
                                        selectedTab === 'no-autenticate' ||
                                        selectedTab === 'all'
                                    "
                                    class="flex flex-col gap-5 mt-4">
                                    <DocumentationNoAutenticate
                                        :showDetailsRoute="showDetailsRoute" />
                                </div>
                            </Transition>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>

            <div class="panel p-0 flex-1 overflow-x-hidden h-full">
                <div class="flex flex-col xl:hidden" v-show="!isShowMailMenu">
                    <div
                        class="flex justify-between items-center flex-wrap-reverse gap-4 p-4">
                        <div
                            class="flex justify-between items-center sm:w-auto w-full">
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <button
                                    type="button"
                                    class="xl:hidden hover:text-primary block ltr:mr-3 rtl:ml-3"
                                    @click="isShowMailMenu = !isShowMailMenu">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-6 h-6">
                                        <path
                                            d="M20 7L4 7"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"></path>
                                        <path
                                            opacity="0.5"
                                            d="M20 12L4 12"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"></path>
                                        <path
                                            d="M20 17L4 17"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TransitionGroup name="list">
                    <div v-if="detailsRoute">
                        <DocumentationRouteDetails
                            :route="route"
                            :details="details"
                            :parameters="parameters"
                            :autenticate="autenticate"
                            :responses="responses" />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>
