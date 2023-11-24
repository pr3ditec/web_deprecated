<template>
    <div>
        <h1 class="text-4xl font-bold mb-5 lead">
            {{ $t("make_an_schedule") }}
        </h1>
        <SelectMedico v-model="selectedDoctor" />
    </div>

    <div v-if="selectedDoctor">
        <div class="flex">
            <div class="w-6/12 p-4">
                <div class="calendar-wrapper bg-white rounded-lg shadow-md p-4">
                    <FullCalendarComponent
                        :calendarOptions="calendarOptions"
                        @calendarMounted="handleCalendarMounted"
                    />
                </div>
            </div>

            <div class="w-6/12 p-4" v-if="selectedDate">
                <div
                    class="border-1 p-5 sm:align-middle bg-white rounded-lg shadow-md"
                >
                    <ButtonSchedules
                        color="blue"
                        @click="
                            showSchedule = true;
                            showAvailableHours = false;
                        "
                    >
                        {{ $t("release_schedules") }}
                    </ButtonSchedules>
                    <ButtonSchedules
                        color="yellow"
                        @click="
                            showSchedule = false;
                            showAvailableHours = true;
                        "
                    >
                        {{ $t("released_times") }}
                    </ButtonSchedules>
                    <div v-if="showSchedule">
                        <div class="mt-3">
                            <div>
                                <label for="horaInicio text-letf"
                                    >{{ $t("start_time") }}:</label
                                >
                                <SelectHorarioInicio v-model="horarioInicio" />
                            </div>
                            <div>
                                <label for="horaFim"
                                    >{{ $t("end_time") }}:</label
                                >
                                <SelectHorarioFim v-model="horarioFim" />
                            </div>
                            <div
                                class="mt-2"
                                v-if="horarioInicio && horarioFim"
                            >
                                <label for="incremento"
                                    >{{
                                        $t("interval_between_consultations")
                                    }}:</label
                                >
                                <select
                                    id="incremento"
                                    v-model="incrementoSelecionado"
                                    class="form-select mb-4"
                                >
                                    <option value="30">
                                        30 {{ $t("minutes") }}
                                    </option>
                                </select>
                            </div>

                            <div class="mt-2 mb-2">
                                <p class="text-md mb-3">
                                    {{ $t("you_selected_date") }}:
                                    {{ selectedDate }}
                                </p>
                            </div>

                            <ButtonSchedules
                                :color="isAllSelected ? 'yellow' : 'green'"
                                @click="selectAll"
                                v-if="showTable"
                            >
                                <span v-if="isAllSelected">
                                    {{ $t("remove_selection") }}
                                </span>
                                <span v-else>
                                    {{ $t("select_all") }}
                                </span>
                            </ButtonSchedules>

                            <div class="mb-4" v-if="showTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th
                                                class="form-control mb-4 sm:align-middle"
                                                colspan="6"
                                            >
                                                {{ $t("schedules") }}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="row in table">
                                            <td v-for="hour in row">
                                                <div
                                                    :id="hour"
                                                    @click="toggleHour(hour)"
                                                    :class="[
                                                        selectedHours.includes(
                                                            hour,
                                                        )
                                                            ? 'bg-green-500 text-white rounded-full text-center cursor-pointer p-1'
                                                            : 'bg-red-500 text-white text-center rounded-full cursor-pointer p-1',
                                                    ]"
                                                >
                                                    {{ hour }}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                        >
                            <ButtonSchedules color="green" @click="saveHours">
                                {{ $t("record") }}
                            </ButtonSchedules>
                            <ButtonSchedules
                                color="blue"
                                @click="cancelChanges"
                            >
                                {{ $t("cancel") }}
                            </ButtonSchedules>
                        </div>
                    </div>

                    <div class="table-responsive" v-if="showAvailableHours">
                        <table class="table-hover">
                            <thead>
                                <tr class="uppercase">
                                    <th class="!text-center">
                                        {{ $t("date") }}
                                    </th>
                                    <th class="!text-center">
                                        {{ $t("schedules") }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <template
                                    v-for="day in existingSchedules"
                                    :key="day.data"
                                >
                                    <tr v-if="checkDate(day)">
                                        <td class="!text-center">
                                            {{ day.data }}
                                        </td>

                                        <td class="!text-center">
                                            <span
                                                v-for="(
                                                    hour, index
                                                ) in day.horarios"
                                                :key="index"
                                                class="inline-block m-1 px-2"
                                                @click="
                                                    toggleHourDisp(day, index)
                                                "
                                                :class="[
                                                    selectedHours.includes(hour)
                                                        ? 'bg-red-500 text-white rounded-full cursor-pointer p-1'
                                                        : 'bg-green-500 text-white rounded-full cursor-pointer p-1',
                                                ]"
                                            >
                                                {{ hour.hora }}
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <div
                            class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                        >
                            <ButtonSchedules color="green" @click="saveChanges">
                                {{ $t("record") }}
                            </ButtonSchedules>
                            <ButtonSchedules
                                color="blue"
                                @click="cancelChanges"
                            >
                                {{ $t("cancel") }}
                            </ButtonSchedules>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendarComponent from "../../components/layout/FullCalendarComponent.vue";
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import SelectHorarioInicio from "../../components/layout/SelectTime.vue";
import SelectHorarioFim from "../../components/layout/SelectTime.vue";
import ButtonSchedules from "../../components/layout/ButtonSchedules.vue";
import Swal from "sweetalert2";
import { useMeta } from "@/composables/use-meta";
import ApiConnection from "../../api/Api";

