<script lang="ts" setup>
import { onMounted, reactive } from "vue";

/** CONTROLE */
const props = defineProps({
    typeClass: String,
});
const emits = defineEmits(["actionCallback"]);

const btnClass = reactive({
    "w-full": true,
    btn: true,
    "btn-sm": true,
});

/** CONTROLE */

/** HOOKS */
onMounted(() => {
    btnClass[props.typeClass!] = true;
});
/** HOOKS */
</script>
<template>
    <button :class="btnClass" @click="() => emits('actionCallback')">
        <slot name="icon"></slot>
    </button>
</template>
