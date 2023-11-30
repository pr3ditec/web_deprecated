<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import appSetting from "@/app-setting";
import { useAppStore } from "@/stores/index";

const store = useAppStore();

// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
    i18n.locale = item.code;
    appSetting.toggleLanguage(item);
};

const currentFlag = computed(() => {
    return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});
</script>

<template>
    <div class="dropdown ms-auto w-max">
        <Popper
            :placement="
                store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'
            "
            offsetDistance="8">
            <button
                type="button"
                class="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black">
                <div>
                    <img
                        :src="currentFlag"
                        alt="image"
                        class="h-5 w-5 rounded-full object-cover" />
                </div>

                <div class="text-base font-bold uppercase">
                    {{ store.locale }}
                </div>

                <span class="shrink-0">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.99989 9.79988C6.59156 9.79988 6.18322 9.64238 5.87406 9.33321L2.07072 5.52988C1.90156 5.36071 1.90156 5.08071 2.07072 4.91154C2.23989 4.74238 2.51989 4.74238 2.68906 4.91154L6.49239 8.71488C6.77239 8.99488 7.22739 8.99488 7.50739 8.71488L11.3107 4.91154C11.4799 4.74238 11.7599 4.74238 11.9291 4.91154C12.0982 5.08071 12.0982 5.36071 11.9291 5.52988L8.12572 9.33321C7.81656 9.64238 7.40822 9.79988 6.99989 9.79988Z"
                            fill="currentColor" />
                    </svg>
                </span>
            </button>

            <template #content="{ close }">
                <ul
                    class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                    <template
                        v-for="item in store.languageList"
                        :key="item.code">
                        <li>
                            <button
                                type="button"
                                class="w-full hover:text-primary"
                                :class="{
                                    'bg-primary/10 text-primary':
                                        i18n.locale === item.code,
                                }"
                                @click="changeLanguage(item), close()">
                                <img
                                    class="w-5 h-5 object-cover rounded-full"
                                    :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                    alt="" />
                                <span class="ltr:ml-3 rtl:mr-3">{{
                                    item.name
                                }}</span>
                            </button>
                        </li>
                    </template>
                </ul>
            </template>
        </Popper>
    </div>
</template>
