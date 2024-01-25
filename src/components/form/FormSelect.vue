<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import Request from "@/api/Request";

/** CONTROLE */
const request = new Request();
const props = defineProps({
    route: String,
    name: String,
    required: Boolean,
    field: String,
});
const emits = defineEmits(["updateValue"]);
const selectData: any = ref([]);
const select_model: any = ref(0);
const isLoading: any = ref(true);
/** CONTROLE */

/** FUNCOES */
const getData = async () => {
    await request
        .get(`${props.route}`)
        .then((res: any) => {
            selectData.value = res.data.list;
            isLoading.value = false;
        })
        .catch((err) => console.log("form-select-error"));
};
/** FUNCOES */

/** COMPUTED */
const isEmpty = computed(() => {
    return select_model == 0 ? true : false;
});
/** COMPUTED */

/** HOOKS */
onBeforeMount(() => {
    getData();
});
/** HOOKS */
</script>
<template>
    <div class="row mt-4 w-full">
        <div class="col-12">
            <div class="flex flex-col align-items-start">
                <label class="fw-bold tracking-wide">{{ $t(name!) }}</label>
                <select
                    :disabled="isLoading"
                    class="form-select p-2"
                    @change="emits('updateValue', select_model)"
                    v-model="select_model">
                    <option disabled selected :value="0">
                        {{ $t("select-item") }}
                    </option>
                    <option v-for="data in selectData" :value="data.id">
                        {{ data[field!] }}
                    </option>
                </select>
                <label
                    v-if="required"
                    v-show="isEmpty"
                    class="tracking-wide text-danger"
                    >{{ $t("empty-data") }}</label
                >
            </div>
        </div>
    </div>
</template>
