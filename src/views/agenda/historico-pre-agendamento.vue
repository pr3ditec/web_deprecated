<script>
export default {
    props: {
        dadosPaciente: Object,
    },
    data() {
        return {
            historico: [
                {
                    status_id: -1,
                    status: "ENCAMINHADO A SECRETARIA",
                    updated_at: "14/12/2023",
                },
                {
                    status_id: 3,
                    status: "REJEITADO PELO PACIENTE",
                    updated_at: "15/12/2023",
                },
                {
                    status_id: 1,
                    status: "ENCAMINHADO AO PACIENTE",
                    updated_at: "14/12/2023",
                },
                {
                    status_id: 3,
                    status: "REJEITADO PELO PACIENTE",
                    updated_at: "15/12/2023",
                },
                {
                    status_id: 1,
                    status: "ENCAMINHADO AO PACIENTE",
                    updated_at: "14/12/2023",
                },
                {
                    status_id: 3,
                    status: "REJEITADO PELO PACIENTE",
                    updated_at: "15/12/2023",
                },
                {
                    status_id: 1,
                    status: "ENCAMINHADO AO PACIENTE",
                    updated_at: "14/12/2023",
                },
                {
                    status_id: 2,
                    status: "ACEITO PELO PACIENTE",
                    updated_at: "15/12/2023",
                },
            ],
        };
    },
    async created() {
        console.log(this.dadosPaciente);
    },
};
</script>
<template>
    <Transition name="slide-fade">
        <div
            class="absolute w-1/5 h-full bottom-0 right-0 bg-white shadow-lg"
            style="z-index: 2000 !important">
            <div class="flex flex-col items-center p-5 h-full gap-2">
                <h1 class="text-semibold text-xl">Paciente</h1>
                <div
                    class="flex flex-col rounded-md p-3 border-t border-gray-950 shadow-md w-full h-full gap-3 overflow-scroll">
                    <span
                        v-for="item in historico"
                        class="w-1/2 badge bg-dark-light text-dark"
                        :class="{
                            'self-end bg-primary text-white':
                                item.status_id == 1,
                        }"
                        >{{ item.status }}</span
                    >
                </div>
                <div class="flex flex-row w-full p-3">
                    <button class="btn btn-sm btn-dark uppercase w-full m-2">
                        finalizar pre-agendamento
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
