<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SelectMedico from "../../components/layout/SelectDoctor.vue";
import HeaderAgenda from "./schedule-header.vue";
import Solicitacoes from "./schedule-requests.vue";
import ApiConnection from "../../api/Api";
import FormatoData from "../../helpers/FormatoData";
import Response from "../../api/Response";
import ModalPreAgendamento from "./pre-scheduling-modal.vue";

export default {
    components: {
        SelectMedico,
        FullCalendar,
        HeaderAgenda,
        Solicitacoes,
        ModalPreAgendamento,
    },
    data() {
        return {
            // API
            request: new ApiConnection(),

            // MEDICO QUE VEM DO EMIT
            medicoSelect: 0,

            // MOSTRAR MODAL, VEM DE EMIT
            modal: false,

            // INICIALIZACAO FULL CALEDAR
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
                        click.event._def.ui.backgroundColor == "#161414"
                    ) {
                        this.gerarTokenPresenca(
                            click.event._def.extendedProps.agenda_id,
                        );
                        /** FLUXO PARA PROPOR AGENDAMENTO */
                    } else if (!click.event._def.extendedProps.eventFromApi) {
                        //@ts-expect-error
                        this.modal = true;
                        click.event.setProp("color", "#161414");
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
        fecharModal() {
            this.modal = false;
        },
        proporAgendamento(data: any) {
            this.fecharModal();
            const evento = this.pegarEventosSelecionados();
            if (evento.status) {
                if (data.tipo == "retorno") {
                    // marcar consulta de agenda
                } else {
                    this.propostaHorarios(data.modalDados.id, evento.horarios);
                }
            } else {
                Response.mensagemToast("error", "Nenhum horario selecionado");
            }
        },
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
                                    hoje.getTime() >
                                    new Date(res.data).getTime()
                                        ? "gray"
                                        : "#161414",
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
                    const hoje = new Date();
                    res.list.horarios.forEach((element: any) => {
                        // SO MOSTRA OS HORARIOS DISPONIVEIS, QUE TENNHAM A DATA MAIOR QUE A ATUAL
                        const elementDateTimeStamp = new Date(
                            element.data,
                        ).getTime();
                        if (elementDateTimeStamp < hoje.getTime()) {
                            return;
                        }
                        // SO MOSTRA OS HORARIOS DISPONIVEIS, QUE TENNHAM A DATA MAIOR QUE A ATUAL

                        element.horarios.forEach((el: any, index: number) => {
                            if (el.agendamento == null) {
                                this.calendarOptions.events.push({
                                    id: index,
                                    title: "Horário disponível",
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

        /** ENVIAR PROPOSTA DE HORARIOS PARA PACIENTE */
        async propostaHorarios(pre_agendamento_id: number, arrayDados: any) {
            await this.request
                .enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: pre_agendamento_id,
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
        /** ENVIAR PROPOSTA DE HORARIOS PARA PACIENTE */

        /** PEGAR EVENTO(s) SELECIONADO(s) */
        pegarEventosSelecionados() {
            let response = {
                status: false,
                horarios: [],
            };
            //@ts-expect-error
            this.$refs.calendar
                .getApi()
                .getEvents()
                .forEach((evento: any) => {
                    if (evento._def.ui.backgroundColor == "#161414") {
                        response["status"] = true;
                        //@ts-expect-error
                        response.horarios.push(evento.extendedProps.forApi);
                        evento.setProp("color", "#00AB55");
                    }
                });

            return response;
        },
        /** PEGAR EVENTO(s) SELECIONADO(s) */
    },
    watch: {
        async medicoSelect(novoValor) {
            this.buscarAgendamentos().then(() => {
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
                <ModalPreAgendamento
                    v-show="modal"
                    :medico="medicoSelect"
                    :dataAgendar="{}"
                    @update:modalAgendamento="
                        ($event) => proporAgendamento($event)
                    "
                    @update:fecharModal="fecharModal" />
            </div>
            <div class="row" v-else>
                <div class="col-12 text-center">
                    <p>Selecione um médico para ver sua agenda</p>
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>
