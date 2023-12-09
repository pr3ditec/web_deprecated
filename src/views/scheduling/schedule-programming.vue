<script>
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendarComponent from "../../components/layout/FullCalendarComponent.vue";
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import ScheduleSelection from "../../components/layout/ScheduleSelection.vue";
import { useMeta } from "@/composables/use-meta";
import ApiConnection from "../../api/Api";
import Swal from "sweetalert2";

export default {
    components: {
        FullCalendarComponent,
        SelectMedico,
        ScheduleSelection,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectedDates: [],
            calendarRef: null,
            showSchedule: true,
            isAddEventModal: false,
            selectedDoctor: null,
            selectedTimezone: null,
            existingSchedules: [],

            windowResize: function (view) {
                view.calendar.option("height", window.innerHeight);
            },
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                selectable: true,
                heigth: 600,
                validRange: {
                    start: new Date(),
                },
                select: (info) => {
                    let start = new Date(info.startStr);
                    let end = new Date(info.endStr);

                    end.setDate(end.getDate() - 1);

                    this.selectedDates = this.generateSelectedDates(start, end);
                    this.isAddEventModal = true;
                },
            },
        };
    },
    watch: {
        selectedDoctor: {
            immediate: true,
            handler(newDoctor) {
                if (newDoctor) {
                    this.selectedDates = [];
                    this.fetchDoctorAvailability(newDoctor);
                }
            },
        },
    },

    created() {
        useMeta({ title: "Calendar" });
    },

    methods: {
        handleCalendarMounted(calendarInstance) {
            this.calendarRef = calendarInstance;
        },

        async fetchDoctorAvailability(doctorId) {
            try {
                const response = await this.request.pegarDadosApi(
                    `/consulta/medico/${doctorId}`,
                );

                if (
                    response &&
                    typeof response === "object" &&
                    !Array.isArray(response)
                ) {
                    if (response.status) {
                        this.selectedTimezone =
                            response.list.horarios[0].timezone;

                        this.existingSchedules = response.list.horarios
                            .map((day) => ({
                                data: day.data,
                                horarios: day.horarios.map((horario) => ({
                                    hora: horario.hora,
                                })),
                            }))
                            .sort((a, b) => {
                                const dateA = Date.parse(a.data);
                                const dateB = Date.parse(b.data);
                                return dateA - dateB;
                            });

                        this.markAvailableHours(this.existingSchedules);
                    } else {
                        this.markAvailableHours(false);
                        this.showMessage(
                            this.$t(response.messageCode),
                            "error",
                        );
                        console.error(response1.messageCode);
                    }
                } else {
                    this.showMessage(this.$t(response.messageCode), "error");
                    console.error(response1.messageCode);
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar disponibilidade do médico: ",
                    error,
                );
            }
        },

        markAvailableHours(availableHours) {
            const calendarApi = this.calendarRef.getApi();
            calendarApi.removeAllEvents();

            if (!availableHours) {
                console.error("Nenhum horário disponível retornado pela API");
                calendarApi.removeAllEvents();
                return;
            }

            this.$nextTick(() => {
                availableHours.forEach((day) => {
                    const eventDate = new Date(
                        day.data + "T" + day.horarios[0].hora,
                    );

                    const eventDateInTimeZone = new Date(
                        eventDate.toLocaleString("en-US", {
                            timeZone: day.timezone,
                        }),
                    );

                    calendarApi.addEvent({
                        title: this.$t("releasedDay"),
                        start: eventDateInTimeZone.toISOString(),
                        allDay: true,
                    });
                });
            });
        },

        generateSelectedDates(startDate, endDate) {
            let dates = [];
            for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                dates.push(new Date(d).toISOString().split("T")[0]);
            }

            return dates;
        },

        showMessage(msg = "", type = "success") {
            const toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    container: "toast",
                },
            });
            toast.fire({
                icon: type,
                title: msg,
                padding: "10px 20px",
            });
        },
    },
};
</script>

<template>
    <div class="row mt-5 p-4">
        <SelectMedico v-model="selectedDoctor" />
    </div>
    <div v-if="selectedDoctor">
        <div class="flex">
            <div class="w-6/12 p-4">
                <div
                    class="calendar-wrapper bg-white dark:bg-slate-900 rounded-lg shadow-md p-4 dark:text-white">
                    <FullCalendarComponent
                        :calendar-options="calendarOptions"
                        @calendarMounted="handleCalendarMounted" />
                </div>
            </div>
            <div v-if="selectedDates" class="w-6/12 p-4">
                <ScheduleSelection
                    v-if="showSchedule"
                    :selected-dates="selectedDates"
                    :selected-doctor="selectedDoctor"
                    :existing-schedules="existingSchedules"
                    :selected-timezone="selectedTimezone"
                    :fetch-doctor-availability="fetchDoctorAvailability"
                    :show-message="showMessage" />
            </div>
            <div v-else class="w-6/12 p-4">
                <div
                    class="flex items-center p-3.5 rounded text-success bg-success-light dark:bg-success-dark-light">
                    <span class="ltr:pr-2 rtl:pl-2"
                        ><strong class="ltr:mr-1 rtl:ml-1"
                            >{{ $t("warning") }}!</strong
                        >{{ $t("pleaseSelectDate") }}</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
