<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Response from "@/api/Response";
import ApiConnection from "../../api/Api";
import multiMonthPlugin from "@fullcalendar/multimonth";
import Swal from "sweetalert2";

export default {
    components: {
        FullCalendar,
    },
    props: {
        medico: Number,
        dadosPaciente: Object,
    },
    data() {
        return {
            request: new ApiConnection(),
            horariosProposta: [{}],
            calendarOptions: {
                height: "80vh",
                width: "100",
                plugins: [
                    multiMonthPlugin,
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                ],
                initialView: "dayGridMonth",
                customButtons: {
                    custom: {
                        text: "Propor horarios",
                        click: () => {},
                    },
                },
                headerToolbar: {
                    start: "title",
                    center: "prev,next",
                    end: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay",
                },
                locale: "pt",
                slotLabelFormat: {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: false,
                    mediriem: "short",
                },
                duration: "00:30:00",
                eventDurationEditable: false,
                eventStartEditable: false,
                eventResizableFromStart: false,
                eventDisplay: "list-item",
                events: [{}],
                eventClick: (click) => {
                    if (click.event._def.ui.backgroundColor == "black") {
                        click.event.setProp("color", "#4361ee");
                    } else {
                        click.event.setProp("color", "black");
                    }
                },
            },
        };
    },
    async created() {
        this.buscarDados();
        Response.ajuda("Clique no horario para selecionar");
    },
    methods: {
        async buscarDados() {
            await this.request
                .pegarDadosApi(`/consulta/medico/${this.medico}`)
                .then((res) => {
                    res.list.horarios.forEach((element) => {
                        element.horarios.forEach((el, index) => {
                            if (el.agendamento == null) {
                                this.calendarOptions.events.push({
                                    id: index,
                                    title: "horário dísponivel",
                                    start: `${element.data} ${el.hora}`,
                                    color: "black",
                                    forApi: {
                                        data: element.data,
                                        hora: el.hora,
                                    },
                                });
                            }
                        });
                    });
                });
        },
        pegarItemsSelecionados() {
            let response = {
                status: false,
                horarios: [],
            };
            this.$refs.calendar
                .getApi()
                .getEvents()
                .forEach((evento) => {
                    if (evento._def.ui.backgroundColor != "black") {
                        response["status"] = true;
                        response.horarios.push(evento.extendedProps.forApi);
                    }
                });

            return response;
        },

        botaoPropoHorario() {
            const data = this.pegarItemsSelecionados();
            if (data.status) {
                this.proporAgendamento(data.horarios);
            } else {
                Response.mensagemToast("error", "Nenhum horario selecionado");
            }
        },

        async proporAgendamento(arrayDados) {
            await this.request
                .enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: this.dadosPaciente.id,
                    horarios_agendamento: JSON.stringify(arrayDados),
                })
                .catch((err) => {
                    console.log(err);
                })
                .then((res) =>
                    res.status
                        ? Response.mensagemToast("success", res.message)
                        : Response.mensagemToast("error", res.message),
                );
        },
    },
};
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 text-center capitalize text-lg">
                PACIENTE: {{ dadosPaciente.paciente_nome }}
            </div>
            <div class="col-12 mt-4 mb-3" align="center">
                <button class="btn btn-primary" @click="botaoPropoHorario()">
                    Propor Horários
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <FullCalendar
                    ref="calendar"
                    :options="calendarOptions"
                    style="z-index: -100"></FullCalendar>
            </div>
        </div>
    </div>
</template>
