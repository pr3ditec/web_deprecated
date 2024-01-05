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
        details="returns-data-for-all-users"
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

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="POST"
        route="usuario/timezone"
        color="bg-primary"
        details="register-the-users-timezone"
        :parameters="[
            {
                item: 'timezone_id',
                requests: ['exists-in-the-table-timezone', 'required'],
            },
        ]"
        :responses="[
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
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="paciente"
        color="bg-primary"
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="telefone/tipo"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/telefone/principal"
        color="bg-primary"
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="medico/consulta"
        color="bg-primary"
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="PATCH"
        route="usuario"
        color="bg-secondary"
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
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="DELETE"
        route="medico/especialidade/[especialidadeId]"
        color="bg-danger"
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
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
</template>
