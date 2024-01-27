<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, watch } from "vue";

/** PROPS */
const props = defineProps({
    model: String,
    label: String,
    lock: Boolean,
});
const emits = defineEmits(["updateValue"]);
/** PROPS */

/** CONTROLE */
const inputModel: any = ref("");
/** CONTROLE */

/** WATCHER */
watch(inputModel, () => {
    emits("updateValue", inputModel.value);
});
/** WATCHER */

/** HOOKS */
onMounted(() => {
    inputModel.value = props.model;
});
/** HOOKS */
</script>
<template>
    <div class="flex flex-col gap-0 w-full">
        <label class="dark:text-white">{{ $t(label!) }}</label>
        <input
            :disabled="lock"
            class="form-input p-2 mb-3 dark:text-white"
            type="text"
            v-model="inputModel" />
    </div>
</template>
