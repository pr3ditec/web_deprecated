<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SelectMedico from "../../components/layout/Select-doctor.vue";
import HeaderAgenda from "./header-agenda.vue";
import Solicitacoes from "./solicitacoes-agenda.vue";
import { inject } from "vue";
import FormatoData from "../../helpers/FormatoData";
import Response from "../../api/Response";
import Swal from "sweetalert2";

export default {
    components: {
        SelectMedico,
        FullCalendar,
        HeaderAgenda,
        Solicitacoes,
    },
    data() {
        return {
            // API
            request: Object(inject("api")),

            // SELECTMEDICO
            medicoSelect: 0,

            // CALENDAR OPTIONS
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
                // eventBackgroundColor: "#e7515a",
                eventDurationEditable: false,
                eventBackgroundColor: "#3b3f5c",
                eventBorderColor: "#3b3f5c",
                eventTextColor: "#F8F8FF",
                events: [{}],

                // QUANDO UM EVENTO DE FORA É ARRASTADO PARA DENTRO DO CALENDARIO
                drop: (item: any) =>
                    this.adicionarHorario(item.draggedEl.id, item.dateStr),

                // QUANDO UM EVENTO DE DENTRO DO CALENDARIO É ARRASTADO PARA OUTRO LUGAR
                eventDragStart: (item: any) =>
                    this.removerSolicitacao(
                        item.event.id,
                        FormatoData.formatarParaApi(item.event.start),
                    ),
                eventDrop: (item: any) =>
                    this.adicionarHorario(item.event.id, item.event.start),

                // QUANDO UM EVENTO DE DENTRO DO CALENDARIO É PRESSIONADO
                eventClick: async (click: any) => {
                    const response = await Response.mesagemConfirmacao(
                        "warning",
                        "Remover",
                        "Cancelar",
                    );
                    if (response) {
                        click.event.remove(); // Remove na parte visual
                        this.removerSolicitacao(
                            click.event.id,
                            FormatoData.formatarParaApi(click.event.start),
                        );
                    }
                },
            },
        };
    },
    methods: {
        /** EMITS - EVENTOS DE COMPOENTES FILHOS */
        cadastrarEvento() {
            console.log("cadastrarEvento");
        },
        updateMedico(medico: any) {
            console.log("medico_id");
        },
        /** EMITS - EVENTOS DE COMPOENTES FILHOS */

        /** EVENTOS DO CALENDARIO - FULLCALENDAR */
        editarData: (event: any) => {},
        /** EVENTOS DO CALENDARIO - FULLCALENDAR */

        /** SOLICITACOES */
        adicionarHorario(id: number, date: never) {
            let item = Object(this.$refs.solicitacoes).pegarDadosSolicitacao(
                id,
            );

            Object(this.$refs.solicitacoes).inserirDadosSolicitacao(
                item.index,
                "horarios",
                FormatoData.formatarParaApi(date),
            );
        },
        proporHorario(id: number) {
            let item = Object(this.$refs.solicitacoes).pegarDadosSolicitacao(
                id,
            );

            Object(this.$refs.solicitacoes).removerSolicitacao(item.index);

            let data: any = this.$refs.calendar;
            data.getApi()
                .getEvents()
                .forEach((element) => {
                    if (element._def.publicId == id) {
                        element._def.editable = false;
                    }
                });
        },
        removerSolicitacao(id: number, date: any) {
            let item = Object(this.$refs.solicitacoes).pegarDadosSolicitacao(
                id,
            );

            Object(this.$refs.solicitacoes).removerDadosSolicitacao(
                item.index,
                date,
            ); // validar remocao
        },
        /** SOLICITACOES */

        /** ARRASTAR E SOLTAR */
        arrastarSolicitacoes() {
            let doc: any = document.getElementsByClassName("drag-container");
            new Draggable(doc[0], {
                itemSelector: ".d-custom",
                eventData: (el: any) => {
                    // let data = this.pegarDadosSolicitacao(el.id);
                    let data = Object(
                        this.$refs.solicitacoes,
                    ).pegarDadosSolicitacao(el.id);
                    return {
                        id: data.item.paciente_id,
                        title: data.item.paciente_nome,
                        overlap: true,
                        editable: true,
                    };
                },
            });
        },
        /** ARRASTAR E SOLTAR */

        /** BUSCAR DADOS DE API */
        async buscarAgendamentos() {
            await this.request
                .pegarDadosApi("/pre-agendamento/medico/1")
                .then((response: any) => {
                    if (!response == null) {
                        response.forEach((res: any) => {
                            this.calendarOptions.events.push({
                                id: res.paciente_id,
                                title: res.paciente_nome,
                                start: res.created_at,
                                overlap: true,
                                editable: true,
                            });
                        });
                    }
                });
        },
        /** BUSCAR DADOS DE API */
    },

    async created() {
        this.buscarAgendamentos(); // Buscando agendamentos que estao vinculados com o medico
    },

    mounted() {
        this.arrastarSolicitacoes(); // Criando as propriedades para arrastar
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
                <!-- LEGENDAS E BOTAO SOBRE O CALENDARIO     -->
                <HeaderAgenda @cadastrarEvento="cadastrarEvento()" />

                <div class="flex flex-row justify-between gap-3">
                    <!-- SOLICITACOES -->
                    <div
                        class="drag-container flex flex-col gap-2 p-4 shadow-md rounded-sm w-2/12 text-center overflow-y-auto"
                    >
                        <Solicitacoes
                            ref="solicitacoes"
                            @proporHorario="proporHorario"
                        />
                    </div>
                    <!-- SOLICITACOES -->

                    <!-- CALENDARIO -->
                    <div class="calendar-wrapper w-11/12">
                        <FullCalendar
                            :options="calendarOptions"
                            style="z-index: -100"
                            ref="calendar"
                        ></FullCalendar>
                    </div>
                    <!-- CALENDARIO -->
                </div>
            </div>
        </div>
    </div>
</template>
