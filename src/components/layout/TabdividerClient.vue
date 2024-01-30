<script setup>
import { ref } from "vue";

/** OPTIONS */
const selectTab = ref(0);
/** OPTIONS */
</script>
<template>
    <div class="flex flex-col gap-1">
        <div class="flex flex-row gap-1 mx-auto mb-4">
            <button
                @click="selectTab = 0"
                class="btn btn-outline-primary btn-sm"
                :class="{ 'btn-primary text-white': selectTab == 0 }">
                {{ $t("client") }}
            </button>
            <button
                @click="selectTab = 1"
                class="btn btn-outline-primary btn-sm"
                :class="{ 'btn-primary text-white': selectTab == 1 }">
                {{ $t("status") }}
            </button>
            <button
                @click="selectTab = 2"
                class="btn btn-outline-primary btn-sm"
                :class="{ 'btn-primary text-white': selectTab == 2 }">
                {{ $t("telephone") }}
            </button>
            <button
                @click="selectTab = 3"
                class="btn btn-outline-primary btn-sm"
                :class="{ 'btn-primary text-white': selectTab == 3 }">
                {{ $t("address") }}
            </button>
            <button
                @click="selectTab = 4"
                class="btn btn-outline-primary btn-sm"
                :class="{ 'btn-primary text-white': selectTab == 4 }">
                {{ $t("document") }}
            </button>
        </div>
        <slot v-if="selectTab == 0" name="client"></slot>
        <slot v-if="selectTab == 1" name="status"></slot>
        <slot v-if="selectTab == 2" name="telphone"></slot>
        <slot v-if="selectTab == 3" name="address"></slot>
        <slot v-if="selectTab == 4" name="document"></slot>
    </div>
</template>
