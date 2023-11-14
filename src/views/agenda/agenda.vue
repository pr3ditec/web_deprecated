<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SelectMedico from "../../components/layout/Select-doctor.vue";
import Swal from "sweetalert2";
import { inject } from "vue";

export default {
    components: {
        SelectMedico,
        FullCalendar,
    },
    data() {
        return {
            // API
            request: Object(inject("api")),
            // Agenda marcados
            solicitacaoAgenda: [
                {
                    id: 1,
                    title: "Lucas",
                },
                {
                    id: 2,
                    title: "Marcio",
                },
                {
                    id: 3,
                    title: "Skrrr",
                },
            ],
            // calendar options
            calendarOptions: {
                height: "100vh",
                width: "100",
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridWeek",
                headerToolbar: {
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek,timeGridDay",
                },
                locale: "pt",
                droppable: true,
                drop: function (res: any) {
                    console.log(res);
                },
                // pega os drags and drops dos eventos do proprio full calendar
                eventDrop: (newEvent: any) => {
                    console.log(newEvent);
                },
                eventClick: (event: any) => {
                    console.log("eventClick");
                },
                events: [
                    {
                        title: "event1",
                        start: "2023-11-15T15:00",
                        overlap: true,
                        editable: true,
                    },
                    {
                        title: "event2",
                        start: "2023-11-11",
                        end: "2023-11-11",
                        overlap: true,
                        editable: true,
                    },
                    {
                        title: "event3",
                        start: "2023-11-15T12:30:00",
                        overlap: true,
                        editable: true,
                    },
                ],
            },
        };
    },
    methods: {
        editarEvento() {
            this.calendarOptions.events.pop();
        },
        editarData: (event: any) => {
            console.log("event");
        },

        // Drag externo
    },
    mounted() {
        let doc: any = document.getElementsByClassName("d-custom");
        new Draggable(doc, {
            eventData: function (e) {
                console.log(e);
                return {
                    title: "skrrr",
                };
            },
        });
    },
};
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold mb-4">Agenda</h1>
        <SelectMedico />
    </div>

    <div>
        <div class="panel">
            <div class="mb-5">
                <div
                    class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center"
                >
                    <div class="sm:mb-0 mb-4">
                        <div
                            class="flex items-center mt-2 flex-wrap sm:justify-start justify-center"
                        >
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div
                                    class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"
                                ></div>
                                <div>MARCADO</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div
                                    class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"
                                ></div>
                                <div>ATRASADO</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div
                                    class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"
                                ></div>
                                <div>ATENDIDO</div>
                            </div>
                            <div class="flex items-center">
                                <div
                                    class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"
                                ></div>
                                <div>CANCELADO</div>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="editarEvento()"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="w-5 h-5 ltr:mr-2 rtl:ml-2"
                        >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        AGENDAR PACIENTE
                    </button>
                </div>

                <!-- CALENDAR -->
                <div class="flex flex-row justify-between gap-3">
                    <div
                        class="flex flex-col gap-2 p-4 shadow-md rounded-sm w-2/12 text-center"
                    >
                        <h6 class="uppercase font-bold font-xl mt-3">
                            solicitações
                        </h6>
                        <div
                            class="d-custom max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                            v-for="solicacao in solicitacaoAgenda"
                        >
                            <div
                                class="p-5 flex items-center flex-col sm:flex-row"
                            >
                                <div
                                    class="mb-3 w-20 h-20 rounded-full overflow-hidden"
                                >
                                    <img
                                        src="/assets/images/profile-34.jpeg"
                                        alt=""
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left"
                                >
                                    <h5
                                        class="text-[#3b3f5c] text-[15px] font-semibold mb-1 dark:text-white-light"
                                    >
                                        {{ solicacao.title }}
                                    </h5>
                                    <p class="mb-1 text-white-dark">tset</p>
                                    <span class="badge bg-primary rounded-full"
                                        >tipo</span
                                    >
                                    <p
                                        class="font-semibold text-white-dark mt-2 sm:mt-4"
                                    >
                                        Maecenas nec mi vel lacus condimentum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="calendar-wrapper w-10/12">
                        <FullCalendar :options="calendarOptions">
                            <!-- <template v-slot:eventContent="arg">
                                <b>{{ arg.event.title }}</b>
                            </template> -->
                        </FullCalendar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
