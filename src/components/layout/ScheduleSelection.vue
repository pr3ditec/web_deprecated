<script>
import ButtonSchedules from "@/components/layout/ButtonSchedules.vue";
import SelectHorarioInicio from "@/components/layout/SelectTime.vue";
import SelectHorarioFim from "@/components/layout/SelectTime.vue";
import AvailableHours from "@/components/layout/AvailableHours.vue";
import ApiConnection from "../../api/Api";

export default {
    components: {
        ButtonSchedules,
        SelectHorarioInicio,
        SelectHorarioFim,
        AvailableHours,
    },
    data() {
        return {
            request: new ApiConnection(),
            showSchedule: true,
            showAvailableHours: false,
            horarioInicio: "",
            horarioFim: "",
            showTable: false,
            incrementoSelecionado: "30",
            table: [],
            rows: null,
            hours: null,
            columns: 5,
            isAllSelected: false,
            selectedHours: [],
        };
    },

    props: {
        selectedDate: String,
        selectedDoctor: String,
        existingSchedules: Array,
        selectedTimezone: String,
        fetchDoctorAvailability: Function,
        showMessage: Function,
    },
    watch: {
        horarioFim() {
            if (this.incrementoSelecionado && this.horarioInicio) {
                this.generateTable();
                this.showTable = true;
            }
        },

        incrementoSelecionado() {
            if (this.horarioInicio && this.horarioFim) {
                this.generateTable();
                this.showTable = true;
            }
        },

        horarioInicio() {
            if (this.incrementoSelecionado && this.horarioFim) {
                this.generateTable();
                this.showTable = true;
            }
        },

        isAddEventModal() {
            if (this.isAddEventModal == false) {
                this.resetModal();
            }
        },
    },
    methods: {
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
                    this.resetModal();
                    this.clearSchedule();

                    await this.fetchDoctorAvailability(this.selectedDoctor);
                    this.isAddEventModal = true;
                } else {
                    this.showMessage("Erro ao criar a agenda.", "error");
                    this.resetModal();
                    this.clearSchedule();
                }
            } catch (error) {
                console.error("Erro ao salvar a agenda: ", error);
                this.showMessage("Erro ao criar a agenda.", "error");
                this.resetModal();
                this.clearSchedule();
            }
        },

        cancelChanges() {
            this.clearSchedule();
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

        formatDate(dateString) {
            return dateString.split("-").reverse().join("/");
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
                    let row = [];
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

        generateHours() {
            let horarios = [];
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

        clearSchedule() {
            this.selectedHours = [];
        },

        resetModal() {
            this.horarioInicio = "";
            this.horarioFim = "";
            this.showTable = false;
            this.showSchedule = !this.showSchedule;
            this.showAvailableHours = !this.showAvailableHours;
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
    },
};
</script>

<template>
    <div class="border-1 p-5 sm:align-middle bg-white rounded-lg shadow-md">
        <ButtonSchedules
            color="blue"
            @click="
                showSchedule = true;
                showAvailableHours = false;
            ">
            {{ $t("release_schedules") }}
        </ButtonSchedules>
        <ButtonSchedules
            color="yellow"
            @click="
                showSchedule = false;
                showAvailableHours = true;
            ">
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
                    <label for="horaFim">{{ $t("end_time") }}:</label>
                    <SelectHorarioFim v-model="horarioFim" />
                </div>
                <div class="mt-2" v-if="horarioInicio && horarioFim">
                    <label for="incremento"
                        >{{ $t("interval_between_consultations") }}:</label
                    >
                    <select
                        id="incremento"
                        v-model="incrementoSelecionado"
                        class="form-select mb-4">
                        <option value="30">30 {{ $t("minutes") }}</option>
                    </select>
                </div>

                <div class="mt-2 mb-2">
                    <p class="text-md mb-3">
                        {{ $t("you_selected_date") }}:
                        {{ formatDate(selectedDate) }}
                    </p>
                </div>

                <ButtonSchedules
                    :color="isAllSelected ? 'yellow' : 'green'"
                    @click="selectAll"
                    v-if="showTable">
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
                                    colspan="6">
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
                                        ]">
                                        {{ hour }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <ButtonSchedules color="green" @click="saveHours">
                    {{ $t("record") }}
                </ButtonSchedules>
                <ButtonSchedules color="blue" @click="cancelChanges">
                    {{ $t("cancel") }}
                </ButtonSchedules>
            </div>
        </div>

        <AvailableHours
            v-if="showAvailableHours"
            :showAvailableHours="showAvailableHours"
            :existingSchedules="existingSchedules"
            :selectedHours="selectedHours"
            :selectedTimezone="selectedTimezone"
            :saveChanges="saveChanges"
            :cancelChanges="cancelChanges"
            :formatDate="formatDate" />
    </div>
</template>
