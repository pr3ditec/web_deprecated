<script>
import VueCollapsible from "vue-height-collapsible/vue3";

export default {
    components: {
        VueCollapsible,
    },
    props: {
        route: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            default: "",
        },
        parameters: {
            type: Array,
            default: [],
        },
        responses: {
            type: Array,
            default: [],
        },
        accordians: {
            type: Number,
            default: 1,
        },
        subAccordians: {
            type: Number,
            default: 1,
        },
        acoordiansStatus: {
            type: Number,
            default: 1,
        },
        responseAccordians: {
            type: Number,
            default: 1,
        },
        responseItemAccordians: {
            type: Number,
            default: 1,
        },
        responseSubItemAccordians: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        formatRoute() {
            let routeArray = this.route.split("/");
            let newRoute = [];
            routeArray.forEach((element) => {
                if (!element.includes("[")) {
                    newRoute.push(element);
                }
            });

            let formatRoute = newRoute.join("/");

            return formatRoute;
        },
        formatParametersRoute() {
            let routeArray = this.route.split("/");
            let parameters = [];
            routeArray.forEach((element) => {
                if (element.includes("[")) {
                    parameters.push(element);
                }
            });

            let formatParametersRoute = parameters.join("/");

            formatParametersRoute = `/${formatParametersRoute}`;

            return formatParametersRoute;
        },
    },
};
</script>

