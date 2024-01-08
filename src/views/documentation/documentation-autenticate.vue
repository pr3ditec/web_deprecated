<script>
import DocumentationCard from "@/components/layout/documentation/DocumentationCard.vue";

export default {
    props: {
        showDetailsRoute: Function,
        autenticate: {
            type: Boolean,
            default: true,
        },
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
        details="returns-data-for-all-users"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['user-data'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'int' },
                    { name: 'nacionalidade', type: 'string' },
                    { name: 'nome_mae', type: 'string' },
                ],
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
        details="returns-user-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['user-data'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'int' },
                    { name: 'nacionalidade', type: 'string' },
                    { name: 'nome_mae', type: 'string' },
                    { name: 'endereco_medico', type: 'string | null' },
                    {
                        name: 'telefone_medico',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    { name: 'endereco_paciente', type: 'string | null' },
                    {
                        name: 'telefone_paciente',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    { name: 'foto_perfil', type: 'string(base64) | null' },
                ],
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
        details="returns-the-users-timezone"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['timezone-of-user'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'timezone_id', type: 'int' },
                    { name: 'timezone', type: 'string' },
                ],
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
        details="validate-whether-the-user-sent-documents-and-selfie"
        :autenticate="autenticate"
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
        details="returns-all-registered-patients"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'int' },
                    { name: 'nacionalidade', type: 'string' },
                    { name: 'nome_mae', type: 'string' },
                    { name: 'endereco_paciente', type: 'string | null' },
                    {
                        name: 'telefone_paciente',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    { name: 'foto_perfil', type: 'string(base64) | null' },
                ],
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
        details="returns-patient-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'paciente_id', type: 'int' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'ocupacao', type: 'string' },
                    {
                        name: 'documento',
                        type: 'array | null',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    { name: 'comprovante_residencia', type: 'bool' },
                    {
                        name: 'pre_agendamento_horarios_encaminhado',
                        type: 'bool',
                    },
                ],
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
        route="busca/paciente/cpf/[cpf]"
        color="bg-success"
        details="returns-patient-data-by-cpf"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'paciente_id', type: 'int' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'ocupacao', type: 'string' },
                    {
                        name: 'documento',
                        type: 'array | null',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    { name: 'comprovante_residencia', type: 'bool' },
                    {
                        name: 'pre_agendamento_horarios_encaminhado',
                        type: 'bool',
                    },
                ],
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
        details="returns-patient-pre-appointments"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['patient-pre-appointments-found'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'risco_empresarial_id', type: 'int' },
                    { name: 'desconto_medico_id', type: 'int' },
                    { name: 'consulta_id', type: 'int' },
                    { name: 'qtd_parcelas', type: 'int' },
                    { name: 'created_at', type: 'string' },
                    { name: 'updated_at', type: 'string' },
                    { name: 'medico_nome', type: 'string' },
                    { name: 'especialidade', type: 'string' },
                    { name: 'status_id', type: 'int' },
                    { name: 'status', type: 'string' },
                    {
                        name: 'pre_agendamento_horarios',
                        type: 'array',
                        data_item: [
                            { name: 'data', type: 'string' },
                            { name: 'hora', type: 'string' },
                            { name: 'status', type: 'string' },
                            { name: 'status_id', type: 'int' },
                            { name: 'timezone', type: 'string' },
                        ],
                    },
                    {
                        name: 'periodo_atendimento_paciente',
                        type: 'array',
                        data_item: [
                            { name: 'descricao', type: 'string' },
                            { name: ' pre_agendamento_id:', type: 'int' },
                        ],
                    },
                    { name: 'pode_criar_retorno', type: 'bool' },
                    { name: 'data_limite_retorno', type: 'string' },
                    {
                        name: 'pre_agendamento_agenda',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'data', type: 'string' },
                            { name: 'hora', type: 'string' },
                            { name: 'status', type: 'string' },
                            { name: 'status_id', type: 'int' },
                        ],
                    },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: [
                    'no-pre-bookings-found',
                    'error-when-searching-for-pre-appointments-from-the-patient',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico"
        color="bg-success"
        details="searches-all-doctors-except-the-one-connected"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    {
                        name: 'documento',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'especialidade',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                        ],
                    },
                ],
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
        details="search-for-doctors-details"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    {
                        name: 'documento',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'pix',
                        type: 'array',
                        data_item: [
                            { name: 'chave', type: 'string' },
                            { name: 'tipo_chave', type: 'string' },
                        ],
                    },
                    { name: 'has_consulta', type: 'bool' },
                    { name: 'ultima_consulta_cadastrada', type: 'string' },
                    { name: 'proxima_consulta', type: 'string' },
                    {
                        name: 'clinica',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                            { name: 'uf', type: 'string' },
                            { name: 'estado', type: 'string' },
                        ],
                    },
                    {
                        name: 'pre_agendamentos_pendente',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'paciente_id', type: 'int' },
                            { name: 'medico_id', type: 'int' },
                            { name: 'risco_empresarial_id', type: 'int' },
                            { name: 'desconto_medico_id', type: 'int' },
                            { name: 'consulta_id', type: 'int' },
                            { name: 'qtd_parcelas', type: 'int' },
                            { name: 'paciente_nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'especialidades',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                            { name: 'valor_retorno', type: 'float | null' },
                            { name: 'dias_retorno', type: 'int | null' },
                            { name: 'clinica', type: 'bool' },
                        ],
                    },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: [
                    'no-doctor-found-with-id-provided',
                    'doctor-not-found',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/cpf/[cpf]"
        color="bg-success"
        details="search-medical-data-using-cpf"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    {
                        name: 'documento',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'pix',
                        type: 'array',
                        data_item: [
                            { name: 'chave', type: 'string' },
                            { name: 'tipo_chave', type: 'string' },
                        ],
                    },
                    { name: 'has_consulta', type: 'bool' },
                    { name: 'ultima_consulta_cadastrada', type: 'string' },
                    { name: 'proxima_consulta', type: 'string' },
                    {
                        name: 'clinica',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                            { name: 'uf', type: 'string' },
                            { name: 'estado', type: 'string' },
                        ],
                    },
                    {
                        name: 'pre_agendamentos_pendente',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'paciente_id', type: 'int' },
                            { name: 'medico_id', type: 'int' },
                            { name: 'risco_empresarial_id', type: 'int' },
                            { name: 'desconto_medico_id', type: 'int' },
                            { name: 'consulta_id', type: 'int' },
                            { name: 'qtd_parcelas', type: 'int' },
                            { name: 'paciente_nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'especialidades',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                            { name: 'valor_retorno', type: 'float | null' },
                            { name: 'dias_retorno', type: 'int | null' },
                            { name: 'clinica', type: 'bool' },
                        ],
                    },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: [
                    'no-doctor-found-with-cpf-provided',
                    'doctor-not-found',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/crm/[crm]"
        color="bg-success"
        details="search-medical-data-using-crm"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    {
                        name: 'documento',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'pix',
                        type: 'array',
                        data_item: [
                            { name: 'chave', type: 'string' },
                            { name: 'tipo_chave', type: 'string' },
                        ],
                    },
                    { name: 'has_consulta', type: 'bool' },
                    { name: 'ultima_consulta_cadastrada', type: 'string' },
                    { name: 'proxima_consulta', type: 'string' },
                    {
                        name: 'clinica',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                            { name: 'uf', type: 'string' },
                            { name: 'estado', type: 'string' },
                        ],
                    },
                    {
                        name: 'pre_agendamentos_pendente',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'paciente_id', type: 'int' },
                            { name: 'medico_id', type: 'int' },
                            { name: 'risco_empresarial_id', type: 'int' },
                            { name: 'desconto_medico_id', type: 'int' },
                            { name: 'consulta_id', type: 'int' },
                            { name: 'qtd_parcelas', type: 'int' },
                            { name: 'paciente_nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'especialidades',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                            { name: 'valor_retorno', type: 'float | null' },
                            { name: 'dias_retorno', type: 'int | null' },
                            { name: 'clinica', type: 'bool' },
                        ],
                    },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: [
                    'no-doctor-found-with-crm-provided',
                    'doctor-not-found',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/endereco/clinica/[latitude]/[longitude]"
        color="bg-success"
        details="search-doctor-data-by-clinic-address"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    {
                        name: 'documento',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'endereco',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'estado_id', type: 'int' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'int' },
                            { name: 'complemento', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                        ],
                    },
                    {
                        name: 'telefone',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pais_id', type: 'int' },
                            { name: 'telefone', type: 'string' },
                            { name: 'tipo', type: 'string' },
                        ],
                    },
                    {
                        name: 'pix',
                        type: 'array',
                        data_item: [
                            { name: 'chave', type: 'string' },
                            { name: 'tipo_chave', type: 'string' },
                        ],
                    },
                    { name: 'has_consulta', type: 'bool' },
                    { name: 'ultima_consulta_cadastrada', type: 'string' },
                    { name: 'proxima_consulta', type: 'string' },
                    {
                        name: 'clinica',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                            { name: 'cep', type: 'string' },
                            { name: 'rua', type: 'string' },
                            { name: 'numero', type: 'string' },
                            { name: 'bairro', type: 'string' },
                            { name: 'cidade', type: 'string' },
                            { name: 'uf', type: 'string' },
                            { name: 'estado', type: 'string' },
                        ],
                    },
                    {
                        name: 'pre_agendamentos_pendente',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'paciente_id', type: 'int' },
                            { name: 'medico_id', type: 'int' },
                            { name: 'risco_empresarial_id', type: 'int' },
                            { name: 'desconto_medico_id', type: 'int' },
                            { name: 'consulta_id', type: 'int' },
                            { name: 'qtd_parcelas', type: 'int' },
                            { name: 'paciente_nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'especialidades',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                            { name: 'valor_retorno', type: 'float | null' },
                            { name: 'dias_retorno', type: 'int | null' },
                            { name: 'clinica', type: 'bool' },
                        ],
                    },
                ],
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
        details="returns-the-doctors-active-specialties"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-active-specialties'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
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
        details="returns-all-doctors-clinics"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['clinic-details'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'especialidade_id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['no-clinic-linked-to-doctor'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/clinica/secretaria"
        color="bg-success"
        details="doctors-linked-to-a-secretary-return"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-secretaries'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['error-when-listing-secretaries'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="medico/clinica/secretaria/[secretariaId]"
        color="bg-success"
        details="return-doctors-with-ties-to-the-secretary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-secretaries'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
            {
                status: '400',
                messages: ['error-when-listing-secretaries'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/pagamento/tipo"
        color="bg-success"
        details="returns-the-doctors-payment-types"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['medical-payment-type'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="pre-agendamento/medico/[medicoId]"
        color="bg-success"
        details="returns-all-doctor-pre-appointments"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-pre-appointments-found'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'risco_empresarial_id', type: 'int' },
                    { name: 'desconto_medico_id', type: 'int' },
                    { name: 'consulta_id', type: 'int' },
                    { name: 'qtd_parcelas', type: 'int' },
                    { name: 'paciente_nome', type: 'string' },
                    { name: 'origem', type: 'int' },
                    { name: 'especialidade', type: 'string' },
                    { name: 'status_id', type: 'int' },
                    { name: 'status', type: 'string' },
                    {
                        name: 'pre_agendamento_horarios',
                        type: 'array',
                        data_item: [
                            { name: 'data', type: 'string' },
                            { name: 'hora', type: 'string' },
                            { name: 'status', type: 'string' },
                            { name: 'status_id', type: 'int' },
                            { name: 'timezone', type: 'string' },
                        ],
                    },
                    {
                        name: 'periodo_atendimento_paciente',
                        type: 'array',
                        data_item: [
                            { name: 'descricao', type: 'string' },
                            { name: ' pre_agendamento_id:', type: 'int' },
                        ],
                    },
                    { name: 'pode_criar_retorno', type: 'int' },
                    { name: 'data_limite_retorno', type: 'int' },
                    {
                        name: 'pre_agendamento_agenda',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'data', type: 'string' },
                            { name: 'hora', type: 'string' },
                            { name: 'status', type: 'string' },
                            { name: 'status_id', type: 'int' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: [
                    'no-pre-bookings-found',
                    'error-when-searching-for-pre-appointments-from-the-doctor',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="clinica/medico/[medicoId]"
        color="bg-success"
        details="returns-clinic-requests-pending-physician-approval"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['links-pending-approval'],
                data_return: [
                    { name: 'clinica_id', type: 'int' },
                    { name: 'medico_especialidade_id', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['no-links-pending-approval'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="consulta/medico/[medicoId]"
        color="bg-success"
        details="returns-the-doctors-available-opening-hours"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['available-doctor-hours'],
                data_return: [
                    { name: 'medico', type: 'string' },
                    {
                        name: 'horarios',
                        type: 'array',
                        data_item: [
                            { name: 'data', type: 'string' },
                            { name: 'timezone', type: 'string' },
                            {
                                name: 'horarios',
                                type: 'array',
                                data_sub_item: [
                                    { name: 'hora', type: 'string' },
                                    {
                                        name: 'agendamento',
                                        type: 'array | null',
                                        extra_sub_item: [
                                            {
                                                name: 'paciente_id',
                                                type: 'int',
                                            },
                                            {
                                                name: 'paciente_nome',
                                                type: 'string',
                                            },
                                            { name: 'agenda_id', type: 'int' },
                                            { name: 'status', type: 'string' },
                                            { name: 'status_id', type: 'int' },
                                            {
                                                name: 'pode_gerar_token',
                                                type: 'bool',
                                            },
                                            {
                                                name: 'token',
                                                type: 'string | null',
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['doctor-not-found', 'there-are-no-available-times'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="consulta/valor/[medicoId]/[especialidadeId]"
        color="bg-success"
        details="return-the-value-of-the-doctors-consultation"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['customer-consultation-value'],
                data_return: [
                    { name: 'valor', type: 'float' },
                    { name: 'maximo_parcelamento', type: 'int' },
                    {
                        name: 'parcelamento',
                        type: 'array',
                        data_item: [
                            { name: 'payment', type: 'string' },
                            { name: 'iof', type: 'string' },
                            { name: 'balance', type: 'string' },
                            { name: 'interest', type: 'string' },
                            { name: 'principal', type: 'string' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-calculating-query-value'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="secretaria/[cpf]"
        color="bg-success"
        details="returns-secretary-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['secretariat-data'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'secretaria_id', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['no-secretary-with-this-cpf-was-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="secretaria/medico/[secretariaId]"
        color="bg-success"
        details="returns-doctors-link-requests-to-the-secretary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['link-requests'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'secretaria_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: [
                    'user-cannot-see-secretary-requests',
                    'no-link-requests',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-pagamento"
        color="bg-success"
        details="returns-all-available-payment-types"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['payment-types'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/[medicoId]"
        color="bg-success"
        details="returns-the-doctors-financial-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['medical-receipt'],
                data_return: [
                    { name: 'pre_agendamento_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'recebimento_medico', type: 'int' },
                    { name: 'descricao', type: 'string' },
                    { name: 'created_at', type: 'string' },
                    { name: 'valor_desconto', type: 'float' },
                ],
            },
            {
                status: '400',
                messages: ['no-medical-receipt'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="financeiro/medico/[medicoId]/[dataInicial]/[dataFinal]"
        color="bg-success"
        details="returns-the-doctors-financial-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['medical-receipt'],
                data_return: [
                    { name: 'pre_agendamento_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'recebimento_medico', type: 'int' },
                    { name: 'descricao', type: 'string' },
                    { name: 'created_at', type: 'string' },
                    { name: 'valor_desconto', type: 'float' },
                ],
            },
            {
                status: '400',
                messages: ['no-medical-receipt'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="status/agenda"
        color="bg-success"
        details="returns-agenda-status"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['show-status'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['error-show-status'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="agenda/[pacienteId]"
        color="bg-success"
        details="returns-the-patients-schedules"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'agenda_categoria_id', type: 'int' },
                    { name: 'data', type: 'string' },
                    { name: 'hora', type: 'string' },
                    { name: 'medico', type: 'string' },
                    { name: 'especialidade', type: 'string' },
                    { name: 'nome', type: 'string' },
                    { name: 'cidade', type: 'string' },
                    { name: 'bairro', type: 'string' },
                    { name: 'cep', type: 'string' },
                    { name: 'rua', type: 'string' },
                    { name: 'numero', type: 'string' },
                    { name: 'complemento', type: 'string' },
                    { name: 'estado', type: 'string' },
                    { name: 'uf', type: 'string' },
                    { name: 'presenca', type: 'bool' },
                    { name: 'data_presenca', type: 'string | null' },
                    { name: 'token_agendamento', type: 'string | null' },
                    { name: 'token_agendamento_validado', type: 'int | null' },
                ],
            },
            {
                status: '400',
                messages: ['error-recovering-data'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="agendamento/medico/[medicoId]"
        color="bg-success"
        details="returns-doctors-appointments"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-appointments-found'],
                data_return: [
                    { name: 'agenda_id', type: 'int' },
                    { name: 'pre_agendamento_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'paciente', type: 'string' },
                    { name: 'agenda_categoria_id', type: 'int' },
                    { name: 'data', type: 'string' },
                    { name: 'hora', type: 'string' },
                    { name: 'medico_especialidade_id', type: 'int' },
                    { name: 'especialidade', type: 'string' },
                    { name: 'clinica', type: 'string' },
                    { name: 'cidade_clinica', type: 'string' },
                    { name: 'bairro_clinica', type: 'string' },
                    { name: 'cep_clinica', type: 'string' },
                    { name: 'rua_clinica', type: 'string' },
                    { name: 'numero_clinica', type: 'string' },
                    { name: 'complemento_clinica', type: 'string' },
                    { name: 'estado_clinica', type: 'string' },
                    { name: 'uf_clinica', type: 'string' },
                    { name: 'medico', type: 'string' },
                    {
                        name: 'retorno',
                        type: 'array',
                        data_item: [
                            { name: 'consulta_id', type: 'int' },
                            { name: 'retorno_id', type: 'int' },
                            { name: 'medico_especialidade_id', type: 'int' },
                            { name: 'valor', type: 'float' },
                            { name: 'dias_retorno', type: 'int' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: [
                    'error-when-searching-for-doctor-appointments',
                    'no-appointments-found',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="vencimentos-disponiveis"
        color="bg-success"
        details="returns-the-available-due-dates"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['available-salaries'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'dia', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['no-expiration-available'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="pre-agendamento/agenda/[agendaId]"
        color="bg-success"
        details="returns-the-pre-scheduling-of-the-agenda"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['pre-scheduling-found'],
                data_return: [
                    { name: 'pre_agendamento_id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'risco_empresarial', type: 'float' },
                    { name: 'desconto_medico', type: 'float' },
                    { name: 'valor_consulta', type: 'float' },
                    { name: 'qtd_parcelas', type: 'int' },
                    { name: 'valor_consulta_risco', type: 'float' },
                    { name: 'maximo_parcelamento', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['pre-scheduling-not-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="relatorio/risco-empresarial/[DataInicial]/[DataFinal]"
        color="bg-success"
        details="returns-data-from-the-enterprise-risk-report"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['business-risk-data'],
                data_return: [
                    { name: 'pre_agendamento', type: 'int' },
                    {
                        name: 'risco_empresarial',
                        type: 'array',
                        data_item: [
                            { name: 'porcentagem', type: 'string' },
                            { name: 'data', type: 'string' },
                        ],
                    },
                    { name: 'valor_consulta', type: 'string' },
                    {
                        name: 'medico',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'paciente',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'nome', type: 'string' },
                        ],
                    },
                    {
                        name: 'parcelas',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'valor', type: 'string' },
                            { name: 'vencimento', type: 'string' },
                            { name: 'parcela', type: 'int' },
                            { name: 'pagamento', type: 'bool' },
                            {
                                name: 'historico',
                                type: 'array',
                                data_sub_item: [
                                    { name: 'descricao', type: 'string' },
                                    { name: 'data', type: 'string' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['business-risk-data'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="especialidades/disponiveis"
        color="bg-success"
        details="returns-available-specialties"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['available-specialties'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="especialidades/medicos/[especialidadeId]"
        color="bg-success"
        details="specialty-doctors-return"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-specialties'],
                data_return: [
                    { name: 'medico_id', type: 'int' },
                    { name: 'nome_medico', type: 'string' },
                    { name: 'nome_clinica', type: 'string' },
                    { name: 'cep', type: 'string' },
                    { name: 'rua', type: 'string' },
                    { name: 'numero', type: 'string' },
                    { name: 'complemento', type: 'string' },
                    { name: 'bairro', type: 'string' },
                    { name: 'cidade', type: 'string' },
                    { name: 'estado', type: 'string' },
                    { name: 'distancia', type: 'string | null' },
                ],
            },
            {
                status: '400',
                messages: ['no-doctor-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="limite-confirmacao-agendamento"
        color="bg-success"
        details="returns-the-minimum-time-to-generate-the-token-for-service"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['minimum-time-for-scheduling-token-generation'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'tempo', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: [
                    'error-when-searching-for-minimum-time-for-token-generation',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/todas"
        color="bg-success"
        details="returns-all-calendar-categories"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['schedule-categories'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'medico_especialidade_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'especialidade', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['no-schedule-categories'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/medico/[medicoId]"
        color="bg-success"
        details="returns-all-doctors-schedule-categories"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['doctor-schedule-categories'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'especialidade', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['doctor-has-no-schedule-categories'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/especialidade/[especialidadeId]"
        color="bg-success"
        details="returns-all-specialty-agenda-categories"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['specialty-schedule-categories'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'especialidade', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['specialty-has-no-schedule-categories'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="categoria-agenda/medico/especialidade/[medicoId]/[especialidadeId]"
        color="bg-success"
        details="returns-all-categories-of-the-doctors-agenda-with-specialty-specialty"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['schedule-categories'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'especialidade', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['no-schedule-categories'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente/financeiro/[pacienteId]"
        color="bg-success"
        details="returns-the-patients-finances"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['patient-finances'],
                data_return: [
                    { name: 'mes_vencimento', type: 'int' },
                    { name: 'ano_vencimento', type: 'int' },
                    { name: 'valor_total', type: 'float' },
                    { name: 'qtd_parcelas', type: 'int' },
                    { name: 'mes_pago', type: 'bool' },
                    {
                        name: 'parcelas',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'pre_agendamento_id', type: 'int' },
                            { name: 'data_vencimento', type: 'string' },
                            { name: 'valor', type: 'float' },
                            { name: 'parcela', type: 'int' },
                            { name: 'vencido', type: 'bool' },
                            { name: 'total_parcelas', type: 'int' },
                            { name: 'especialidade', type: 'string | null' },
                            { name: 'pago', type: 'bool' },
                            {
                                name: 'galax',
                                type: 'array | null',
                                data_sub_item: [
                                    { name: 'id', type: 'int' },
                                    { name: 'financeiro_id', type: 'int' },
                                    { name: 'galax_my_id', type: 'int' },
                                    { name: 'galax_pay_id', type: 'int' },
                                    {
                                        name: 'galax_transactions_id',
                                        type: 'int',
                                    },
                                    { name: 'tipo', type: 'string' },
                                    {
                                        name: 'cobranca (boleto)',
                                        type: 'array',
                                        extra_sub_item: [
                                            { name: 'id', type: 'int' },
                                            {
                                                name: 'cobranca_id',
                                                type: 'int',
                                            },
                                            { name: 'boleto', type: 'string' },
                                            {
                                                name: 'linha_digitavel',
                                                type: 'string',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'cobranca (pix)',
                                        type: 'array',
                                        extra_sub_item: [
                                            { name: 'id', type: 'int' },
                                            {
                                                name: 'cobranca_id',
                                                type: 'int',
                                            },
                                            {
                                                name: 'copia_cola',
                                                type: 'string',
                                            },
                                        ],
                                    },
                                    {
                                        name: 'cobranca (cartão de crédito)',
                                        type: 'array',
                                        extra_sub_item: [
                                            { name: 'id', type: 'int' },
                                            {
                                                name: 'cobranca_id',
                                                type: 'int',
                                            },
                                            { name: 'numero', type: 'string' },
                                            {
                                                name: 'nome_titular',
                                                type: 'string',
                                            },
                                            {
                                                name: 'vencimento',
                                                type: 'string',
                                            },
                                            { name: 'cvv', type: 'string' },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching-for-patient-finances'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="historico-notificacao/[usuarioId]"
        color="bg-success"
        details="returns-the-users-notification-history"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['notification-history-found-successfully'],
                data_return: [
                    { name: 'descricao', type: 'string' },
                    { name: 'notificacao_id', type: 'int' },
                    { name: 'created_at', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: [
                    'notification-history-not-found',
                    'user-not-found',
                    'error-when-searching-notification-history',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="atendimento/medico/[medicoId]"
        color="bg-success"
        details="return-doctors-care"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['get-services'],
                data_return: [
                    { name: 'paciente_id', type: 'int' },
                    { name: 'paciente_nome', type: 'string' },
                    { name: 'agenda_id', type: 'int' },
                    { name: 'status', type: 'string' },
                    { name: 'observacao', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['error-get-services'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="atendimento/paciente/[pacienteId]"
        color="bg-success"
        details="returns-patient-care"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['get-services'],
                data_return: [
                    { name: 'medico_id', type: 'int' },
                    { name: 'medico_nome', type: 'string' },
                    { name: 'agenda_id', type: 'int' },
                    { name: 'status', type: 'string' },
                    { name: 'observacao', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['error-get-services'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="maximo-parcelamento"
        color="bg-success"
        details="returns-the-maximum-active-installment"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['maximu-installment-listed'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'maximo_parcelamento', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['error-when-listing-maximu-installment'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="risco-empresarial"
        color="bg-success"
        details="returns-active-enterprise-risk"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['business-risk-listed'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'valor', type: 'float' },
                    { name: 'ativo', type: 'int' },
                    { name: 'estado_id', type: 'int' },
                    { name: 'estado_nome', type: 'string' },
                    { name: 'uf', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['error-when-listing-business-risk'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="risco-empresarial/[estadoId]"
        color="bg-success"
        details="returns-the-states-active-business-risk"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['business-risk-listed'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'valor', type: 'float' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['error-when-listing-business-risk'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/secretaria/agendamento"
        color="bg-success"
        details="returns-available-deadlines-for-scheduling-the-secretary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['time-to-propose-scheduling-times'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria_secretaria_id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'tempo', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/secretaria/categoria/agendamento"
        color="bg-success"
        details="returns-categories-available-for-secretary-scheduling"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['categories-time-desk-scheduling'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'categoria', type: 'string' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="desconto/medico"
        color="bg-success"
        details="returns-the-registered-medical-discount"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['medical-discount-found'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'desconto', type: 'float' },
                ],
            },
            {
                status: '400',
                messages: [
                    'medical-discount-not-found',
                    'error-when-searching',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="permissao"
        color="bg-success"
        details="returns-all-active-permissions"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['permissions'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'descricao', type: 'string' },
                    { name: 'ativo', type: 'int' },
                    {
                        name: 'tipo_usuario',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'tipo_usuario_id', type: 'int' },
                            { name: 'permissao_id', type: 'int' },
                            { name: 'ativo', type: 'int' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="permissao/[permissaoId]"
        color="bg-success"
        details="returns-permission-data"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['permission'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'descricao', type: 'string' },
                    { name: 'ativo', type: 'int' },
                    {
                        name: 'tipo_usuario',
                        type: 'array | null',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'tipo_usuario_id', type: 'int' },
                            { name: 'permissao_id', type: 'int' },
                            { name: 'ativo', type: 'int' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="crm/[usuarioId]/[crm]/[uf]"
        color="bg-success"
        details="validate-crm-user"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['valid-crm'],
            },
            {
                status: '400',
                messages: [
                    'api-key-not-found',
                    'uf-not-registered',
                    'unable-to-verify-crm-validity',
                    'invalid-crm',
                    'crm-does-not-have-the-same-name-as-the-person-who-requested-it',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="paciente/dependente/[pacienteId]"
        color="bg-success"
        details="returns-the-patients-dependents"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['dependents-found'],
                data_return: [
                    { name: 'dependente_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'nome_social', type: 'string' },
                    { name: 'tipo_dependente', type: 'string' },
                    {
                        name: 'documentos',
                        type: 'array',
                        data_item: [
                            { name: 'numero', type: 'string' },
                            { name: 'tipo_documento', type: 'string' },
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: [
                    'dependents-not-found',
                    'error-in-searching-dependents',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="dispositivo/admin/token/[token]"
        color="bg-success"
        details="validates-existence-of-the-device-token"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['token-found'],
            },
            {
                status: '400',
                messages: ['token-not-found'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="limite-pre-agendamento"
        color="bg-success"
        details="returns-the-valid-pre-scheduling-limit"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['limit-pre-scheduling-found'],
                data_return: [
                    { name: 'tipo_limite_id', type: 'int' },
                    { name: 'tipo_limite', type: 'string' },
                    { name: 'valor', type: 'float' },
                    { name: 'created_at', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: [
                    'error-when-searching',
                    'limit-pre-scheduling-not-found',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-limite-pre-agendamento"
        color="bg-success"
        details="returns-valid-pre-scheduling-limit-types"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['limit-pre-scheduling-found'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                    { name: 'ativo', type: 'int' },
                ],
            },
            {
                status: '400',
                messages: [
                    'error-when-searching',
                    'limit-pre-scheduling-not-found',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="endereco/tipo"
        color="bg-success"
        details="returns-all-types-of-registered-addresses"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['address-types'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="telefone/tipo"
        color="bg-success"
        details="show-all-registered-phone-types"
        :autenticate="autenticate"
        :responses="[
            {
                status: '200',
                messages: ['phone-types'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div
        class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="POST"
        route="usuario/timezone"
        color="bg-primary"
        details="register-the-users-timezone"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'timezone_id',
                requests: ['exists-in-the-table-timezone', 'required'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['registered-timezone-for-user'],
            },
            {
                status: '400',
                messages: ['error-when-registering-timezone-for-user'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="foto/validar"
        color="bg-primary"
        details="validate-user-selfie-with-sent-document"
        :autenticate="autenticate"
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
        :responses="[
            {
                status: '201',
                messages: ['validated-document'],
            },
            {
                status: '400',
                messages: [
                    'problems-saving-image',
                    'the-front-document-sent-does-not-have-photos',
                    'the-selfie-does-not-match-the-photo-on-the-document',
                    'document-failed-validation-attempts',
                    'invalid-document',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente"
        color="bg-primary"
        details="register-a-new-patient"
        :autenticate="autenticate"
        :parameters="[
            { item: 'nome_social', requests: ['max-70-characters'] },
            { item: 'ocupacao', requests: ['required'] },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['patient-was-created-successfully'],
            },
            {
                status: '400',
                messages: [
                    'patient-already-registered',
                    'patient-cannot-be-created',
                    'error-when-registering-a-patient',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/telefone"
        color="bg-primary"
        details="patient-telephone-registration"
        :autenticate="autenticate"
        :parameters="[
            { item: 'pais', requests: ['int', 'exists-in-the-table-pais'] },
            {
                item: 'telefone',
                requests: ['required', 'string', 'max-15-characters'],
            },
            {
                item: 'tipo',
                requests: [
                    'required',
                    'int',
                    'exists-in-the-table-tipo-telefone',
                ],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['phone-registered-successfully'],
            },
            {
                status: '400',
                messages: ['error-when-registering-phone'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/telefone/principal"
        color="bg-primary"
        details="update-patients-primary-phone-number"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'telefone_id',
                requests: ['required', 'int', 'exists-in-the-table-telefone'],
            },
        ]"
        :responses="[
            {
                status: '200',
                messages: ['main-phone-updated-successfully'],
            },
            {
                status: '400',
                messages: ['patient-not-found', 'error-updating-main-phone'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/endereco"
        color="bg-primary"
        details="patient-address-registration"
        :autenticate="autenticate"
        :parameters="[
            { item: 'cep', requests: ['required', 'string'] },
            { item: 'rua', requests: ['required', 'string'] },
            { item: 'bairro', requests: ['required', 'string'] },
            { item: 'cidade', requests: ['required', 'string'] },
            {
                item: 'estado',
                requests: ['required', 'string', 'two-characters'],
            },
            {
                item: 'tipo',
                requests: ['int', 'exists-in-the-table-tipo-endereco'],
            },
            { item: 'numero', requests: ['int'] },
            { item: 'complemento', requests: ['string'] },
            {
                item: 'clinica_id',
                requests: ['int', 'exists-in-the-table-clinica'],
            },
            {
                item: 'timezone_id',
                requests: ['int', 'exists-in-the-table-timezone'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['address-registered-successfully'],
            },
            {
                status: '400',
                messages: [
                    'invalid-zip-code',
                    'registration-failure',
                    'error-registering-address',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/endereco/principal"
        color="bg-primary"
        details="update-patients-primary-address"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'endereco_id',
                requests: ['required', 'int', 'exists-in-the-table-endereco'],
            },
        ]"
        :responses="[
            {
                status: '200',
                messages: ['updated-main-address'],
            },
            {
                status: '400',
                messages: ['error-updating-address'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente/dependente"
        color="bg-primary"
        details="patient-dependent-registration"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'nome',
                requests: ['required', 'string', 'max-255-characters'],
            },
            { item: 'nome_social', requests: ['string', 'max-255-characters'] },
            {
                item: 'tipo_dependente',
                requests: ['required', 'exists-in-the-table-tipo-dependente'],
            },
            {
                item: 'documento',
                requests: ['required', 'string', 'max-255-characters'],
            },
            {
                item: 'tipo_documento',
                requests: ['required', 'exists-in-the-table-tipo-documento'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['registered-dependent'],
            },
            {
                status: '400',
                messages: [
                    'patient-not-found',
                    'error-in-dependent-document',
                    'error-in-dependent-registration',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico"
        color="bg-primary"
        details="new-doctor-registration"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'crm',
                requests: [
                    'required',
                    'between-3-and-6-characters',
                    'unique-in-app-documento-numero',
                ],
            },
            { item: 'uf', requests: ['required', 'two-characters'] },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['medico-was-created-successfully'],
            },
            {
                status: '400',
                messages: [
                    'document-type-does-not-exist',
                    'doctor-already-registered',
                    'doctor-cannot-be-created',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/telefone"
        color="bg-primary"
        details="doctors-telephone-number-registration"
        :autenticate="autenticate"
        :parameters="[
            { item: 'pais', requests: ['int', 'exists-in-the-table-pais'] },
            {
                item: 'telefone',
                requests: ['required', 'string', 'max-15-characters'],
            },
            {
                item: 'tipo',
                requests: [
                    'required',
                    'int',
                    'exists-in-the-table-tipo-telefone',
                ],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['phone-registered-successfully'],
            },
            {
                status: '400',
                messages: ['error-when-registering-phone'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/telefone/principal"
        color="bg-primary"
        details="update-doctor-main-phone"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'telefone_id',
                requests: ['required', 'int', 'exists-in-the-table-telefone'],
            },
        ]"
        :responses="[
            {
                status: '200',
                messages: ['main-phone-updated-successfully'],
            },
            {
                status: '400',
                messages: ['doctor-not-found', 'error-updating-main-phone'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="endereco/tipo"
        color="bg-primary"
        details="register-new-type-of-address"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'descricao',
                requests: ['required', 'string', 'max-255-characters'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['registered-address-type'],
            },
            {
                status: '400',
                messages: ['error-when-registering-address-type'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="telefone/tipo"
        color="bg-primary"
        details="register-new-phone-type"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'descricao',
                requests: ['required', 'string', 'max-255-characters'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['phone-type-successfully-registered'],
            },
            {
                status: '400',
                messages: ['error-when-registering-phone-type'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/especialidade"
        color="bg-primary"
        details="registration-of-a-doctor-with-a-specialty-and-the-cost-of-your-consultation"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'especialidades',
                requests: ['required', 'string', 'json-format'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['doctor-specialty-registered-successfully'],
            },
            {
                status: '400',
                messages: [
                    'the-specialties-field-must-be-an-array',
                    'the-doctor-already-has-two-active-specialties',
                    'the-doctor-can-only-have-up-to-two-active-specialties',
                    'error-when-registering-doctor-specialty',
                    'doctor-specialty-not-registered',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/endereco"
        color="bg-primary"
        details="register-the-doctors-address"
        :autenticate="autenticate"
        :parameters="[
            { item: 'cep', requests: ['required', 'string'] },
            { item: 'rua', requests: ['required', 'string'] },
            { item: 'bairro', requests: ['required', 'string'] },
            { item: 'cidade', requests: ['required', 'string'] },
            {
                item: 'estado',
                requests: ['required', 'string', 'two-characters'],
            },
            {
                item: 'tipo',
                requests: ['int', 'exists-in-the-table-tipo-endereco'],
            },
            { item: 'numero', requests: ['int'] },
            { item: 'complemento', requests: ['string'] },
            {
                item: 'clinica_id',
                requests: ['int', 'exists-in-the-table-clinica'],
            },
            {
                item: 'timezone_id',
                requests: ['int', 'exists-in-the-table-timezone'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['address-registered-successfully'],
            },
            {
                status: '400',
                messages: ['registration-failure', 'error-registering-address'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/endereco/principal"
        color="bg-primary"
        details="update-doctors-primary-address"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'endereco_id',
                requests: ['required', 'int', 'exists-in-the-table-endereco'],
            },
        ]"
        :responses="[
            {
                status: '200',
                messages: ['updated-main-doctor-address'],
            },
            {
                status: '400',
                messages: ['error-updating-address'],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/clinica"
        color="bg-primary"
        details="register-a-clinic"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'nome',
                requests: ['required', 'string', 'max-255-characters'],
            },
            {
                item: 'especialidade_id',
                requests: ['required', 'exists-in-the-table-especialidade'],
            },
            {
                item: 'cep',
                requests: ['required', 'string'],
            },
            {
                item: 'rua',
                requests: ['required', 'string'],
            },
            {
                item: 'bairro',
                requests: ['required', 'string'],
            },
            {
                item: 'cidade',
                requests: ['required', 'string'],
            },
            {
                item: 'estado',
                requests: ['required', 'string', 'two-characters'],
            },
            {
                item: 'tipo',
                requests: ['int', 'exists-in-the-table-tipo-endereco'],
            },
            {
                item: 'numero',
                requests: ['int'],
            },
            {
                item: 'complemento',
                requests: ['string'],
            },
            {
                item: 'timezone_id',
                requests: ['int', 'exists-in-the-table-timezone'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['clinic-successfully-registered'],
            },
            {
                status: '400',
                messages: [
                    'user-cannot-register-clinic',
                    'doctor-does-not-have-the-specified-specialty',
                    'doctor-already-has-link-with-another-clinic',
                    'error-when-registering-clinic',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/clinica/secretaria"
        color="bg-primary"
        details="register-a-new-secretary"
        :autenticate="autenticate"
        :parameters="[
            {
                item: 'nome',
                requests: ['required'],
            },
            {
                item: 'cpf',
                requests: ['required', 'max-14-characters'],
            },
            {
                item: 'email',
                requests: ['email'],
            },
            {
                item: 'password',
                requests: ['required', 'min-8-characters'],
            },
            {
                item: 'nome_mae',
                requests: ['required'],
            },
            {
                item: 'nascimento',
                requests: ['required', 'date-format-y-m-d'],
            },
            {
                item: 'nacionalidade_id',
                requests: ['required', 'exists-in-the-table-nacionalidade'],
            },
            {
                item: 'clinica_id',
                requests: ['int', 'exists-in-the-table-clinica'],
            },
            {
                item: 'medico_id',
                requests: ['int', 'exists-in-the-table-medico'],
            },
            {
                item: 'sexo',
                requests: ['required', 'one-character', 'M, F, X'],
            },
            {
                item: 'timezone',
                requests: ['string', 'exists-in-the-table-timezone'],
            },
        ]"
        :responses="[
            {
                status: '201',
                messages: ['registered-user'],
            },
            {
                status: '400',
                messages: [
                    'the-doctor-id-field-is-mandatory',
                    'invalid-cpf',
                    'user-already-registered',
                    'error-registering-user',
                ],
            },
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="desconto/medico"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico/aceitar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="clinica/medico/rejeitar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/cadastro"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/horarios/cadastro"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/horarios/recusar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="consulta/criar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico/ativar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="secretaria/medico/rejeitar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="financeiro/status"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="status/financeiro"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="tipo-pagamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="status/agenda"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda/status"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="token/agendamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="atendimento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="agenda/confirmar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="dispositivo"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="dispositivo/admin"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="sms/enviar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="firebase"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="galax/cobranca"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pix"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="logout"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="risco-empresarial"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="limite-confirmacao-agendamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="cadastro-categoria-agenda"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="comprovante-residencia/validar"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="maximo-parcelamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="foto/perfil"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="admin/secretaria/agendamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="pre-agendamento/retorno"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="permissao"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="usuario-permissao"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="limite-pre-agendamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="tipo-limite-pre-agendamento"
        color="bg-primary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div
        class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="PATCH"
        route="usuario"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="paciente/[usuarioId]"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="medico/[usuarioId]"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="token/agendamento/[token]"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="dispositivo/[dispositivoId]"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="PATCH"
        route="firebase/[usuarioFirebaseId]"
        color="bg-secondary"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div
        class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="DELETE"
        route="medico/especialidade/[especialidadeId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="medico/clinica/[clinicaId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="agenda/[agendaId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="cadastro-categoria-agenda/[categoriaAgendaId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="permissao/[permissaoId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="limite-pre-agendamento/[limiteId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="DELETE"
        route="tipo-limite-pre-agendamento/[tipoId]"
        color="bg-danger"
        :autenticate="autenticate"
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
</template>
