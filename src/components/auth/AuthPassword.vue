<script lang="ts" setup>
import { ref, watch, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import IconPassword from "../icons/IconPassword.vue";

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
        <label for="Password">{{ $t(label!) }}</label>
        <div class="relative text-white-dark">
            <input
                id="Password"
                v-model="model"
                type="password"
                :placeholder="$t(label!)"
                class="form-input ps-10 placeholder:text-white-dark text-center"
                required />
            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                <IconPassword />
            </span>
        </div>
    </div>
</template>
