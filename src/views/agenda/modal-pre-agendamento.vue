<script>
import ApiConnection from "@/api/Api";
import Multiselect from "@suadelabs/vue3-multiselect";
import "@suadelabs/vue3-multiselect/dist/vue3-multiselect.css";

export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectInput: "",
            selectOptions: [],
            radioTipo: "consulta",
        };
    },
    methods: {
        setIsOpen(value) {
            this.isOpen = value;
        },
    },
    async created() {},
};
</script>
<template>
    <Transition>
        <div
            class="flex flex-col items-center align-items-start z-100 bg-white shadow-md w-1/2 mx-auto p-5 rounded-lg">
            <h1 class="text-lg mt-4">Selecione o paciente</h1>
            <hr class="w-75 m-2" />
            <div class="flex flex-row items-center gap-3 mt-2 mb-4">
                <label class="inline-flex">
                    <input
                        type="radio"
                        name="default_text_color"
                        class="form-radio"
                        value="consulta"
                        v-model="radioTipo" />
                    <span>{{ $t("appointment") }}</span>
                </label>
                <label class="inline-flex">
                    <input
                        type="radio"
                        name="default_text_color"
                        class="form-radio peer-checked"
                        value="retorno"
                        v-model="radioTipo" />
                    <span>{{ $t("return") }}</span>
                </label>
            </div>
            <div class="w-1/4">
                <multiselect
                    v-model="selectInput"
                    :options="selectOptions"
                    class="custom-multiselect"
                    :searchable="true"
                    placeholder="Select an option"
                    selected-label=""
                    select-label=""
                    deselect-label=""></multiselect>
            </div>
            <button class="btn btn-sm btn-primary mt-4 w-1/4 capitalize">
                {{ radioTipo }}
            </button>
        </div>
    </Transition>
</template>
