<script lang="ts" setup>
import Response from "@/api/Response";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const cpf = ref("");

const excluirdados = () => {
    Response.mensagemToast("success", "Exclusão solicitada");
};
</script>
<template>
    <div
        class="flex flex-col w-1/2 items-center mt-6 text-center md:text-justify mx-auto">
        <div class="flex flex-col gap-1">
            <img
                src="/assets/images/logo.png"
                alt="image"
                class="h-full w-full object-cover" />
            <h1 class="text-2xl text-center font-bold mb-4">
                Sauvvi Tech Ltda.
            </h1>
        </div>
        <hr class="w-25" />
        <h3 class="font-bold text-2xl">
            Política de Exclusão de Dados da Sauvvi Tech
        </h3>
        <hr />
        <ul class="gap-5 mt-4">
            <li class="text-justify text-lg">
                Na Sauvvi Tech, reconhecemos a importância da proteção dos dados
                e estamos comprometidos em garantir a segurança e privacidade
                das informações que coletamos. Nossa política de exclusão de
                dados visa assegurar que dados pessoais e confidenciais sejam
                manuseados de maneira responsável e em conformidade com as
                regulamentações de privacidade aplicáveis. Abaixo, apresentamos
                os princípios fundamentais de nossa política de exclusão de
                dados:
            </li>
            <li class="text-justify mt-2 text-md">
                <b class="text-lg">Propósito Limitado:</b> Coletamos dados
                apenas para finalidades específicas e legítimas, e nos
                comprometemos a não utilizar as informações para além do escopo
                definido inicialmente.
            </li>
            <li class="text-justify mt-2 text-md">
                <b class="text-lg">Retenção Mínima:</b> Manteremos os dados pelo
                período estritamente necessário para cumprir com os objetivos
                para os quais foram coletados, a menos que haja uma obrigação
                legal ou regulatória para uma retenção mais longa.
            </li>
            <li class="text-justify text-md mt-2">
                <b class="text-lg">Transparência:</b> Comunicaremos de maneira
                clara e transparente sobre nossas práticas de coleta e exclusão
                de dados, garantindo que os indivíduos estejam cientes de como
                suas informações serão tratadas.
            </li>
            <li class="text-justify text-md mt-2">
                <b class="text--lg">Acesso e Controle:</b> Ofereceremos aos
                usuários a capacidade de acessar e controlar suas próprias
                informações, permitindo correções ou exclusões conforme
                necessário.
            </li>
            <li class="text-justify text-md mt-2">
                <b class="text--lg">Exclusão Segura:</b>Implementaremos medidas
                de segurança robustas para garantir a exclusão segura de dados,
                prevenindo acessos não autorizados e garantindo a
                irreversibilidade do processo de exclusão.
            </li>
            <li class="text-justify text-md mt-2">
                <b class="text--lg">Conformidade Legal:</b> Cumprir todas as
                leis e regulamentações de privacidade aplicáveis, garantindo que
                nossas práticas estejam em conformidade com os padrões
                estabelecidos.
            </li>
            <li class="text-justify text-md mt-2">
                <b class="text--lg">Revisão Regular:</b> Realizar revisões
                periódicas de nossa política de exclusão de dados para garantir
                que esteja alinhada com as melhores práticas do setor e com as
                mudanças nas leis de privacidade.
            </li>
            <li class="text-justify text-md mt-2">
                Ao adotar esses princípios, a Sauvvi Tech reafirma seu
                compromisso em proteger a privacidade dos dados dos usuários e
                em promover práticas de gestão de informações éticas e
                responsáveis. Estamos dedicados a manter a confiança depositada
                em nós pela comunidade e clientes, oferecendo uma abordagem
                transparente e diligente em relação à exclusão de dados.
            </li>
        </ul>
        <input
            v-mask="'###.###.###-##'"
            v-model="cpf"
            type="text"
            class="form-input mt-3"
            placeholder="Digite o seu cpf..." />

        <div class="flex flex-row gap-1 mt-4">
            <button
                class="btn btn-danger btn-md"
                @click="excluirdados()"
                :disabled="cpf.length < 14">
                Excluir
            </button>
            <button
                class="btn btn-info btn-md"
                @click="router.push('/auth/login')">
                Retornar
            </button>
        </div>
    </div>
</template>
