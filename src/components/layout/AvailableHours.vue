<script>
import ButtonSchedules from "./ButtonSchedules.vue";
import moment from "moment-timezone";

export default {
    components: {
        ButtonSchedules,
    },
    props: {
        showAvailableHours: Boolean,
        existingSchedules: Array,
        selectedHours: Array,
        selectedTimezone: String,
        saveChanges: Function,
        cancelChanges: Function,
        formatDate: Function,
    },
    methods: {
        toggleHourDisp(day, index) {
            const hour = day.horarios[index];
            const idx = this.selectedHours.indexOf(hour);
            if (idx >= 0) {
                this.selectedHours.splice(idx, 1);
            } else {
                this.selectedHours.push(hour);
            }
        },

        checkDate(day) {
            let data = moment(day.data).tz(this.selectedTimezone);
            let agora = moment().tz(this.selectedTimezone);

            if (day.horarios.length > 0) {
                if (data.isAfter(agora, "day")) {
                    return true;
                } else if (data.isSame(agora, "day")) {
                    return true;
                }
            }

            return false;
        },
    },
};
</script>

<template>
    <div
        v-if="showAvailableHours && existingSchedules.length > 0"
        class="table-responsive">
        <table class="table-hover">
            <thead>
                <tr class="uppercase" colspan="6">
                    <th class="!text-center">
                        {{ $t("date") }}
                    </th>
                    <th class="!text-center">
                        {{ $t("schedules") }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <template v-for="day in existingSchedules" :key="day.data">
                    <tr v-if="checkDate(day)">
                        <td class="!text-center">
                            {{ formatDate(day.data) }}
                        </td>

                        <td class="!text-center">
                            <span
                                v-for="(hour, index) in day.horarios.sort(
                                    (a, b) => a.hora.localeCompare(b.hora),
                                )"
                                :key="index"
                                class="inline-block m-1 px-2"
                                :class="[
                                    selectedHours.includes(hour)
                                        ? 'bg-red-500 text-white rounded-full cursor-pointer p-1'
                                        : 'bg-green-500 text-white rounded-full cursor-pointer p-1',
                                ]"
                                @click="toggleHourDisp(day, index)">
                                {{ hour.hora }}
                            </span>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <ButtonSchedules color="green" @click="saveChanges">
                {{ $t("record") }}
            </ButtonSchedules>
            <ButtonSchedules color="blue" @click="cancelChanges">
                {{ $t("cancel") }}
            </ButtonSchedules>
        </div>
    </div>

    <div v-else-if="showAvailableHours && existingSchedules.length <= 0">
        <div
            class="flex items-center p-3.5 rounded text-warning bg-warning-light dark:bg-warning-dark-light">
            <span class="ltr:pr-2 rtl:pl-2"
                ><strong class="ltr:mr-1 rtl:ml-1">{{ $t("warning") }}!</strong
                >{{ $t("doesNotHaveOpenSchedules") }}</span
            >
        </div>
    </div>
</template>
