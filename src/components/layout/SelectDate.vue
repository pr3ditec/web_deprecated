<script>
export default {
    data() {
        return {
            date1: this.today(),
            date2: this.today(),
        };
    },
    watch: {
        date1(newDate) {
            this.$emit("update:start", newDate);
        },
        date2(newDate) {
            this.$emit("update:end", newDate);
        },
    },
    methods: {
        generate() {
            this.$emit("update:start", this.date1);
            this.$emit("update:end", this.date2);
            this.$emit("generate");
        },
        today() {
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }

            return year + "-" + month + "-" + day;
        },
    },
};
</script>

<template>
    <div class="flex justify-center">
        <div class="w-2/12">
            <input
                id="data-inicial"
                v-model="date1"
                title="Data Inicial"
                type="date"
                class="mb-3 mt-3 rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500" />
        </div>

        <div class="w-1/12">
            <input
                id="data-final"
                v-model="date2"
                title="Data Final"
                type="date"
                class="mb-3 mt-3 rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-0 sm:w-auto sm:text-sm bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500" />
        </div>
    </div>

    <div class="flex justify-center mb-2">
        <div class="w-3/12"></div>
        <div class="w-6/12">
            <button
                class="capitalize mb-3 mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-0 sm:text-sm bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
                @click="generate">
                Gerar
            </button>
        </div>
        <div class="w-3/12"></div>
    </div>
</template>
