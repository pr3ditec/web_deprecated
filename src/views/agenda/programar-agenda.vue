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
                    <FullCalendar ref="calendar" :options="calendarOptions" />
                </div>
            </div>
            <div class="w-6/12 p-4" v-if="selectedDate">
                <div class="border-1 p-5 sm:align-middle bg-white rounded-lg shadow-md">
                    <div class="mt-3">
                        <div>
                            <label for="horaInicio text-letf">{{ $t("start_time") }}:</label>
                            <SelectHorarioInicio v-model="horarioInicio" />
                        </div>
                        <div>
                            <label for="horaFim">{{ $t("end_time") }}:</label>
                            <SelectHorarioFim v-model="horarioFim" />
                        </div>
                        <div class="mt-2" v-if="horarioInicio && horarioFim">
                            <label for="incremento">{{ $t("interval_between_consultations") }}:</label>
                            <select id="incremento" v-model="incrementoSelecionado" class="form-select mb-4">
                                <option disabled value="">
                                    {{ $t("select_query_range") }}
                                </option>
                                <option value="60">1 {{ $t("time") }}</option>
                                <option value="30">30 {{ $t("minutes") }}</option>
                                <option value="15">15 {{ $t("minutes") }}</option>
                                <option value="10">10 {{ $t("minutes") }}</option>
                            </select>
                        </div>

                        <div class="mt-2 mb-2">
                            <p class="text-md mb-3">
                                {{ $t("you_selected_date") }}:
                                {{ selectedDate }}
                            </p>
                        </div>

                        <button class="mb-2" v-if="showTable" @click="selectAll">
                            <span
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                v-if="isAllSelected"
                            >
                                {{ $t("remove_selection") }}
                            </span>
                            <span
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                v-else
                            >
                                {{ $t("select_all") }}
                            </span>
                        </button>

                        <div class="panel mb-4" v-if="showTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="form-control mb-4 sm:align-middle" colspan="6">
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
                                                    selectedHours.includes(hour)
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
                    <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="saveHours"
                        >
                            {{ $t("record") }}
                        </button>
                        <button
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="isAddEventModal = false"
                        >
                            {{ $t("close") }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import SelectMedico from "../../components/layout/Select-doctor.vue";
import SelectHorarioInicio from "../../components/layout/Select-time.vue";
import SelectHorarioFim from "../../components/layout/Select-time.vue";
import Swal from "sweetalert2";
import { useMeta } from "@/composables/use-meta";
import { inject } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from "@headlessui/vue";

export default {
    components: {
        FullCalendar,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogOverlay,
        SelectMedico,
        SelectHorarioInicio,
        SelectHorarioFim,
    },
    data() {
        return {
            request: Object(inject("api")),
            selectedDoctor: null,
            isAddEventModal: false,
            selectedDate: null as string | null,
            isAllSelected: false,
            showTable: false,
            incrementoSelecionado: "",
            selectedDates: [],
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
                select: (info) => {
                    this.selectedDates = []; // Limpa as datas selecionadas
                    let startDate = new Date(info.startStr);
                    let endDate = new Date(info.endStr);
                    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
                        this.selectedDates.push(new Date(d).toISOString().split("T")[0]);
                    }
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
            immediate: true, // Chama a função quando o componente está montado
            handler(newDoctor) {
                if (newDoctor) {
                    this.selectedDate = new Date().toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    });
                    this.clearSchedule(); // Limpa a agenda
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
        },
        isAddEventModal() {
            if (this.isAddEventModal == false) {
                this.resetModal();
            }
        },
    },
    methods: {
        async fetchDoctorAvailability(doctorId) {
            try {
                const response = await this.request.pegarDadosApi(`/consulta/medico/${doctorId}`);
                console.log(response);

                // Armazena os horários existentes
                this.existingSchedules = response.horarios.map((day) => ({
                    data: day.data,
                    horarios: day.horarios.map((horario) => ({ hora: horario.hora })),
                }));

                this.markAvailableHours(this.existingSchedules);
            } catch (error) {
                console.error("Erro ao buscar disponibilidade do médico: ", error);
            }
        },
        markAvailableHours(availableHours) {
            const calendarApi = (this.$refs.calendar as any).getApi();
            calendarApi.removeAllEvents();

            if (!availableHours) {
                console.error("Nenhum horário disponível retornado pela API");
                calendarApi.removeAllEvents();
                return;
            }

            this.$nextTick(() => {
                availableHours.forEach((day) => {
                    // considerar o fuso horário
                    const eventDate = new Date(day.data + "T" + day.horarios[0].hora);

                    // para converter a data para o fuso horário especificado (timezone)
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

        resetModal() {
            this.horarioInicio = null;
            this.horarioFim = null;
            this.incrementoSelecionado = "";
            this.isAllSelected = false;
            this.showTable = false;
        },

        clearSchedule() {
            this.selectedHours = [];
            this.table = [];
            this.rows = null;
            this.hours = null;
        },

        toggleHour(hour) {
            const index = this.selectedHours.indexOf(hour);
            if (index >= 0) {
                this.selectedHours.splice(index, 1);
            } else {
                this.selectedHours.push(hour);
            }
        },

        generateHours() {
            let horarios: string[] = [];
            if (this.horarioInicio && this.horarioFim) {
                let partesInicio = this.horarioInicio.split(":");
                let inicio = parseInt(partesInicio[0]) * 60 + parseInt(partesInicio[1]);
                let partesFim = this.horarioFim.split(":");
                let fim = parseInt(partesFim[0]) * 60 + parseInt(partesFim[1]);
                let incremento = Number(this.incrementoSelecionado);
                for (let i = inicio; i < fim; i += incremento) {
                    let horas = Math.floor(i / 60);
                    let minutos = i % 60;
                    horarios.push(`${horas.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`);
                }
            }
            return horarios;
        },

        generateTable() {
            if (this.horarioInicio && this.horarioFim && this.incrementoSelecionado) {
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
            } else {
                this.selectedHours = this.table.flat();
            }
            this.isAllSelected = !this.isAllSelected;
        },

        async saveHours() {
            this.isAddEventModal = false;

            // Transforma os horários selecionados em objetos com a chave "hora"
            let horarios = this.selectedHours.map((hour) => ({ hora: hour }));

            let newSchedule = {
                data: this.selectedDate,
                horarios: horarios,
            };

            // Mescla os horários existentes com os novos horários
            let schedules = [...this.existingSchedules, newSchedule];

            try {
                let data = {
                    medico_id: this.selectedDoctor,
                    // converte o array de agendas em uma string JSON - tem que passar assim na api
                    horarios_disponiveis: JSON.stringify(schedules),
                };
                console.log(data);
                let response = await this.request.enviarDadosApi("/consulta/criar", data);
                console.log(response);
                if (response && !response.error) {
                    this.showMessage("Agenda criada com Sucesso!.");

                    await this.fetchDoctorAvailability(this.selectedDoctor);
                    this.isAddEventModal = true;
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
                customClass: { container: "toast" },
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
