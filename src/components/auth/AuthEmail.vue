<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import IconEmail from "../icons/IconEmail.vue";

/** CONTROLE */
const props = defineProps({
    label: String,
});
const emits = defineEmits(["updateValue"]);
/** CONTROLE */

/** OPTIONS */
const model = ref("");
/** OPTIONS */

/** WATCHER */
watch(model, () => {
    emits("updateValue", model.value);
});
/** WATCHER */
</script>
<template>
    <div>
        <label for="iddoc">{{ $t(label!) }}</label>
        <div class="relative text-white-dark">
            <input
                id="iddoc"
                v-model="model"
                type="text"
                :placeholder="$t(label!)"
                class="form-input ps-10 placeholder:text-white-dark text-center"
                required />

            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                <IconEmail />
            </span>
        </div>
    </div>
</template>
