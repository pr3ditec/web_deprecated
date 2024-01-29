<script setup>
const props = defineProps({
    title: String,
});
</script>
<template>
    <div class="flex flex-col gap-1 mt-5">
        <h1 class="capitalize font-semibold text-lg">{{ $t(title) }}</h1>
        <hr class="text-dark dark:text-white p-2 mt-1" />
        <div class="pl-3 pr-3">
            <slot></slot>
        </div>
    </div>
</template>
