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
                    id: 0,
                    paciente_nome: "vazio",
                },
            ],
            // calendar options
            calendarOptions: {
                height: "100vh",
                width: "100",
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "timeGridWeek",
                headerToolbar: {
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                },
                locale: "pt",
                droppable: true,
                slotLabelFormat: {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: false,
                    mediriem: "short",
                },
                // pega os drags and drops dos eventos do proprio full calendar
                eventDrop: (newEvent: any) => {},
                eventClick: (event: any) => {
                    // console.log("eventClick");
                },

                events: [{}],
                drop: (item: any) => {
                    this.removerSolicitacao(item.draggedEl.id);
                    // console.log(item.date)
                },
                eventContent: (data: any) => {
                    return {
                        html: `<div class=""><span class="flex flex-row gap-4"><img src="/assets/images/logo.png" width="24" />${data.event.title}</span></div>`,
                    };
                },
            },
        };
    },
    methods: {
        // Emit vindo de SelectMedico
        updateMedico(medico: any) {
            console.log("medico_id");
        },

        removerEventoAgenda() {
            this.calendarOptions.events.pop();
        },
        editarData: (event: any) => {
            // console.log("event");
        },
        // Solicitacoes
        removerSolicitacao(id: number) {
            let item = this.pegarDadosSolicitacao(id);
        },
        pegarDadosSolicitacao(id: number) {
            var response: any = {
                index: 0,
                item: "",
            };
            this.solicitacaoAgenda.forEach((item: any, index: number) => {
                if (item.id == id) {
                    response.item = item;
                    response.index = index;
                }
            });
            return response;
        },
    },

    async created() {
        await this.request.pegarDadosApi("/pre_agendamento/medico/1").then((res: any) => {
            if (!res == null) {
                res.forEach((element: any) => {
                    this.calendarOptions.events.push({
                        title: element.paciente_nome,
                        start: element.created_at,
                        overlap: true,
                        editable: true,
                    });
                });
            }
        });
        // colocar id medico
        await this.request.pegarDadosApi("/pre_agendamento/medico/1").then((res: any) => {
            // this.solicitacaoAgenda = res;
        });
    },

    mounted() {
        let doc: any = document.getElementsByClassName("drag-container");
        new Draggable(doc[0], {
            itemSelector: ".d-custom",
            eventData: (el: any) => {
                let data = this.pegarDadosSolicitacao(el.id);
                return {
                    title: data.item.paciente_nome,
                    overlap: true,
                    editable: true,
                };
            },
        });
    },
};
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold mb-4">Agenda</h1>
        <SelectMedico @update:modelValue="($event) => updateMedico($event)" />
    </div>

    <div>
        <div class="panel">
            <div class="mb-5">
                <div class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center">
                    <!-- LEGENDAS -->
                    <div class="sm:mb-0 mb-4">
                        <div class="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                                <div>MARCADO</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-info"></div>
                                <div>ATRASADO</div>
                            </div>
                            <div class="flex items-center ltr:mr-4 rtl:ml-4">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-success"></div>
                                <div>ATENDIDO</div>
                            </div>
                            <div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-danger"></div>
                                <div>CANCELADO</div>
                            </div>
                        </div>
                    </div>
                    <!-- LEGENDAS -->

                    <!-- BOTAO DE CADASTRO -->
                    <button type="button" class="btn btn-primary" @click="">
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
                    <!-- BOTAO DE CADASTRO -->
                </div>

                <!-- SOLICITACOES -->
                <div class="flex flex-row justify-between gap-3">
                    <div
                        class="drag-container flex flex-col gap-2 p-4 shadow-md rounded-sm w-2/12 text-center overflow-y-auto"
                    >
                        <h6 class="uppercase font-bold font-xl mt-3">solicitações</h6>
                        <div
                            :id="solicitacao.id.toString()"
                            class="d-custom max-w-[30rem] w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none"
                            v-for="solicitacao in solicitacaoAgenda"
                        >
                            <div class="p-5 flex items-center flex-col sm:flex-row">
                                <div class="mb-3 w-20 h-20 rounded-full overflow-hidden">
                                    <img src="/assets/images/logo.png" alt="" class="w-full h-full object-cover" />
                                </div>
                                <div class="flex-1 ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                    <h5 class="text-[#3b3f5c] text-[15px] font-semibold mb-1 dark:text-white-light">
                                        {{ solicitacao.paciente_nome }}
                                    </h5>
                                    <p class="mb-1 text-white-dark">tset</p>
                                    <span class="badge bg-danger rounded-full">Tipo</span>
                                    <p class="font-semibold text-white-dark mt-2 sm:mt-4">
                                        Maecenas nec mi vel lacus condimentum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- SOLICITACOES -->

                    <!-- CALENDARIO -->
                    <div class="calendar-wrapper w-10/12">
                        <FullCalendar :options="calendarOptions" style="z-index: -100"></FullCalendar>
                    </div>
                    <!-- CALENDARIO -->
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.d-custom:hover {
    transform: scale(1.01);
}
</style>
