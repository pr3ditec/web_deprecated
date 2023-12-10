<script setup>
import { ref } from "vue";
import Host from "@/api/Host";
import { useMeta } from "@/composables/use-meta";

useMeta({ title: "Localhost Indicator" });

let host = new Host();
let isLocalhost = ref(false);

(async () => {
    isLocalhost.value = await host.isLocalhost();
    console.log("isLocalhost", isLocalhost.value);
})();
</script>

<template>
    <span
        v-if="isLocalhost"
        class="text-black dark:text-white font-extrabold font-mono text-center">
        LOCALHOST
    </span>
</template>

<style scoped></style>
