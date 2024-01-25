<script lang="ts" setup>
import { defineProps, ref, watch, computed } from "vue";

/** PROPS */
const props = defineProps({
    model: String,
    label: String,
});
const emits = defineEmits(["updateValue"]);
/** PROPS */

/** CONTROLE */
const data: any = ref(props.model);
/** CONTROLE */

/** COMPUTED */
const emptyData = computed(() => {
    return data.value.length > 0 ? false : true;
});
/** COMPUTED */

/** WATCHER */
watch(data, () => {
    emits("updateValue", data.value);
});
/** WATCHER */
</script>
<template>
    <div class="flex flex-col gap-0 w-full">
        <label>{{ $t(label!) }}</label>
        <input
            class="form-input p-2"
            type="text"
            v-model="data"
            :placeholder="$t('type-the') + $t(label!) + ' ......'" />
        <label v-show="emptyData" class="text-danger lowercase">{{
            $t("empty-data")
        }}</label>
    </div>
</template>