export default {
    components: {
        FullCalendarComponent,
        SelectMedico,
        SelectHorarioInicio,
        SelectHorarioFim,
        ButtonSchedules,
    },
    data() {
        return {
            request: new ApiConnection(),
            selectedDates: [],
            calendarRef: null,
            showSchedule: true,
            showAvailableHours: false,
            isAddEventModal: false,
            selectedDoctor: null,
            selectedDate: null as string | null,
            isAllSelected: false,
            showTable: false,
            selectedTimezone: null,
            incrementoSelecionado: "30",
            existingSchedules: [],
            selectedHours: [] as string[],
            horarioInicio: null as string | null,
            horarioFim: null as string | null,
            table: [] as string[][],
            rows: null as number | null,
            hours: null as string[] | null,
            columns: 5,
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
                    this.selectedDates = this.generateSelectedDates(
                        new Date(info.startStr),
                        new Date(info.endStr),
                    );
                    console.log("Datas selecionadas: ", this.selectedDates);
                    this.isAddEventModal = true;
                },
                dateClick: (info) => {
                    this.selectedDate = info.dateStr;
                    console.log("Data selecionada: ", this.selectedDate);
                    this.isAddEventModal = true;
                },
            },
        };
    },

    created() {
        useMeta({ title: "Calendar" });
        this.resetModal();
    },

    watch: {
        selectedDoctor: {
            immediate: true,
            handler(newDoctor) {
                if (newDoctor) {
                    this.selectedDate = new Date().toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                    this.resetModal();
                    this.fetchDoctorAvailability(newDoctor);
                }
            },
        },

        horarioFim() {
            this.generateTable();
        },

        incrementoSelecionado() {
            if (this.incrementoSelecionado) {
                this.generateTable();
                this.showTable = true;
            }
        },

        horarioInicio() {
            this.generateTable();
            this.showTable = true;
        },

        isAddEventModal() {
            if (this.isAddEventModal == false) {
                this.resetModal();
            }
        },
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

                        this.existingSchedules = response.list.horarios.map(
                            (day) => ({
                                data: day.data,
                                horarios: day.horarios.map((horario) => ({
                                    hora: horario.hora,
                                })),
                            }),
                        );

                        this.markAvailableHours(this.existingSchedules);
                    } else {
                        this.markAvailableHours(false);

                        console.error(
                            "Erro ao buscar disponibilidade do médico: ",
                            response.message,
                        );
                    }
                } else {
                    console.error(
                        "A resposta da API não é um objeto: ",
                        response,
                    );
                }
            } catch (error) {
                console.error(
                    "Erro ao buscar disponibilidade do médico: ",
                    error,
                );
            }
        },

        markAvailableHours(availableHours) {
            const calendarApi = (this.calendarRef as any).getApi();
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
                        title: "DIA LIBERADO",
                        start: eventDateInTimeZone.toISOString(),
                        allDay: true,
                    });
                });
            });
        },

        generateSelectedDates(startDate: Date, endDate: Date) {
            let dates = [];
            for (
                let d: any = startDate;
                d <= endDate;
                d.setDate(d.getDate() + 1)
            ) {
                dates.push(new Date(d).toISOString().split("T")[0]);
            }

            return dates;
        },

        resetModal() {
            this.horarioInicio = "";
            this.horarioFim = "";
            this.incrementoSelecionado = "30";
            this.isAllSelected = false;
            this.showTable = false;
        },

        clearSchedule() {
            this.selectedHours = [];
        },

        toggleHour(hour) {
            const index = this.selectedHours.indexOf(hour);

            if (index >= 0) {
                this.selectedHours.splice(index, 1);
            } else {
                this.selectedHours.push(hour);
            }

            if (this.selectedHours.length === this.table.flat().length) {
                this.isAllSelected = true;
            } else {
                this.isAllSelected = false;
            }
        },

        generateHours() {
            let horarios: string[] = [];
            if (this.horarioInicio && this.horarioFim) {
                let partesInicio = this.horarioInicio.split(":");
                let inicio =
                    parseInt(partesInicio[0]) * 60 + parseInt(partesInicio[1]);
                let partesFim = this.horarioFim.split(":");
                let fim = parseInt(partesFim[0]) * 60 + parseInt(partesFim[1]);
                let incremento = Number(this.incrementoSelecionado);
                for (let i = inicio; i < fim; i += incremento) {
                    let horas = Math.floor(i / 60);
                    let minutos = i % 60;
                    horarios.push(
                        `${horas.toString().padStart(2, "0")}:${minutos
                            .toString()
                            .padStart(2, "0")}`,
                    );
                }
            }

            return horarios;
        },

        generateTable() {
            if (
                this.horarioInicio &&
                this.horarioFim &&
                this.incrementoSelecionado
            ) {
                this.hours = this.generateHours();
                this.rows = Math.ceil(this.hours.length / this.columns);
                this.table = [];
                for (let i = 0; i < this.rows; i++) {
                    let row: string[] = [];
                    for (let j = 0; j < this.columns; j++) {
                        let index = i + j * this.rows;
                        if (index < this.hours.length) {
                            row.push(this.hours[index]);
                        }
                    }
                    this.table.push(row);
                }
            }
        },

        selectAll() {
            if (this.isAllSelected) {
                this.selectedHours = [];
                this.isAllSelected = false;
            } else {
                this.selectedHours = this.table.flat();
                this.isAllSelected = true;
            }
        },

        toggleHourDisp(day, index) {
            const hour = day.horarios[index];
            const idx = this.selectedHours.indexOf(hour);
            if (idx >= 0) {
                this.selectedHours.splice(idx, 1);
            } else {
                this.selectedHours.push(hour);
            }
        },

        formatDate(dateString, timezone) {
            let date = new Date(dateString + "T00:00:00" + timezone);
            let formattedDate = date.toLocaleDateString("pt-BR");
            return formattedDate;
        },

        saveChanges() {
            this.existingSchedules.forEach((day) => {
                day.horarios = day.horarios.filter(
                    (hour) => !this.selectedHours.includes(hour),
                );
            });

            let schedules = this.existingSchedules.filter(
                (day) => day.horarios.length > 0,
            );

            this.sendHoursToAPI(schedules);
            this.resetModal();
        },

        cancelChanges() {
            this.clearSchedule();
        },

        formatDateCheck(date) {
            let year = date.getFullYear();
            let month = (1 + date.getMonth()).toString().padStart(2, "0");
            let day = date.getDate().toString().padStart(2, "0");

            return year + "-" + month + "-" + day;
        },

        checkDate(day) {
            let data = new Date(day.data);
            let dataLocal = data.toLocaleString("en-US", {
                timeZone: this.selectedTimezone,
            });
            data = new Date(dataLocal);

            let agora = new Date();
            let agoraLocal = agora.toLocaleString("en-US", {
                timeZone: this.selectedTimezone,
            });
            agora = new Date(agoraLocal);

            return (
                day.horarios.length > 0 &&
                this.formatDateCheck(data) >= this.formatDateCheck(agora)
            );
        },

        async sendHoursToAPI(schedules) {
            try {
                let data = {
                    medico_id: this.selectedDoctor,
                    horarios_disponiveis: JSON.stringify(schedules),
                };

                let response = await this.request.enviarDadosApi(
                    "/consulta/criar",
                    data,
                );

                if (response && !response.error) {
                    this.showMessage("Agenda atualizada com sucesso!");
                    await this.fetchDoctorAvailability(this.selectedDoctor);
                } else {
                    this.showMessage("Erro ao atualizar a agenda.", "error");
                }
            } catch (error) {
                console.error("Erro ao atualizar a agenda: ", error);
                this.showMessage("Erro ao atualizar a agenda.", "error");
            }
        },

        async saveHours() {
            this.isAddEventModal = false;
            let horarios = this.selectedHours.map((hour) => ({
                hora: hour,
            }));

            let newSchedule = {
                data: this.selectedDate,
                horarios: horarios,
            };

            let schedules = [...this.existingSchedules, newSchedule];

            try {
                let data = {
                    medico_id: this.selectedDoctor,
                    horarios_disponiveis: JSON.stringify(schedules),
                };

                let response = await this.request.enviarDadosApi(
                    "/consulta/criar",
                    data,
                );

                if (response && !response.error) {
                    this.showMessage("Agenda criada com Sucesso!.");
                    await this.fetchDoctorAvailability(this.selectedDoctor);
                    this.isAddEventModal = true;
                    this.resetModal();
                } else {
                    this.showMessage("Erro ao criar a agenda.", "error");
                }
            } catch (error) {
                console.error("Erro ao salvar a agenda: ", error);
                this.showMessage("Erro ao criar a agenda.", "error");
            }
        },

        showMessage(msg = "", type = "success") {
            const toast: any = Swal.mixin({
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
