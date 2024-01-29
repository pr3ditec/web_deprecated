<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, computed, watch } from "vue";

/** CONTROLE */
const inputModel: any = ref("");
const props = defineProps({
    label: String,
    mask: String,
    required: Boolean,
});
const emits = defineEmits(["updateValue"]);
/** CONTROLE */

/** COMPUTED */
const emptyData = computed(() => {
    return inputModel.value.length > 0 ? false : true;
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
            v-if="mask"
            type="text"
            v-mask="mask"
            class="form-input"
            v-model="inputModel"
            :placeholder="$t('typeThe') + $t(label!) + ' ......'" />
        <input
            v-else
            type="text"
            class="form-input"
            v-model="inputModel"
            :placeholder="$t('typeThe') + $t(label!) + ' ......'" />
        <label
            v-if="required"
            v-show="emptyData"
            class="text-danger lowercase"
            >{{ $t("emptyData") }}</label
        >
    </div>
</template>
