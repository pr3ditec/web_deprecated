<script>
import FormatoData from "@/helpers/FormatoData";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import ApiConnection from "../../api/Api";

export default {
    props: {
        medico: Number,
        dadosPaciente: Object,
    },
    components: {
        FullCalendar,
    },
    data() {
        return {
            request: new ApiConnection(),
            horariosProposta: [{}],
            calendarOptions: {
                height: "80vh",
                width: "100",
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                customButtons: {
                    custom: {
                        text: "Propor horarios",
                        click: () => {
                            console.log(this.index);
                        },
                    },
                },
                headerToolbar: {
                    start: "title",
                    center: "custom",
                    end: "prev,next dayGridMonth,timeGridWeek,timeGridDay",
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
                events: [{}],
                eventClick: (click) => {
                    click.event.setProp('color', 'red')
                    this.horariosProposta.push
                },
            },
        };
    },
    methods: {
        async buscarDados() {
            await this.request
                .pegarDadosApi(`/consulta/medico/${this.medico}`)
                .then((res) => {
                    res.list.horarios.forEach((element) => {
                        element.horarios.forEach((el, index) => {
                            this.calendarOptions.events.push({
                                id: index,
                                title: "horário dísponivel",
                                start: `${element.data} ${el.hora}`,
                                color: 'black'
                            });
                        });
                    });
                });
        },
        mostrarHorarios(data) {
            this.index = data.target.value;
        },
        async proporAgendamento() {
            await this.request
                .enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: data.id,
                    horarios_agendamento: JSON.stringify([
                        // { data: dadosModal.data, hora: dadosModal.hora },
                    ]),
                })
                .catch((err) => {
                    console.log(err);
                })
                .then((res) => console.log(res));
        },
    },
    async created() {
        this.buscarDados();
    },
};
</script>
<template>
    <FullCalendar
        :options="calendarOptions"
        style="z-index: -100"
        ref="calendar"></FullCalendar>
</template>
