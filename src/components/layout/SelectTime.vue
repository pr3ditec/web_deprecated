<script>
export default {
    name: "SelectHorario",
    data() {
        return {
            selectedHour: "",
            horas: Array.from({ length: 24 }, (_, i) => i),
        };
    },
    methods: {
        updateSelectedHorario() {
            this.$emit("update:modelValue", this.selectedHour);
        },
    },
};
</script>

<template>
    <div>
        <select
            v-model="selectedHour"
            class="form-select mb-4 form-select mb-4 dark:text-white"
            @change="updateSelectedHorario">
            <option value="">{{ $t("select-time") }}</option>
            <option
                v-for="hora in horas"
                :key="hora"
                :value="hora < 10 ? '0' + hora + ':00' : hora + ':00'">
                {{ hora < 10 ? "0" + hora + ":00" : hora + ":00" }}
            </option>
        </select>
    </div>
</template>
