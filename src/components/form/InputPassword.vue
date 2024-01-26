<script lang="ts" setup>
import { ref, computed, watch } from "vue";

/** CONTROLE */
const inputModel: any = ref("");
const props = defineProps({
    label: String,
    required: Boolean,
});
const emits = defineEmits(["updateValue"]);
/** CONTROLE */

/** COMPUTED */
const placeholder = computed(() => {
    return `Digite o ${props.label} .........`;
});
const emptyData = computed(() => {
    return inputModel.value.length > 0 ? false : true;
});
const minLen = computed(() => {
    return inputModel.value.length < 8 ? true : false;
});
/** COMPUTED */

/** WATCHER */
watch(inputModel, () => {
    emits("updateValue", inputModel.value);
});
/** WATCHER */
</script>
<template>
    <div class="flex flex-col w-full gap-0">
        <label class="capitalize text-bold">{{ $t(label!) }}</label>
        <input
            type="password"
            class="form-input"
            v-model="inputModel"
            :placeholder="$t('type-the') + $t(label!) + ' ......'" />
        <div v-if="required">
            <label v-show="emptyData" class="text-danger lowercase">{{
                $t("empty-data")
            }}</label>
            <label v-show="minLen" class="text-danger lowercase">{{
                $t("password-short")
            }}</label>
        </div>
    </div>
</template>
