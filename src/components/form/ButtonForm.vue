<script lang="ts" setup>
import { onMounted, reactive } from "vue";

/** CONTROLE */
const props = defineProps({
    text: String,
    typeClass: String,
});
const emits = defineEmits(["actionCallback"]);

const btnClass = reactive({
    "w-full": true,
    btn: true,
    "btn-md": true,
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
        {{ $t(text!) }}
    </button>
</template>
