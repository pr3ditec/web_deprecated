<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import HeaderAgenda from "./header-agenda.vue";
import Solicitacoes from "./solicitacoes-agenda.vue";
import ApiConnection from "../../api/Api";
import FormatoData from "../../helpers/FormatoData";
import Response from "../../api/Response";

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
            request: new ApiConnection(),
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
                duration: "00:30:00",
                eventDurationEditable: false,
                eventStartEditable: true,
                eventResizableFromStart: false,
                events: [{}],
                // QUANDO UM EVENTO DE FORA É ARRASTADO PARA DENTRO DO CALENDARIO
                drop: (item: any) =>
                    this.adicionarHorario(item.draggedEl.id, item.dateStr),

                // QUANDO UM EVENTO DE DENTRO DO CALENDARIO É ARRASTADO PARA OUTRO LUGAR
                eventDragStart: (item: any) => {
                    Object(this.$refs.solicitacoes).removerDadosSolicitacao(
                        item.event.id,
                        FormatoData.formatarParaApi(item.event.start),
                    );
                },
                eventDrop: (item: any) => {
                    Object(this.$refs.solicitacoes).inserirDadosSolicitacao(
                        item.event.id,
                        "horarios",
                        FormatoData.formatarParaApi(item.event.start),
                    );
                },
                // QUANDO UM EVENTO DE DENTRO DO CALENDARIO É PRESSIONADO
                eventClick: async (click: any) => {
                    if (!click.event.extendedProps.eventFromApi) {
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
                    } else {
                        const response = await Response.confirmarPresenca();
                        if (response.value == 0) {
                            console.log("paciente compareceu");
                        } else {
                            console.log("paciente nao compareceu");
                        }
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
            this.medicoSelect = medico;
        },
        /** EMITS - EVENTOS DE COMPOENTES FILHOS */

        /** EVENTOS DO CALENDARIO - FULLCALENDAR */
        editarData: (event: any) => {},
        /** EVENTOS DO CALENDARIO - FULLCALENDAR */

        /** SOLICITACOES */
        async proporHorario(id: number) {
            let item = Object(this.$refs.solicitacoes).pegarDadosSolicitacao(
                id,
            );

            // REMOVENDO DO ARRAY DE SOLICITACOES
            Object(this.$refs.solicitacoes).removerSolicitacao(item.index);

            // TIRANDO A POSSIBILIDADE DE EDICAO DO EVENTO
            let data: any = this.$refs.calendar;
            data.getApi()
                .getEvents()
                .forEach((element: any) => {
                    if (element._def.publicId == id) {
                        element._def.ui.durationEditable = false;
                        element._def.ui.startEditable = false;
                    }
                });

            // ENVIANDO DADOS PARA API
            await this.request
                .enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: item.item.id,
                    horarios_agendamento: JSON.stringify(
                        item.item.horarios,
                        // { data: "2023-11-30", hora: "09:30" },
                        // { data: "2023-11-28", hora: "09:00" },
                    ),
                })
                .catch((err) => {
                    console.log(err);
                })
                .then((res) => console.log(res));
        },
        /** SOLICITACOES */

        /** ARRASTAR E SOLTAR */
        arrastarSolicitacoes() {
            if (this.medicoSelect == 0) return;
            let doc: any = document.getElementsByClassName("drag-container");
            new Draggable(doc[0], {
                itemSelector: ".d-custom",
                eventData: (el: any) => {
                    // let data = this.pegarDadosSolicitacao(el.id);
                    let data = Object(
                        this.$refs.solicitacoes,
                    ).pegarDadosSolicitacao(el.id);
                    return {
                        id: data.item.id,
                        title: data.item.paciente_nome,
                        overlap: true,
                    };
                },
            });
        },
        /** ARRASTAR E SOLTAR */

        /** BUSCAR DADOS DE API */
        async buscarAgendamentos() {
            if (this.medicoSelect == 0) return;
            await this.request
                .pegarDadosApi(`/pre-agendamento/medico/${this.medicoSelect}`)
                .then((response: any) => {
                    if (response.status) {
                        let data = response.list;
                        data.forEach((res: any) => {
                            if (res.status_id == -1) {
                                return;
                            } else if (res.status_id == 1) {
                                this.calendarOptions.events.push({
                                    id: res.id,
                                    title: res.paciente_nome,
                                    start: res.created_at,
                                    eventFromApi: true,
                                    overlap: true,
                                    editable: false,
                                });
                            } else if (res.status_id == 2) {
                                this.calendarOptions.events.push({
                                    id: res.id,
                                    title: res.paciente_nome,
                                    backgroundColor: "red",
                                    eventFromApi: true,
                                    start: res.created_at,
                                    overlap: true,
                                    editable: false,
                                });
                            }
                        });
                    } else {
                        alert("Api falhou");
                    }
                });
        },

        /** BUSCAR DADOS DE API */
    },
    watch: {
        async medicoSelect(novoValor) {
            this.buscarAgendamentos().then(() => {
                this.arrastarSolicitacoes();
            });
        },
    },
    async created() {},
};
</script>

<template>
    <div>
        <h1 class="text-4xl font-bold mb-4">Agenda</h1>
        <SelectMedico @update:modelValue="($event) => updateMedico($event)" />
    </div>
    <div>
        <TransitionGroup name="list" tag="div">
            <div v-if="medicoSelect != 0" class="panel">
                <div class="mb-5">
                    <!-- LEGENDAS E BOTAO SOBRE O CALENDARIO     -->
                    <HeaderAgenda @cadastrarEvento="cadastrarEvento()" />

                    <div class="flex flex-row justify-between gap-3">
                        <!-- SOLICITACOES -->
                        <div
                            class="drag-container flex flex-col gap-2 p-4 shadow-md rounded-sm w-2/12 text-center overflow-y-auto">
                            <Solicitacoes
                                ref="solicitacoes"
                                :medico="medicoSelect"
                                @proporHorario="proporHorario" />
                        </div>
                        <!-- SOLICITACOES -->

                        <!-- CALENDARIO -->
                        <div class="calendar-wrapper w-11/12">
                            <FullCalendar
                                :options="calendarOptions"
                                style="z-index: -100"
                                ref="calendar"></FullCalendar>
                        </div>
                        <!-- CALENDARIO -->
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col items-center justify-center">
                <h1 class="text-md font-medium">{{ $t("select_doctor") }}</h1>
            </div>
        </TransitionGroup>
    </div>
</template>
