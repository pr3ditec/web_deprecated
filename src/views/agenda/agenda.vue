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
            request: new ApiConnection(),
            medicoSelect: 0,
            calendarOptions: {
                height: "100vh",
                width: "100",
                plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                headerToolbar: {
                    start: "prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                },
                locale: "pt",
                // slotLabelFormat: {
                //     hour: "numeric",
                //     minute: "2-digit",
                //     omitZeroMinute: false,
                //     mediriem: "short",
                // },
                duration: "00:30:00",
                eventDurationEditable: false,
                eventStartEditable: false,
                eventResizableFromStart: false,
                events: [{}],
                eventClick: (click: any) => {
                    // EventFromApi é um props customizada colocada para validar se o evento é um agendamento
                    if (
                        click.event._def.extendedProps.eventFromApi &&
                        click.event._def.ui.backgroundColor == "#4361ee"
                    ) {
                        this.gerarTokenPresenca(
                            click.event._def.extendedProps.agenda_id,
                        );
                        /** FLUXO PARA PROPOR AGENDAMENTO */
                    } else if (!click.event._def.extendedProps.eventFromApi) {
                        this.proporAgendamento();
                    }
                },
            },
        };
    },
    methods: {
        /** EMITS */
        updateMedico(medico: any) {
            this.medicoSelect = medico;
        },
        proporAgendamento() {},
        /** EMITS */

        /** GERAR TOKEN PRESENCA */
        async gerarTokenPresenca(agenda: number) {
            const data = await Response.mesagemConfirmacao(
                "question",
                "Gerar token",
                "cancelar",
                "Deseja gerar token para paciente ?",
            );
            if (data) {
                this.request
                    .enviarDadosApi("/token/agendamento", {
                        agenda_id: agenda,
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.status) {
                            Response.mensagemToast("success", res.message);
                        } else {
                            Response.mensagemToast("error", res.message);
                        }
                    });
            }
        },
        /** GERAR TOKEN PRESENCA */

        /** BUSCAR DADOS DE API */
        async buscarAgendamentos() {
            if (this.medicoSelect == 0) return;
            await this.request
                .pegarDadosApi(`/agendamento/medico/${this.medicoSelect}`)
                .then((response: any) => {
                    const hoje = new Date();
                    if (response.status) {
                        const data = response.list;
                        data.forEach((res: any) => {
                            this.calendarOptions.events.push({
                                title: res.paciente,
                                agenda_id: res.agenda_id,
                                backgroundColor:
                                    hoje.toLocaleDateString() > res.data
                                        ? "#4361ee"
                                        : "gray",
                                display: "block",
                                eventFromApi: true,
                                start: `${res.data} ${res.hora}`,
                            });
                        });
                    } else {
                        alert("Api falhou");
                    }
                });
        },
        async buscarHorariosDisponiveis() {
            await this.request
                .pegarDadosApi(`/consulta/medico/${this.medicoSelect}`)
                .then((res) => {
                    res.list.horarios.forEach((element: any) => {
                        element.horarios.forEach((el: any, index: number) => {
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
        /** BUSCAR DADOS DE API */
    },
    watch: {
        async medicoSelect(novoValor) {
            this.buscarAgendamentos().then(() => {
                // this.arrastarSolicitacoes();
                this.buscarHorariosDisponiveis();
            });
        },
    },
    async created() {},
};
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <h1 class="text-4xl font-bold mb-4">Agenda</h1>
            </div>
            <div class="col-12">
                <SelectMedico
                    @update:modelValue="($event) => updateMedico($event)" />
            </div>
        </div>
        <TransitionGroup name="list">
            <div class="row" v-if="medicoSelect != 0">
                <div class="col-12">
                    <HeaderAgenda />
                </div>
                <div class="col-12">
                    <FullCalendar
                        :options="calendarOptions"
                        style="z-index: -100"
                        ref="calendar"></FullCalendar>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-12 text-center">
                    <p>Selecione um médico para ver sua agenda</p>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>
