<script setup>
import { ref, onMounted, watch } from "vue";
import FormSelect from "@/components/form/FormSelect.vue";

/** CONTYROLE */
const props = defineProps({
    document: Object,
});
const modelData = ref(props.document);
const indexModel = ref(0);
/** CONTYROLE */

/** WATCH */
watch(modelData.value, () => {
    emits("updateValue", modelData.value);
});
/** WATCH */
</script>
<template>
    <h6 class="font-bold text-capitalize">{{ $t("document") }}</h6>
    <div class="flex flex-row gap-1 mt-2">
        <span v-for="index in modelData.length" @click="indexModel = index - 1">
            <button
                v-if="index - 1 == indexModel"
                class="btn btn-primary btn-sm">
                {{ index }}
            </button>
            <button v-else class="btn btn-outline-primary btn-sm">
                {{ index }}
            </button>
        </span>
    </div>
    <!-- CARD -->
    <Transition>
        <div class="flex flex-col gap-2 mb-4 rounded-md shadow-md p-2 mt-1">
            <input
                type="text"
                class="form-input"
                v-model="modelData[indexModel].numero"
                :placeholder="$t('numero')" />
            <FormSelect
                route="tipo-documento"
                name="type"
                field="tipo"
                :selected="modelData[indexModel].tipo_documento_id" />
        </div>
    </Transition>
    <!-- CARD -->
</template>