<template>
    <div class="mb-5 p-5">
        <div class="space-y-2 font-semibold">
            <div class="border border-[#d3d3d3] rounded dark:border-[#1b2e4b]">
                <button
                    type="button"
                    class="p-4 w-full flex items-center text-white-dark"
                    :class="{
                        '!text-primary': accordians === 1,
                    }"
                    @click="
                        accordians === 1
                            ? (accordians = null)
                            : (accordians = 1)
                    ">
                    <span class="uppercase font-bold">{{ formatRoute() }}</span>
                    <span class="italic uppercase font-extrabold">{{
                        formatParametersRoute()
                    }}</span>
                    <div
                        class="ltr:ml-auto rtl:mr-auto"
                        :class="{
                            'rotate-180': accordians === 1,
                        }">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4">
                            <path
                                d="M19 9L12 15L5 9"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </button>
                <vue-collapsible :isOpen="accordians === 1">
                    <div
                        class="space-y-2 p-4 text-white-dark text-[15px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]">
                        <p>
                            {{ details }}
                        </p>
                    </div>
                </vue-collapsible>
            </div>
            <div class="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                <button
                    type="button"
                    class="p-4 w-full flex items-center text-white-dark"
                    :class="{
                        '!text-primary': accordians === 2,
                    }"
                    @click="
                        accordians === 2
                            ? (accordians = null)
                            : (accordians = 2)
                    ">
                    <span class="uppercase font-bold">Body Params</span>
                    <div
                        class="ltr:ml-auto rtl:mr-auto"
                        :class="{
                            'rotate-180': accordians === 2,
                        }">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4">
                            <path
                                d="M19 9L12 15L5 9"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </button>
                <vue-collapsible :isOpen="accordians === 2">
                    <div
                        class="p-2 text-[15px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]"
                        v-if="parameters.length != 0"
                        v-for="item in parameters"
                        :key="item.item">
                        <button
                            type="button"
                            class="p-4 w-full flex items-center text-white-dark"
                            :class="{
                                '!text-primary': subAccordians === item.item,
                            }"
                            @click="
                                subAccordians === item.item
                                    ? (subAccordians = null)
                                    : (subAccordians = item.item)
                            ">
                            {{ item.item }}
                            <div
                                class="ltr:ml-auto rtl:mr-auto"
                                :class="{
                                    'rotate-180': subAccordians === item.item,
                                }">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4">
                                    <path
                                        d="M19 9L12 15L5 9"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </button>
                        <vue-collapsible :isOpen="subAccordians === item.item">
                            <div
                                class="p-4 pl-10 text-[15px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]"
                                v-for="requests in item.requests"
                                :key="requests">
                                {{ requests }}
                            </div>
                        </vue-collapsible>
                    </div>
                    <div
                        class="space-y-2 p-4 text-white-dark text-[15px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]"
                        v-if="parameters.length == 0">
                        <p>
                            {{ $t("non-existent") }}
                        </p>
                    </div>
                </vue-collapsible>
            </div>
            <div class="border border-[#d3d3d3] dark:border-[#1b2e4b] rounded">
                <button
                    type="button"
                    class="p-4 w-full flex items-center text-white-dark"
                    :class="{
                        '!text-primary': accordians === 3,
                    }"
                    @click="
                        accordians === 3
                            ? (accordians = null)
                            : (accordians = 3)
                    ">
                    <span class="uppercase font-bold">Response</span>
                    <div
                        class="ltr:ml-auto rtl:mr-auto"
                        :class="{
                            'rotate-180': accordians === 3,
                        }">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4">
                            <path
                                d="M19 9L12 15L5 9"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </button>
                <vue-collapsible :isOpen="accordians === 3">
                    <div
                        class="p-2 text-[15px] border-t border-[#d3d3d3] dark:border-[#1b2e4b]"
                        v-for="item in responses"
                        :key="item.status">
                        <button
                            type="button"
                            class="p-4 w-full flex items-center text-white-dark"
                            :class="{
                                '!text-primary':
                                    acoordiansStatus === item.status,
                            }"
                            @click="
                                acoordiansStatus === item.status
                                    ? (acoordiansStatus = null)
                                    : (acoordiansStatus = item.status)
                            ">
                            {{ item.status }}
                            <div
                                class="ltr:ml-auto rtl:mr-auto"
                                :class="{
                                    'rotate-180':
                                        acoordiansStatus === item.status,
                                }">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-4 h-4">
                                    <path
                                        d="M19 9L12 15L5 9"
                                        stroke="currentColor"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </button>
                        <vue-collapsible
                            :isOpen="acoordiansStatus === item.status">
                            <div
                                class="p-4 pl-10 text-[15px] border-t text-white-dark border-[#d3d3d3] dark:border-[#1b2e4b]"
                                v-for="messages in item.messages"
                                :key="messages">
                                {{ $t(messages) }}
                            </div>
                            <button
                                type="button"
                                class="p-4 w-full flex items-center text-white-dark"
                                v-show="
                                    'data_return' in item &&
                                    item.data_return.length > 0
                                "
                                :class="{
                                    '!text-primary':
                                        responseAccordians ===
                                        `data-response-${item.status}`,
                                }"
                                @click="
                                    responseAccordians ===
                                    `data-response-${item.status}`
                                        ? (responseAccordians = null)
                                        : (responseAccordians = `data-response-${item.status}`)
                                ">
                                {{ $t("return-data") }}
                                <div
                                    class="ltr:ml-auto rtl:mr-auto"
                                    :class="{
                                        'rotate-180':
                                            responseAccordians ===
                                            `data-response-${item.status}`,
                                    }">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4">
                                        <path
                                            d="M19 9L12 15L5 9"
                                            stroke="currentColor"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </button>
                            <vue-collapsible
                                :isOpen="
                                    responseAccordians ===
                                    `data-response-${item.status}`
                                ">
                                <div
                                    class="p-4 pl-20 text-[15px] text-white-dark"
                                    v-for="data_return in item.data_return"
                                    :key="data_return">
                                    <span
                                        class="uppercase text-sm text-dark dark:text-dark-light">
                                        {{ data_return.name }}:
                                    </span>
                                    <span class="text-xs">
                                        {{ data_return.type }}
                                    </span>
                                    <div
                                        class="p-4 pl-10 text-[15px] text-white-dark"
                                        v-show="
                                            'data_item' in data_return &&
                                            data_return.data_item.length > 0
                                        "
                                        v-for="data_item in data_return.data_item"
                                        :key="data_item">
                                        <span
                                            class="uppercase text-sm text-dark dark:text-dark-light">
                                            {{ data_item.name }}:
                                        </span>
                                        <span class="text-xs">
                                            {{ data_item.type }}
                                        </span>
                                        <div
                                            class="p-4 pl-10 text-[15px] text-white-dark"
                                            v-show="
                                                'data_sub_item' in data_item &&
                                                data_item.data_sub_item.length >
                                                    0
                                            "
                                            v-for="data_sub_item in data_item.data_sub_item"
                                            :key="data_sub_item">
                                            <span
                                                class="uppercase text-sm text-dark dark:text-dark-light">
                                                {{ data_sub_item.name }}:
                                            </span>
                                            <span class="text-xs">
                                                {{ data_sub_item.type }}
                                            </span>

                                            <div
                                                class="p-4 pl-10 text-[15px] text-white-dark"
                                                v-show="
                                                    'extra_sub_item' in
                                                        data_sub_item &&
                                                    data_sub_item.extra_sub_item
                                                        .length > 0
                                                "
                                                v-for="extra_sub_item in data_sub_item.extra_sub_item"
                                                :key="extra_sub_item">
                                                <span
                                                    class="uppercase text-sm text-dark dark:text-dark-light">
                                                    {{ extra_sub_item.name }}:
                                                </span>
                                                <span class="text-xs">
                                                    {{ extra_sub_item.type }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </vue-collapsible>
                        </vue-collapsible>
                    </div>
                </vue-collapsible>
            </div>
        </div>
    </div>
</template>
