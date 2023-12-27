<script>
import DocumentationCard from "@/components/layout/documentation/DocumentationCard.vue";

export default {
    props: {
        showDetailsRoute: Function,
    },
    components: {
        DocumentationCard,
    },
};
</script>

<template>
    <DocumentationCard
        method="GET"
        route="usuario"
        color="bg-success"
        details="Retorna os dados de todos os usuários"
        :responses="[
            {
                status: '200',
                messages: ['user-data'],
                data_return: [
                    {
                        name: 'id',
                        type: 'integer',
                    },
                    {
                        name: 'nome',
                        type: 'string',
                    },
                    {
                        name: 'cpf',
                        type: 'string',
                    },
                    {
                        name: 'nascimento',
                        type: 'string (format Y-m-d)',
                    },
                    {
                        name: 'sexo',
                        type: 'char',
                    },
                    {
                        name: 'email',
                        type: 'string',
                    },
                    {
                        name: 'nacionalidade_id',
                        type: 'integer',
                    },
                    {
                        name: 'nacionalidade',
                        type: 'string',
                    },
                    {
                        name: 'nome_mae',
                        type: 'string',
                    },
                ]
            },
            {
                status: '400',
                messages: ['no-user-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="usuario/[usuarioId]"
        color="bg-success"
        details="Retorna os dados do usuário"
        :responses="[
            {
                status: '200',
                messages: ['user-data'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['error-when-searching-for-registration'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="usuario/timezone/[usuarioId]"
        color="bg-success"
        details="Retorna o timezone do usuário"
        :responses="[
            {
                status: '200',
                messages: ['timezone-of-user'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['error-when-searching-timezone-of-user'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="documento/[usuarioId]"
        color="bg-success"
        details="Validar se o usuário enviou os documentos e selfie"
        :responses="[
            {
                status: '200',
                messages: ['user-has-already-sent-aselfie-photo-and-document'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: [
                    'the-user-did-not-send-the-selfie',
                    'the-user-did-not-send-aphoto-of-the-document',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente"
        color="bg-success"
        details="Retorna todos os pacientes cadastrados"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['patient-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente/[usuarioId]"
        color="bg-success"
        details="Retorna os dados do paciente"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['patient-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="pre-agendamento/paciente/[pacienteId]"
        color="bg-success"
        details="Retorna os pre-agendamentos do paciente"
        :responses="[
            {
                status: '200',
                messages: ['patient-pre-appointments-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-pre-bookings-found', 'error-when-searching-for-pre-appointments-from-the-patient'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico"
        color="bg-success"
        details="Busca todos os médicos com exceção do que está conectado"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['there-are-no-doctors'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/[medicoId]"
        color="bg-success"
        details="Busca os dados do médico"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-doctor-found-with-id-provided', 'doctor-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/cpf/[cpf]"
        color="bg-success"
        details="Busca dados médico pelo CPF"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-doctor-found-with-cpf-provided', 'doctor-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/crm/[crm]"
        color="bg-success"
        details="Busca dados médico pelo CRM"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-doctor-found-with-crm-provided', 'doctor-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/endereco/clinica/[latitude]/[longitude]"
        color="bg-success"
        details="Busca dados do médico pelo endereço da clínica"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['unable-to-recover-data', 'there-are-no-doctors'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/especialidade/[medicoId]"
        color="bg-success"
        details="Retorna as especialidades ativas do médico"
        :responses="[
            {
                status: '200',
                messages: ['doctor-active-specialties'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-specialty-found-for-the-doctor'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/clinica/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/clinica/secretaria"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/clinica/secretaria/[secretariaId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/pagamento/tipo"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="pre-agendamento/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="clinica/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="consulta/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="consulta/valor/[medicoId]/[especialidadeId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="secretaria/[cpf]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="secretaria/medico/[secretariaId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-pagamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/[medicoId]/[dataInicial]/[dataFinal]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="status/agenda"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="agenda/[pacienteId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="agendamento/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="vencimentos-disponiveis"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="pre-agendamento/agenda/[agendaId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="relatorio/risco-empresarial/[DataInicial]/[DataFinal]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="especialidades/disponiveis"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="especialidades/medicos/[especialidadeId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="limite-confirmacao-agendamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/todas"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/especialidade/[especialidadeId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/medico/especialidade/[medicoId]/[especialidadeId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente/financeiro/[pacienteId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="historico-notificacao/[usuarioId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="atendimento/medico/[medicoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="atendimento/paciente/[pacienteId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="maximo-parcelamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="risco-empresarial"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="risco-empresarial/[estadoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/secretaria/agendamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/secretaria/categoria/agendamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="desconto/medico"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="permissao"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="permissao/[permissaoId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="crm/[usuarioId]/[crm]/[uf]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente/dependente/[pacienteId]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="dispositivo/admin/token/[token]"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="limite-pre-agendamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-limite-pre-agendamento"
        color="bg-success"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

    <DocumentationCard
        method="POST"
        route="usuario/timezone"
        color="bg-primary"
        details="Cadastrar o timezone do usuário"
        :parameters="[
            {
                item: 'timezone_id',
                requests: ['exists app.timezone', 'required'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="foto/validar"
        color="bg-primary"
        :parameters="[
            {
                item: 'selfie',
                requests: ['base64', 'required'],
            },
            {
                item: 'documento_frente ',
                requests: ['base64', 'required'],
            },
            {
                item: 'documento_verso ',
                requests: ['base64'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/telefone"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/telefone/principal"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/endereco"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/endereco/principal"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/dependente"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/telefone"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/telefone/principal"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/especialidade"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/endereco"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/endereco/principal"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/consulta"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/clinica"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/clinica/secretaria"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="desconto/medico"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico/aceitar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico/rejeitar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/cadastro"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/horarios/cadastro"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/horarios/recusar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="consulta/criar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico/ativar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico/rejeitar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="financeiro/status"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="status/financeiro"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="tipo-pagamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="status/agenda"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda/status"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="token/agendamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="atendimento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda/confirmar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="dispositivo"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="dispositivo/admin"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="sms/enviar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="firebase"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="galax/cobranca"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pix"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="logout"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="risco-empresarial"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="limite-confirmacao-agendamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="cadastro-categoria-agenda"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="comprovante-residencia/validar"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="maximo-parcelamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="foto/perfil"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="admin/secretaria/agendamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/retorno"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="permissao"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="usuario-permissao"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="limite-pre-agendamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="tipo-limite-pre-agendamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

    <DocumentationCard
        method="PATCH"
        route="usuario"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="paciente/[usuarioId]"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="medico/[usuarioId]"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="token/agendamento/[token]"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="dispositivo/[dispositivoId]"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="firebase/[usuarioFirebaseId]"
        color="bg-secondary"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

    <DocumentationCard
        method="DELETE"
        route="medico/especialidade/[especialidadeId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="medico/clinica/[clinicaId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="agenda/[agendaId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="cadastro-categoria-agenda/[categoriaAgendaId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="permissao/[permissaoId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="limite-pre-agendamento/[limiteId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="tipo-limite-pre-agendamento/[tipoId]"
        color="bg-danger"
        :showDetailsRoute="showDetailsRoute" />
</template>
