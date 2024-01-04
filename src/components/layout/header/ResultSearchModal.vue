<script>
import { RouterLink } from "vue-router";

export default {
    props: {
        routes: Array,
    },
    data() {
        return {};
    },
    methods: {
        goToRoute(route) {
            this.$router.push(route);
            this.$emit("closeSearch");
        },
    },
};
</script>
<template>
    <div
        class="absolute md:m-auto w-full md:w-1/4 shadow-lg rounded-md border border-1 bg-white"
        style="z-index: 1000">
        <div class="flex flex-col gap-1">
            <div
                v-for="route in routes"
                class="hover:bg-dark-light cursor-pointer p-3"
                @click="goToRoute(route.path)">
                <span class="text-lg">{{ $t(route.name) }}</span>
            </div>
        </div>
    </div>
</template>
