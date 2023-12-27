<script>
export default {
    props: {
        method: {
            type: String,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: "bg-success",
        },
        details: {
            type: String,
            default: "",
        },
        parameters: {
            type: Array,
            default: [],
        },
        responses: {
            type: Array,
            default: [],
        },
        showDetailsRoute: Function
    },
    methods: {
        showDetailsRoute(route, details, parameters, responses) {
            this.showDetailsRoute(route, details, parameters, responses);
        },
    }
};
</script>

<template>
    <div class="flex align-center pt-2">
        <button
            type="button"
            class="text-left"
            @click="showDetailsRoute(route, details, parameters, responses)">
            <span class="badge" :class="color">{{ $t(method) }}</span>
            <span
                class="ltr:pl-3 rtl:pr-3 font-extrabold text-black dark:text-[#506690] dark:group-hover:text-white-dark"
                :title="$t(route)"
                >{{ $t(route) }}</span
            >
        </button>
    </div>
</template>
