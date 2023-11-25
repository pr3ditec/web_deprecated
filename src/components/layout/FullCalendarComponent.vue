<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";

export default {
    components: {
        FullCalendar,
    },
    props: {
        calendarOptions: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.$emit("calendarMounted", this.$refs.calendar);
    },
};
</script>

<template>
    <div>
        <FullCalendar ref="calendar" :options="calendarOptions" />
    </div>
</template>
