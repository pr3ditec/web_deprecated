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
                    { name: 'id', type: 'integer' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'integer' },
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
        details="Retorna os dados do usuário"
        :responses="[
            {
                status: '200',
                messages: ['user-data'],
                data_return: [
                    { name: 'id', type: 'integer' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'integer' },
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
        details="Retorna o timezone do usuário"
        :responses="[
            {
                status: '200',
                messages: ['timezone-of-user'],
                data_return: [
                    { name: 'id', type: 'integer' },
                    { name: 'usuario_id', type: 'integer' },
                    { name: 'timezone_id', type: 'integer' },
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
                data_return: [
                    { name: 'id', type: 'integer' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nascimento', type: 'string (format Y-m-d)' },
                    { name: 'sexo', type: 'string' },
                    { name: 'email', type: 'string' },
                    { name: 'nacionalidade_id', type: 'integer' },
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
        details="Retorna os dados do paciente"
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
        details="Retorna os pre-agendamentos do paciente"
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
        details="Busca todos os médicos com exceção do que está conectado"
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
        details="Busca os dados do médico"
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
                        ]
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
                        ]
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
                        ]
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
                        ]
                    }
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
        details="Busca dados médico pelo CPF"
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
                        ]
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
                        ]
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
                        ]
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
                        ]
                    }
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
        details="Busca dados médico pelo CRM"
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
                        ]
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
                        ]
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
                        ]
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
                        ]
                    }
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
        details="Busca dados do médico pelo endereço da clínica"
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
                        ]
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
                        ]
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
                        ]
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
                        ]
                    }
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
        details="Retorna as especialidades ativas do médico"
        :responses="[
            {
                status: '200',
                messages: ['doctor-active-specialties'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' }
                ]
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
        details="Retorna todas as clínicas do médico"
        :responses="[
            {
                status: '200',
                messages: ['clinic-details'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'especialidade_id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ]
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
        details="Retorna os médicos com vínculo com secretária"
        :responses="[
            {
                status: '200',
                messages: ['doctor-secretaries'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                ]
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
        details="Retorna os médicos com vínculo com a secretária"
        :responses="[
            {
                status: '200',
                messages: ['doctor-secretaries'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                ]
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
        details="Retorna os tipos de pagamento do médico"
        :responses="[
            {
                status: '200',
                messages: ['medical-payment-type'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' }
                ]
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
                ]
            },
            {
                status: '400',
                messages: ['no-pre-bookings-found', 'error-when-searching-for-pre-appointments-from-the-doctor'],
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
        details="Retorna as solicitações de clínicas pendente de aprovação do médico"
        :responses="[
            {
                status: '200',
                messages: ['links-pending-approval'],
                data_return: [
                    { name: 'clinica_id', type: 'int' },
                    { name: 'medico_especialidade_id', type: 'int' },
                    { name: 'ativo', type: 'int' }
                ]
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
                                            { name: 'paciente_id', type: 'int' },
                                            { name: 'paciente_nome', type: 'string' },
                                            { name: 'agenda_id', type: 'int' },
                                            { name: 'status', type: 'string' },
                                            { name: 'status_id', type: 'int' },
                                            { name: 'pode_gerar_token', type: 'bool' },
                                            { name: 'token', type: 'string | null' },
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
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
        details="Retornar o valor da consulta do médico"
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
                        ]
                    }
                ]
            },
            {
                status: '400',
                messages: ['error-calculating-query-value']
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
        details="Retorna os dados da secretária"
        :responses="[
            {
                status: '200',
                messages: ['secretariat-data'],
                data_return: [
                    { name: 'nome', type: 'string' },
                    { name: 'usuario_id', type: 'int' },
                    { name: 'secretaria_id', type: 'int' },
                ]
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
        details="Retorna as solicitações de vínculo do médico com a secretária"
        :responses="[
            {
                status: '200',
                messages: ['link-requests'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'secretaria_id', type: 'int' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'ativo', type: 'int' },
                ]
            },
            {
                status: '400',
                messages: ['user-cannot-see-secretary-requests', 'no-link-requests'],
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
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
        :responses="[
            {
                status: '401',
                messages: ['without-authorization'],
            },
        ]"
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

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

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

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

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
