<script>
import DocumentationCard from "@/components/layout/documentation/DocumentationCard.vue";

export default {
    props: {
        showDetailsRoute: Function
    },
    components: {
        DocumentationCard,
    },
};
</script>

<template>
    <DocumentationCard method="GET" route="timezone" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="timezone/cep/[cep]"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="unidades-federativas"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="cidade" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="cidade/[estadoId]"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="endereco/tipo" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="telefone/tipo" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="endereco/cep/[cep]"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="nacionalidade" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="especialidades" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="app/token/verificar"
        col
        or="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="admin/token/verificar"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="GET" route="tipo-pix" color="bg-success" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="GET"
        route="periodo-atendimento"
        color="bg-success" :showDetailsRoute="showDetailsRoute" />

    <div class="h-px border-b border-[#e0e6ed] dark:border-[#1b2e4b]"></div>

    <DocumentationCard
        method="POST"
        route="usuario/cadastro"
        color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="POST" route="app/login" color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="POST" route="admin/login" color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="POST" route="endereco/tipo" color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="POST" route="telefone/tipo" color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard method="POST" route="cpf" color="bg-primary" :showDetailsRoute="showDetailsRoute" />
    <DocumentationCard
        method="POST"
        route="galax/pagamento"
        color="bg-primary" :showDetailsRoute="showDetailsRoute" />
</template>
