<template>
    <div>
        <h1 class="text-4xl font-bold mb-4">Programar Agenda</h1>
        <SelectMedico v-model="selectedDoctor" />
    </div>

    <div v-if="selectedDoctor">
        <div class="panel">
            <div class="mb-5">
                <div class="calendar-wrapper">
                    <FullCalendar ref="calendar" :options="calendarOptions" />
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot as="template" appear :show="isAddEventModal" @hidden="resetModal">
        <Dialog as="div" static class="fixed z-10 inset-0 overflow-y-auto" @close="isAddEventModal = false">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
                    leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <TransitionChild as="template" enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <div
                        class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <DialogPanel class="bg-gray-800 text-white px-4 pt-5 pb-6 sm:p-12 sm:pb-6">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-0 sm:text-left">
                                    <div>
                                        <label for="horaInicio" class="text-white">Hora de In��cio:</label>
                                        <SelectHorarioInicio v-model="horarioInicio" />
                                    </div>
                                    <div>
                                        <label for="horaFim" class="text-white">Hora de Término:</label>
                                        <SelectHorarioFim v-model="horarioFim" />
                                    </div>
                                    <div class="mt-2" v-if="horarioInicio && horarioFim">
                                        <label for="incremento" class="text-white">Intervalo entre as consultas:</label>
                                        <select id="incremento" v-model="incrementoSelecionado"
                                            class="form-select mb-4 bg-gray-800 text-white">
                                            <option disabled value="">Selecione o intervalo de consultas</option>
                                            <option value="60">1 hora</option>
                                            <option value="30">30 minutos</option>
                                            <option value="15">15 minutos</option>
                                            <option value="10">10 minutos</option>
                                        </select>
                                    </div>

                                    <div class="mt-">
                                        <p class="text-sm text-gray-300 mb-3">
                                            Você selecionou a data: {{ selectedDate }}
                                        </p>
                                    </div>

                                    <button v-if="showTable" @click="selectAll">
                                        <span
                                            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            v-if="isAllSelected">
                                            Retirar Seleção
                                        </span>
                                        <span
                                            class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            v-else>
                                            Selecionar Todos
                                        </span>
                                    </button>

                                    <div class="mt-6 grid grid-cols-6 gap-6 mb-2" v-if="showTable">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th class="form-select mb-4 bg-gray-800 text-white" colspan="6">Horário
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="row in table">
                                                    <td v-for="hour in row">
                                                        <div :id="hour" @click="toggleHour(hour)"
                                                            :class="[selectedHours.includes(hour) ? 'bg-green-600 text-white rounded-full cursor-pointer p-1' : 'bg-red-600 text-white rounded-full cursor-pointer p-1']">
                                                            {{ hour }}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </DialogPanel>
                        <div class="bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="saveHours">
                                Gravar
                            </button>
                            <button type="button"
                                class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                @click="isAddEventModal = false">
                                Fechar
                            </button>
                        </div>
                    </div>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import SelectMedico from '../../components/layout/Combo-medico.vue';
import SelectHorarioInicio from '../../components/layout/Combo-horario.vue';
import SelectHorarioFim from '../../components/layout/Combo-horario.vue';
import Swal from 'sweetalert2';
import { useMeta } from '@/composables/use-meta';

export default {
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogOverlay,
        FullCalendar,
        SelectMedico,
        SelectHorarioInicio,
        SelectHorarioFim
    },
    data() {
        return {
            selectedDoctor: null,
            isAddEventModal: false,
            selectedDate: null,
            isAllSelected: false,
            showTable: false,
            incrementoSelecionado: null,
            selectedHours: [] as string[],
            horarioInicio: null as string | null,
            horarioFim: null as string | null,
            table: [] as string[][],
            rows: null as number | null,
            hours: null as string[] | null,
            columns: 5,
            calendarOptions: {
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                selectable: true,
                dateClick: (info) => {
                    this.selectedDate = info.dateStr;
                    this.isAddEventModal = () => true;
                }
            }
        };
    },
    created() {
        useMeta({ title: 'Calendar' });
        this.resetModal();
        this.hours = this.generateHours();
        this.rows = Math.ceil(this.hours.length / this.columns);
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
    },
    watch: {
        horarioFim() {
            console.log(this.horarioFim);
            this.showTable = Boolean(this.horarioInicio) && Boolean(this.horarioFim) && Boolean(this.incrementoSelecionado);
            this.table = [];
        },
        incrementoSelecionado() {
            // console.log(this.incrementoSelecionado);
            this.showTable = Boolean(this.horarioInicio) && Boolean(this.horarioFim) && Boolean(this.incrementoSelecionado);
            // console.log(this.showTable);
        },
        selectedDoctor(newVal, oldVal) {
            if (newVal !== oldVal) {
                // VER REGRA SELECIONAR MEDICO
            }
        },
        horarioInicio() {
            this.showTable = Boolean(this.horarioInicio) && Boolean(this.horarioFim) && Boolean(this.incrementoSelecionado);
            console.log(this.horarioInicio);
            this.table = [];
        },
        isAddEventModal() {
            if (!this.isAddEventModal) {
                this.resetModal();
            }
        }
    },
    methods: {
        resetModal() {
            this.horarioInicio = null;
            this.horarioFim = null;
            this.incrementoSelecionado = null;
            this.isAllSelected = false;
        },
        toggleHour(hour) {
            console.log(`Toggling hour: ${hour}`);
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
                let partesInicio = this.horarioInicio.split(':');
                let inicio = parseInt(partesInicio[0]) * 60 + parseInt(partesInicio[1]);
                let partesFim = this.horarioFim.split(':');
                let fim = parseInt(partesFim[0]) * 60 + parseInt(partesFim[1]);
                let incremento = Number(this.incrementoSelecionado);
                for (let i = inicio; i < fim; i += incremento) {
                    let horas = Math.floor(i / 60);
                    let minutos = i % 60;
                    horarios.push(`${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`);
                }
            }
            return horarios;
        },
        selectAll() {
            if (this.isAllSelected) {
                this.selectedHours = [];
            } else {
                this.selectedHours = this.table.flat();
            }
            this.isAllSelected = !this.isAllSelected;
        },
        saveHours() {
            console.log(this.selectedHours);
            console.log(this.selectedDate);
            this.showMessage('Agenda criada com Sucesso!.');
            // VER REGRA SALVAR AGENDA
        },
        showMessage(msg = '', type = 'success') {
            const toast: any = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                customClass: { container: 'toast' },
            });
            toast.fire({
                icon: type,
                title: msg,
                padding: '10px 20px',
            });
        }
    }
};
</script>

