<script>
import { useRouter } from "vue-router";
import Response from "@/api/Response";

export default {
    props: ["verificacaoFinalizacao"],
    emits: ["prevTab"],
    data() {
        return {
            showModal: false,
        };
    },
    created() {
        this.router = useRouter();
    },
    methods: {
        aceitarPolitica() {
            if (
                !this.verificacaoFinalizacao.some(
                    (obj) => obj.Documents === "finalizado",
                )
            ) {
                this.$emit("prevTab");
                return Response.mensagemErro(
                    this.$t("please-complete-previous-step-proceed"),
                );
            }

            this.showModal = true;
        },
        redirectLogin() {
            this.showModal = false;
            this.router.push("/auth/login");
        },
    },
};
</script>

<template>
    <div class="p-10 panel h-full bg-gray-100 rounded-lg shadow-md">
        <div class="prose lg:prose-xl container mx-auto px-4 dark:text-white">
            <h1 class="text-3xl font-bold mb-2 dark:text-white">
                Nota sobre a Lei Geral de Proteção de Dados - LGPD
            </h1>
            <p class="text-sm text-gray-500 dark:text-white">
                Última atualização: 06 de outubro de 2022
            </p>
            <h2 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Política Privacidade
            </h2>
            <p>
                Esta política de privacidade descreve nossas políticas e
                procedimentos sobre a coleta, uso e divulgação de suas
                informações, conforme Lei nº 13.709, de 14 de agosto de 2018
                (Lei Geral de Proteção de Dados Pessoais). Ao usar o SauvviTech,
                você concorda com a coleta e uso de suas informações, de acordo
                com esta política de privacidade.
            </p>
            <p>
                A sua privacidade é importante para nós. É política do
                SauvviTech respeitar a sua privacidade em relação a qualquer
                informação que possamos coletar.
            </p>
            <p>
                Você é livre para recusar a nossa solicitação de informações
                pessoais e política de privacidade, entendendo que talvez não
                possamos fornecer os serviços desejados.
            </p>
            <p>
                O uso continuado de nosso aplicativo será considerado como
                aceitação de nossas práticas em torno de privacidade e
                informações pessoais. Se você tiver alguma dúvida sobre como
                lidamos com dados do usuário e informações pessoais, entre em
                contato conosco.
            </p>
            <h2 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Política a respeito dos seus dados pessoais e de uso
            </h2>
            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Dados pessoais
            </h3>
            <p>
                Ao usar nosso site, podemos solicitar que você nos forneça
                determinadas informações de identificação pessoal, que podem ser
                usadas para contatá-lo ou identificá-lo. As informações de
                identificação pessoal podem incluir, mas não se limitam a:
            </p>

            <p></p>
            <ul>
                <li>Endereço de e-mail</li>
                <li>Nome e sobrenome</li>
                <li>Número de telefone</li>
                <li>Endereço completo</li>
                <li>Data de nascimento</li>
                <li>CPF</li>
                <li>CNPJ, para cadastro de médicos</li>
                <li>Dados de uso</li>
            </ul>
            <p>
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento.
                Também informamos porque estamos coletando e como será usado.
            </p>
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis para evitar
                perdas e roubos, bem como acesso, divulgação, cópia, uso ou
                modificação não autorizados.
            </p>

            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Dados de uso
            </h3>
            <p>
                Os dados de uso são coletados automaticamente ao usar o
                SauvviTech. Quando você acessa nosso aplicativo por meio de um
                dispositivo móvel, podemos coletar determinadas informações
                automaticamente, incluindo, mas não se limitando:
            </p>
            <p></p>
            <ul>
                <li>Ao tipo de dispositivo móvel que você usa</li>
                <li>Ao seu sistema operacional</li>
                <li>A versão do seu sistema operacional</li>
            </ul>

            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Uso de seus dados pessoais
            </h3>
            <p>
                A empresa pode usar seus dados pessoais para os seguintes fins:
            </p>
            <ul>
                <li>
                    Para fornecer e manter nosso serviço, inclusive para
                    monitorar o uso do aplicativo.
                </li>
                <li>
                    Para gerenciar seu registro como usuário do SauvviTech. Os
                    dados pessoais que você fornece podem dar a você acesso a
                    diferentes funcionalidades no aplicativo.
                </li>
                <li>
                    Para entrar em contato com você por e-mail, telefone ou
                    outras formas equivalentes de comunicação eletrônica, como
                    notificações sobre atualizações, ou comunicações
                    informativas relacionadas às funcionalidades do aplicativo.
                </li>
            </ul>

            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Compartilhamento de dados
            </h3>
            <p>
                Podemos compartilhar seus dados com prestadores de serviços de
                saúde (médicos) para monitorar e analisar o uso do SauvviTech,
                ou para entrar em contato com você
            </p>

            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Retenção de seus dados pessoais
            </h3>
            <p>
                A empresa SauvviTech retém seus dados pessoais e de uso ​​para
                fortalecer a segurança, ou melhorar a funcionalidade do
                aplicativo. Ao deletar sua conta do SauvviTech, não teremos mais
                acesso a eles.
            </p>

            <h3 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Divulgação de seus dados pessoais
            </h3>
            <p>
                Sob certas circunstâncias, a empresa pode ser obrigada a
                divulgar seus dados pessoais, se exigido por lei ou em resposta
                a solicitações válidas de autoridades públicas (por exemplo, um
                tribunal ou agências governamentais).
            </p>

            <h3 class="text-xl font-bold mt-4 mb-2 dark:text-white">
                Segurança de seus dados pessoais
            </h3>
            <p>
                A segurança de seus dados pessoais é importante para nós, mas
                lembre-se de que nenhum método de transmissão pela Internet ou
                método de armazenamento eletrônico é 100% seguro. Embora nos
                esforcemos para usar meios comercialmente aceitáveis ​​para
                proteger seus dados pessoais, não podemos garantir sua segurança
                absoluta.
            </p>

            <h2 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Alterações a esta Política de Privacidade
            </h2>
            <p>
                Podemos atualizar nossa Política de Privacidade de tempos em
                tempos. Notificaremos você sobre quaisquer alterações,
                publicando a nova Política de Privacidade nesta página.
            </p>
            <p>
                Você é aconselhado a revisar esta Política de Privacidade
                periodicamente para quaisquer alterações. As alterações a esta
                Política de Privacidade são efetivas quando publicadas nesta
                página.
            </p>

            <h2 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Compromisso do Usuário
            </h2>
            <p>
                O usuário se compromete a fazer uso adequado dos conteúdos e das
                informações que o aplicativo SauvviTech oferece, mas não
                limitativo:
            </p>
            <ul class="list-disc ml-5">
                <li>
                    Não se envolver em atividades que sejam ilegais ou
                    contrárias à boa fé a à ordem pública;
                </li>
                <li>
                    Não difundir propaganda ou conteúdo de natureza racista,
                    xenofóbica, ou casas de apostas, jogos de sorte e azar,
                    qualquer tipo de pornografia ilegal, de apologia ao
                    terrorismo ou contra os direitos humanos;
                </li>
                <li>
                    Não causar danos aos sistemas físicos (hardwares) e lógicos
                    (softwares) do SauvviTech, de seus fornecedores ou
                    terceiros, para introduzir ou disseminar vírus informáticos
                    ou quaisquer outros sistemas de hardware ou software que
                    sejam capazes de causar danos anteriormente mencionados.
                </li>
            </ul>
            <h2 class="text-2xl font-bold mt-4 mb-2 dark:text-white">
                Mais informações
            </h2>
            <p>
                Esperemos que esteja esclarecido e, como mencionado
                anteriormente, se houver algo que você não tem certeza se
                precisa ou não, geralmente é mais seguro deixar os cookies
                ativados, caso interaja com um dos recursos que você usa em
                nosso site.
            </p>
            <p>Esta política é efetiva a partir de Jun 2022.</p>
        </div>

        <button
            class="w-full mx-auto px-4 py-2 rounded bg-green-600 text-white text-center hover:bg-green-700 focus:ring-green-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 mt-4"
            @click="aceitarPolitica">
            Aceitar Política
        </button>

        <div
            v-if="showModal"
            class="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true">
            <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"></div>
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <div
                    class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    class="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-title">
                                    Obrigado por realizar seu cadastro
                                </h3>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500">
                                        Aguarde a aprovação via email.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            @click="redirectLogin">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
