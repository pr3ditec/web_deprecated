<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
};
</script>

<template>
    <h2
        class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
        <svg
            class="w-4 h-5 flex-none hidden"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>{{ $t(title) }}</span>
    </h2>
</template>
