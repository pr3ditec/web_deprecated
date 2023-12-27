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
            route: "",
            details: "",
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
        showDetailsRoute(route, details, parameters, responses) {
            this.detailsRoute = true;
            this.route = route;
            this.details = details;
            this.parameters = parameters;
            this.responses = responses;
        },
    },
};
</script>

<template>
    <div>
        <div class="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
            <div
                class="overlay bg-black/60 z-[5] w-full h-full absolute rounded-md hidden"></div>
            <div
                class="panel xl:block p-4 dark:gray-50 w-[350px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden">
                <div class="flex flex-col h-full">
                    <div class="space-y-1">
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
                                    Autenticação
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
                                        d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                                        stroke="#1C274C"
                                        stroke-width="1.5" />
                                    <path
                                        d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                                        fill="#1C274C" />
                                    <path
                                        d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5"
                                        stroke="#1C274C"
                                        stroke-width="1.5"
                                        stroke-linecap="round" />
                                </svg>

                                <div class="ltr:ml-3 rtl:mr-3">
                                    Sem Autenticação
                                </div>
                            </div>
                        </button>
                    </div>
                    <perfect-scrollbar
                        :options="{
                            swipeEasing: true,
                            wheelPropagation: false,
                        }"
                        class="relative ltr:pr-3.5 rtl:pl-3.5 ltr:-mr-3.5 rtl:-ml-3.5 h-full grow">
                        <div class="space-y-1">
                            <div
                                class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] route-class"></div>

                            <Transition>
                                <div
                                    v-show="selectedTab === 'autenticate'"
                                    class="flex flex-col gap-5 mt-4">
                                    <DocumentationAutenticate
                                        :showDetailsRoute="showDetailsRoute" />
                                </div>
                            </Transition>
                            <Transition>
                                <div
                                    v-show="selectedTab === 'no-autenticate'"
                                    class="flex flex-col gap-5 mt-4">
                                    <DocumentationNoAutenticate
                                        :showDetailsRoute="showDetailsRoute" />
                                </div>
                            </Transition>
                        </div>
                    </perfect-scrollbar>
                </div>
            </div>

            <TransitionGroup name="list">
                <div
                    class="panel p-0 flex-1 overflow-x-hidden h-full"
                    v-if="detailsRoute">
                    <DocumentationRouteDetails :route="route" :details="details" :parameters="parameters" :responses="responses" />
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>
