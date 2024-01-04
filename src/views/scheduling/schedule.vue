<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SelectDoctor from "@/components/layout/SelectDoctor.vue";
import HeaderAgenda from "./schedule-header.vue";
import Response from "@/api/Response";
import ModalPreAgendamento from "./pre-scheduling-modal.vue";
import { useAppStore } from "@/stores";
import directScheduling from "./direct-scheduling.vue";

export default {
    components: {
        SelectDoctor,
        FullCalendar,
        HeaderAgenda,
        ModalPreAgendamento,
        directScheduling,
    },
    data() {
        return {
            // API
            store: useAppStore(),
            // MEDICO QUE VEM DO EMIT
            medicoSelect: 0,
            isLoading: 0,

            // MOSTRAR MODAL, VEM DE EMIT
            modal: false,
            dataAgendarModal: {},

            // consulta direta
            directSchedule: false,
            auxHorarios: [],

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
                duration: "00:30:00",
                eventDurationEditable: false,
                eventStartEditable: false,
                eventResizableFromStart: false,
                events: [{}],
                eventClick: (click: any) => {
                    // EventFromApi é um props customizada colocada para validar se o evento é um agendamento
                    if (
                        click.event._def.extendedProps.eventFromApi &&
                        new Date(click.event._instance.range.start).getDate() ==
                            new Date().getDate()
                    ) {
                        this.gerarTokenPresenca(
                            click.event._def.extendedProps.agenda_id,
                        );
                        /** FLUXO PARA PROPOR AGENDAMENTO */
                    } else if (!click.event._def.extendedProps.eventFromApi) {
                        //@ts-expect-error
                        this.modal = true;
                        this.dataAgendarModal =
                            click.event._def.extendedProps.forApi.data;
                        if (click.event._def.ui.backgroundColor == "00AB55") {
                            click.event.setProp("color", "#00AB54");
                        } else {
                            click.event.setProp("color", "#161414");
                        }
                    }
                },
                //label format
                slotLabelFormat: function (date: any) {
                    if (date.date.minute == 0)
                        return (
                            date.date.hour.toString().padStart(2, "0") + ":00"
                        );

                    return date.date.minute;
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
                    this.propostaDeRetorno(data.modalDados.id, evento.horarios);
                } else {
                    this.propostaHorarios(data.modalDados.id, evento.horarios);
                }
            } else {
                Response.mensagemToast("error", this.$t("no-time-selected"));
            }
        },
        /** EMITS */

        /** GERAR TOKEN PRESENCA */
        async gerarTokenPresenca(agenda: number) {
            const data = await Response.mesagemConfirmacao(
                "question",
                this.$t("generate-token"),
                this.$t("cancel"),
                this.$t("want-generate-token"),
            );
            if (data) {
                this.store.request
                    .enviarDadosApi("/token/agendamento", {
                        agenda_id: agenda,
                    })
                    .then((res) => {
                        if (res.status) {
                            Response.mensagemToast(
                                "success",
                                this.$t("res.message"),
                            );
                        } else {
                            Response.mensagemToast(
                                "error",
                                this.$t("res.message"),
                            );
                        }
                    });
            }
        },
        /** GERAR TOKEN PRESENCA */

        /** BUSCAR DADOS DE API */
        async buscarAgendamentos() {
            if (this.medicoSelect == 0) return;
            await this.store.request
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
                    }
                });
        },
        async buscarHorariosDisponiveis() {
            await this.store
                .request!.pegarDadosApi(`/consulta/medico/${this.medicoSelect}`)
                .then((res: any) => {
                    const hoje = new Date().getTime();
                    res.list.horarios.forEach((element: any) => {
                        // SO MOSTRA OS HORARIOS DISPONIVEIS, QUE TENNHAM A DATA MAIOR QUE A ATUAL
                        const elementDateTimeStamp = new Date(
                            element.data,
                        ).getTime();

                        if (elementDateTimeStamp < hoje - 86400000) {
                            return;
                        }
                        // SO MOSTRA OS HORARIOS DISPONIVEIS, QUE TENNHAM A DATA MAIOR QUE A ATUAL
                        //@ts-expect-error
                        this.auxHorarios.push(element);

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
                })
                .finally(() => (this.isLoading = 2));
        },
        /** BUSCAR DADOS DE API */

        /** ENVIAR PROPOSTA DE HORARIOS PARA PACIENTE */
        async propostaHorarios(pre_agendamento_id: number, arrayDados: any) {
            await this.store.request
                .enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: pre_agendamento_id,
                    horarios_agendamento: JSON.stringify(arrayDados),
                })
                .then((res: any) =>
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          ),
                );
        },
        /** ENVIAR PROPOSTA DE HORARIOS PARA PACIENTE */

        /** PROPOSTA DE RETORNO */
        async propostaDeRetorno(pre_agendamento_id: number, arrayDados: any) {
            await this.store
                .request!.enviarDadosApi("/pre-agendamento/horarios/cadastro", {
                    pre_agendamento_id: pre_agendamento_id,
                    horarios_agendamento: JSON.stringify(arrayDados),
                })
                .then((res: any) => {
                    res.status
                        ? Response.mensagemToast(
                              "success",
                              this.$t(res.messageCode),
                          )
                        : Response.mensagemToast(
                              "error",
                              this.$t(res.messageCode),
                          );
                });
        },
        /** PROPOSTA DE RETORNO */

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
            this.isLoading = 1;
            this.buscarAgendamentos().then(() => {
                this.buscarHorariosDisponiveis();
            });
        },
    },
    async created() {},
};
</script>
<template>
    <div class="container-fluid dark:text-white">
        <div class="row mt-5 p-4">
            <div class="col-12">
                <SelectDoctor
                    @update:modelValue="($event) => updateMedico($event)" />
            </div>
        </div>
        <div v-if="isLoading == 1" class="flex flex-row justify-center">
            <span
                class="animate-spin border-4 border-transparent border-l-primary rounded-full w-12 h-12 inline-block align-middle m-auto mb-10"></span>
        </div>
        <div v-else>
            <TransitionGroup name="list">
                <div class="p-2">
                    <button
                        v-show="medicoSelect != 0"
                        @click="directSchedule = true"
                        class="btn btn-dark btn-sm ml-auto">
                        {{ $t("direct-appointment") }}
                    </button>
                </div>
                <!-- MARCAR CONSULTA DIRETAMENTE -->
                <div
                    v-if="medicoSelect != 0 && directSchedule == true"
                    class="">
                    <directScheduling
                        @close-direct="directSchedule = false"
                        :medico="medicoSelect"
                        :horarios="auxHorarios" />
                </div>
                <!-- MARCAR CONSULTA DIRETAMENTE -->

                <!-- CONSULTA VIA AGENDA E PROPOSTA DE HORARIOS -->
                <div
                    class="row"
                    v-else-if="medicoSelect != 0 && directSchedule == false">
                    <div class="col-12">
                        <HeaderAgenda />
                    </div>
                    <div class="col-12 dark:text-white">
                        <FullCalendar
                            :options="calendarOptions"
                            style="z-index: -100"
                            ref="calendar"></FullCalendar>
                    </div>
                    <ModalPreAgendamento
                        v-if="modal"
                        :medico="medicoSelect"
                        :dataAgendar="dataAgendarModal"
                        @update:modalAgendamento="
                            ($event) => proporAgendamento($event)
                        "
                        @update:fecharModal="fecharModal" />
                </div>
                <!-- CONSULTA VIA AGENDE E PROPOSTA DE HORARIOS -->

                <div class="row" v-else>
                    <div class="col-12 text-center">
                        <p>{{ $t("select-doctor") }}</p>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>
