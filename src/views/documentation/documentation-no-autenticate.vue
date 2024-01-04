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
        route="timezone"
        color="bg-success"
        details="returns-all-recorded-timezones"
        :responses="[
            {
                status: '200',
                messages: ['timezones'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'timezone', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="timezone/cep/[cep]"
        color="bg-success"
        details="search-for-the-timezone-based-on-the-zip-code"
        :responses="[
            {
                status: '200',
                messages: ['timezone-found'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'timezone', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: ['timezone-not-found'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="unidades-federativas"
        color="bg-success"
        details="returns-all-registered-states"
        :responses="[
            {
                status: '200',
                messages: ['states'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'uf', type: 'string' },
                    { name: 'nome', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="cidade"
        color="bg-success"
        details="returns-all-registered-cities"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'estado_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'ibge', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="cidade/[estadoId]"
        color="bg-success"
        details="returns-all-cities-in-a-state"
        :responses="[
            {
                status: '200',
                messages: ['data-recovered-successfully'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'estado_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'ibge', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="endereco/cep/[cep]"
        color="bg-success"
        details="validate-that-the-past-zip-code-exists-and-return-the-zip-code-data"
        :responses="[
            {
                status: '200',
                messages: ['zip-code-found'],
                data_return: [
                    { name: 'cep', type: 'string' },
                    { name: 'logradouro', type: 'string' },
                    { name: 'complemento', type: 'string' },
                    { name: 'bairro', type: 'string' },
                    { name: 'localidade', type: 'string' },
                    { name: 'uf', type: 'string' },
                    { name: 'ibge', type: 'string' },
                    { name: 'gia', type: 'string' },
                    { name: 'ddd', type: 'string' },
                    { name: 'siafi', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: [
                    'zip-code-is-required',
                    'zip-code-cannot-be-found-by-api',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="nacionalidade"
        color="bg-success"
        details="return-all-registered-nationalities"
        :responses="[
            {
                status: '200',
                messages: ['nationalities'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="app/token/verificar"
        color="bg-success"
        details="validates-whether-the-given-token-exists-for-a-user-and-is-active"
        :responses="[
            {
                status: '200',
                messages: ['token-successfully-verified'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'token', type: 'string' },
                    { name: 'medico_id', type: 'int | null' },
                    { name: 'paciente_id', type: 'int | null' },
                    { name: 'secretaria_id', type: 'int | null' },
                    { name: 'timezone_id', type: 'int | null' },
                ]
            },
            {
                status: '400',
                messages: ['token-not-provided', 'invalid-token', 'token-successfully-verified']
            }
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/token/verificar"
        color="bg-success"
        details="validates-whether-the-given-token-exists-for-a-user-and-is-active"
        :responses="[
            {
                status: '200',
                messages: ['token-successfully-verified'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'token', type: 'string' },
                    { name: 'medico_id', type: 'int | null' },
                    { name: 'secretaria_id', type: 'int | null' },
                    { name: 'desenvolvedor_id', type: 'int | null' },
                    { name: 'gestor_id', type: 'int | null' },
                    { name: 'timezone_id', type: 'int | null' },
                ]
            },
            {
                status: '400',
                messages: ['token-not-provided', 'invalid-token', 'token-successfully-verified']
            }
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-pix"
        color="bg-success"
        details="return-all-types-of-registered-pix-for-payment-by-the-doctor"
        :responses="[
            {
                status: '200',
                messages: ['types-of-medical-payment-pix'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                ],
            }
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="periodo-atendimento"
        color="bg-success"
        details="returns-all-service-periods-registered-by-the-admin"
        :responses="[
            {
                status: '200',
                messages: ['list-of-service-periods'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            }
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="perguntas-investidor"
        color="bg-success"
        details="returns-all-questions-and-answers-to-the-investor"
        :responses="[
            {
                status: '200',
                messages: ['success-when-searching'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                    { name: 'message_code', type: 'string' },
                    { name: 'ativo', type: 'int' },
                    {
                        name: 'respostas',
                        type: 'array',
                        data_item: [
                            { name: 'id', type: 'int' },
                            { name: 'descricao', type: 'string' },
                            { name: 'message_code', type: 'string' },
                            { name: 'ativo', type: 'int' },
                        ]
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            }
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

    <DocumentationCard
        method="POST"
        route="usuario/cadastro"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="app/login"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="admin/login"
        color="bg-primary"
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
        route="cpf"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="galax/pagamento"
        color="bg-primary"
        :showDetailsRoute="showDetailsRoute" />
</template>
