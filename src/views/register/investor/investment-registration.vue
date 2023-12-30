<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import IconRegister from "@/components/icons/IconRegister.vue";
import RegisterCategoria from "./register-category.vue";
import RegisterItem from "./register-item.vue";
import RegisterProduct from "./register-product.vue";
import RegisterProductItem from "./register-product-item.vue";

export default {
    components: {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
        IconRegister,
        RegisterCategoria,
        RegisterItem,
        RegisterProduct,
        RegisterProductItem,
    },
    data() {
        return {
            userId: null,
            selectedTab: "register-category",
        };
    },
    created() {
        console.log(this.selectedTab);
    },
    methods: {
        selectTab(tabName) {
            this.selectedTab = tabName;
            console.log(this.selectedTab);
        },
    },
};
</script>

<template>
    <div class="pt-8">
        <TabGroup as="div" class="mb-5">
            <div class="mx-10 mb-5 sm:mb-0">
                <TabList
                    class="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:justify-center mt-3 mb-5 sm:space-x-3 rtl:space-x-reverse">
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            @click="selectTab('register-category')"
                            class="p-7 py-3 flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] dark:bg-[#191e3a] hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] !outline-none transition duration-300 border-2 border-transparent"
                            :class="{
                                '!bg-success text-white border-indigo-600':
                                    selected,
                            }">
                            {{ $t("register-category") }}
                        </a>
                    </Tab>

                    <Tab as="template" v-slot="{ selected }">
                        <a
                            @click="selectTab('register-item')"
                            class="p-7 py-3 flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] dark:bg-[#191e3a] hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] !outline-none transition duration-300 border-2 border-transparent"
                            :class="{
                                '!bg-success text-white border-indigo-600':
                                    selected,
                            }">
                            {{ $t("register-item") }}
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            @click="selectTab('register-product')"
                            class="p-7 py-3 flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] dark:bg-[#191e3a] hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] !outline-none transition duration-300 border-2 border-transparent"
                            :class="{
                                '!bg-success text-white border-indigo-600':
                                    selected,
                            }">
                            {{ $t("register-product") }}
                        </a>
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            @click="selectTab('register-from-item-to-product')"
                            class="p-7 py-3 flex flex-col items-center justify-center rounded-lg bg-[#f1f2f3] dark:bg-[#191e3a] hover:!bg-success hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] !outline-none transition duration-300 border-2 border-transparent"
                            :class="{
                                '!bg-success text-white border-indigo-600':
                                    selected,
                            }">
                            {{ $t("register-from-item-to-product") }}
                        </a>
                    </Tab>
                </TabList>
            </div>
            <TabPanels class="p-6 flex-1 text-sm">
                <TabPanel>
                    <blockquote
                        class="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                        <div
                            class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                            <Transition>
                                <div
                                    class="flex flex-col items-center gap-5 mt-4">
                                    <RegisterCategoria />
                                </div>
                            </Transition>
                        </div>
                    </blockquote>
                </TabPanel>
                <TabPanel>
                    <blockquote
                        class="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                        <div
                            class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                            <Transition>
                                <div
                                    class="flex flex-col items-center gap-5 mt-4">
                                    <RegisterItem />
                                </div>
                            </Transition>
                        </div>
                    </blockquote>
                </TabPanel>
                <TabPanel>
                    <blockquote
                        class="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                        <div
                            class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                            <Transition>
                                <div
                                    class="flex flex-col items-center gap-5 mt-4">
                                    <RegisterProduct />
                                </div>
                            </Transition>
                        </div>
                    </blockquote>
                </TabPanel>
                <TabPanel>
                    <blockquote
                        class="text-black p-5 ltr:pl-3.5 rtl:pr-3.5 bg-white shadow-md rounded-tr-md rounded-br-md border border-white-light border-l-2 !border-l-primary dark:bg-[#060818] dark:border-[#060818]">
                        <div
                            class="grid space-y-6 grid-cols-1 items-center dark:text-white">
                            <Transition>
                                <div
                                    class="flex flex-col items-center gap-5 mt-4">
                                    <RegisterProductItem />
                                </div>
                            </Transition>
                        </div>
                    </blockquote>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>
