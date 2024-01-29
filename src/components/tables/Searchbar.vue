<script lang="ts" setup>
import { ref, watch } from "vue";

/** CONTROLE */
const emits = defineEmits(["searchCallback"]);
const searchModel: any = ref("");
/** CONTROLE */

watch(searchModel, () => {
    emits("searchCallback", searchModel.value);
});
</script>
<template>
    <input
        type="text"
        class="form-input"
        :placeholder="$t('searchTable')"
        v-model="searchModel" />
</template>
