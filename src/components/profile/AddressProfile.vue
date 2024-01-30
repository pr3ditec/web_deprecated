<script setup>
import { ref, onMounted, watch } from "vue";
import FormSelect from "@/components/form/FormSelect.vue";

/** CONTYROLE */
const props = defineProps({
    address: Object,
});
const emits = defineEmits(["updateValue", "updateSelectedId"]);
const modelData = ref(props.address);
const indexModel = ref(0);
/** CONTYROLE */

/** WATCH */
watch(modelData.value, () => {
    emits("updateSelectedId", indexModel);
    emits("updateValue", modelData.value);
});
/** WATCH */
</script>
<template>
    <h6 class="font-bold text-capitalize">{{ $t("address") }}</h6>
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
                class="form-input dark:text-white"
                v-model="modelData[indexModel].nome"
                :placeholder="$t('name')" />
            <div class="flex flex-row gap-1">
                <input
                    type="text"
                    class="form-input dark:text-white"
                    v-model="modelData[indexModel].rua"
                    :placeholder="$t('street')" />
                <input
                    type="text"
                    class="form-input dark:text-white"
                    v-model="modelData[indexModel].bairro"
                    :placeholder="$t('neighborhood')" />
                <input
                    type="text"
                    class="form-input dark:text-white"
                    v-model="modelData[indexModel].numero"
                    :placeholder="$t('number')" />
            </div>
            <input
                type="text"
                class="form-input dark:text-white"
                v-model="modelData[indexModel].cep"
                :placeholder="$t('cep')" />
            <FormSelect
                route="cidade"
                name="city"
                field="nome"
                @update-value="
                    (value) => (modelData[indexModel].cidade_id = value)
                "
                :selected="modelData[indexModel].cidade_id" />
        </div>
    </Transition>
    <!-- CARD -->
</template>
