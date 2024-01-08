<script>
import DocumentationCard from "@/components/layout/documentation/DocumentationCard.vue";

export default {
    props: {
        showDetailsRoute: Function,
        autenticate: {
            type: Boolean,
            default: false,
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
        route="timezone"
        color="bg-success"
        details="returns-all-recorded-timezones"
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
        :autenticate=autenticate
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
                ],
            },
            {
                status: '400',
                messages: [
                    'token-not-provided',
                    'invalid-token',
                    'token-successfully-verified',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/token/verificar"
        color="bg-success"
        details="validates-whether-the-given-token-exists-for-a-user-and-is-active"
        :autenticate=autenticate
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
                ],
            },
            {
                status: '400',
                messages: [
                    'token-not-provided',
                    'invalid-token',
                    'token-successfully-verified',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="tipo-pix"
        color="bg-success"
        details="return-all-types-of-registered-pix-for-payment-by-the-doctor"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['types-of-medical-payment-pix'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nome', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="periodo-atendimento"
        color="bg-success"
        details="returns-all-service-periods-registered-by-the-admin"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['list-of-service-periods'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'descricao', type: 'string' },
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="perguntas-investidor"
        color="bg-success"
        details="returns-all-questions-and-answers-to-the-investor"
        :autenticate=autenticate
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
                        ],
                    },
                ],
            },
            {
                status: '400',
                messages: ['error-when-searching'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="POST"
        route="usuario/cadastro"
        color="bg-primary"
        details="register-new-users"
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
            {
                item: 'tipo_usuario',
                requests: ['int', 'exists-in-the-table-tipo-usuario'],
            },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '201',
                messages: ['registered-user'],
                data_return: [
                    { name: 'id', type: 'int' },
                    { name: 'nacionalidade_id', type: 'int' },
                    { name: 'nome', type: 'string' },
                    { name: 'cpf', type: 'string' },
                    { name: 'sexo', type: 'char' },
                    { name: 'email', type: 'string' },
                    { name: 'nome_mae', type: 'string' },
                    { name: 'nascimento', type: 'string' },
                ],
            },
            {
                status: '400',
                messages: [
                    'error-registering-user',
                    'user-already-exist',
                    'invalid-cpf',
                    'email-already-exist',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="app/login"
        color="bg-primary"
        details="user-login-mobile"
        :parameters="[
            { item: 'login', requests: ['required', 'string'] },
            { item: 'password', requests: ['required', 'string'] },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '201',
                messages: ['login-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nome', type: 'string' },
                    { name: 'token', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'paciente_id', type: 'int' },
                    { name: 'timezone_id', type: 'int' },
                    { name: 'permissoes', type: 'array' },
                    { name: 'tipos_usuario', type: 'array' },
                ],
            },
            {
                status: '400',
                messages: [
                    'login-or-password-invalid',
                    'user-without-type',
                    'error-recording-app-login',
                    'error-when-logging-in',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="admin/login"
        color="bg-primary"
        details="user-login-web"
        :parameters="[
            { item: 'login', requests: ['required', 'string'] },
            { item: 'password', requests: ['required', 'string'] },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '201',
                messages: ['login-successfully'],
                data_return: [
                    { name: 'usuario_id', type: 'int' },
                    { name: 'cpf', type: 'string' },
                    { name: 'nome', type: 'string' },
                    { name: 'token', type: 'string' },
                    { name: 'medico_id', type: 'int' },
                    { name: 'secretaria_id', type: 'int' },
                    { name: 'desenvolvedor_id', type: 'int' },
                    { name: 'gestor_id', type: 'int' },
                    { name: 'timezone_id', type: 'int' },
                    { name: 'permissoes', type: 'array' },
                    { name: 'tipos_usuario', type: 'array' },
                ],
            },
            {
                status: '400',
                messages: [
                    'login-or-password-invalid',
                    'user-without-type',
                    'error-recording-app-login',
                    'error-when-logging-in',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="cpf"
        color="bg-primary"
        details="validate-whether-the-data-passed-is-from-a-cpf"
        :parameters="[
            { item: 'nome', requests: ['required', 'string'] },
            { item: 'cpf', requests: ['required', 'string'] },
            {
                item: 'data_nascimento',
                requests: ['required', 'date-format-d-m-y'],
            },
            { item: 'nome_mae', requests: ['required', 'string'] },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['valid-cpf'],
            },
            {
                status: '400',
                messages: ['invalid-key', 'invalid-data', 'invalid-cpf'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="galax/pagamento"
        color="bg-primary"
        details="make-payment-through-galax-return"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['payment-confirmed'],
            },
            {
                status: '400',
                messages: [
                    'payment-type-not-specified',
                    'error-recording-payment-type',
                    'error-saving-payment-details',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="celcoin/contrato-gravar"
        color="bg-primary"
        details="save-loan-contract"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['loan-agreement-recorded'],
            },
            {
                status: '400',
                messages: [
                    'error-recording-loan-agreement',
                    'loan-status-is-not-pending-signature',
                    'payload-not-informed',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="celcoin/financeiro-efetivar"
        color="bg-primary"
        details="make-financial"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['financial-successfully-effected'],
            },
            {
                status: '400',
                messages: [
                    'error-when-committing-finance',
                    'financial-not-found',
                    'payload-not-informed',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="recuperacao-senha"
        color="bg-primary"
        details="request-password-recovery"
        :parameters="[
            {
                item: 'email',
                requests: [
                    'required',
                    'email',
                    'exists-in-the-table-usuario-email',
                ],
            },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['email-sent'],
            },
            {
                status: '400',
                messages: [
                    'user-already-requested-password-recovery',
                    'user-not-found',
                    'error-recovering-password',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <DocumentationCard
        method="POST"
        route="site/cadastrar/contato"
        color="bg-primary"
        details="register-new-contact"
        :parameters="[
            {
                item: 'nome',
                requests: [
                    'required',
                    'string',
                ],
            },
            {
                item: 'email',
                requests: [
                    'required',
                    'email',
                ],
            },
            {
                item: 'assunto',
                requests: [
                    'required',
                    'string',
                ],
            },
            {
                item: 'mensagem',
                requests: [
                    'required',
                    'string',
                ],
            },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '201',
                messages: ['success-when-register'],
            },
            {
                status: '400',
                messages: [
                    'error-when-register',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <DocumentationCard
        method="POST"
        route="site/cadastrar/newsletter"
        color="bg-primary"
        details="register-new-newsletter"
        :parameters="[
            {
                item: 'email',
                requests: [
                    'required',
                    'email',
                ],
            },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '201',
                messages: ['success-when-register'],
            },
            {
                status: '400',
                messages: [
                    'email-already-registered',
                    'error-when-register',
                ],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b] divider-routes"></div>

    <DocumentationCard
        method="PATCH"
        route="recuperacao-senha/[token]"
        color="bg-secondary"
        details="change-user-password"
        :parameters="[
            {
                item: 'senha',
                requests: ['required', 'min-8-characters'],
            },
            {
                item: 'senha_confirmacao',
                requests: ['required', 'same-senha-field'],
            },
        ]"
        :autenticate=autenticate
        :responses="[
            {
                status: '200',
                messages: ['password-changed'],
            },
            {
                status: '400',
                messages: ['invalid-token', 'error-recovering-password'],
            },
        ]"
        :showDetailsRoute="showDetailsRoute" />
</template>
