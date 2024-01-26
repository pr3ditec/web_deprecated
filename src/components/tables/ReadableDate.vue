<script lang="ts" setup>
import DateFormatter from "@/helpers/DateFormatter";

const props = defineProps({
    date: String,
});
</script>
<template>
    <span>{{ DateFormatter.toRead(date!) }}</span>
</template>
