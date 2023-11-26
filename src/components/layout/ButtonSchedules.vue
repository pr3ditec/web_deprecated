<script>
export default {
    props: {
        color: {
            type: String,
            required: true,
        },
    },
    computed: {
        buttonColorClass() {
            return {
                "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500":
                    this.color === "blue",
                "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500":
                    this.color === "green",
                "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500":
                    this.color === "red",
                "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500":
                    this.color === "yellow",
            };
        },
    },
};
</script>

<template>
    <button
        class="capitalize mb-3 mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        :class="buttonColorClass"
        @click="handleClick">
        <slot></slot>
    </button>
</template>
