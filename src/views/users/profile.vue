<script>
import Api from "@/api/Api";
import FormatoData from "@/helpers/FormatoData";

export default {
    data() {
        return {
            request: new Api(),
            dadosUsuario: [],
            fotoUsuario: "",
        };
    },
    methods: {
        buscarDadosUsuario() {
            this.request
                .pegarDadosApi(`/usuario/${localStorage.getItem("user.id")}`)
                .then((res) => {
                    console.log(res.list);
                    this.dadosUsuario = res.list;
                });
        },

        atualizarDadosUsuario() {
            this.request("/", {}).then((res) => {
                res.status
                    ? Response.mensagemToast("success", res.message)
                    : Response.mensagemToast("error", res.message);
            });
        },
    },
    async created() {
        this.buscarDadosUsuario();
    },
};
</script>
<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
        <div class="panel col-span-4">
            <div class="flex items-center justify-between mb-5">
                <h5 class="font-semibold text-lg dark:text-white-light">
                    {{ $t("profile") }}
                </h5>
            </div>
            <div class="mb-5">
                <div class="flex flex-col justify-center items-center">
                    <img
                        :src="dadosUsuario.foto_perfil ?? '/assets//images/profile-34.jpeg'"
                        alt=""
                        class="w-24 h-24 rounded-full object-cover mb-5" />
                    <p class="font-semibold text-primary text-xl">
                        {{ dadosUsuario.nome }}
                    </p>
                </div>
                <ul
                    class="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 shrink-0">
                            <path
                                d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M7 4V2.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                            <path
                                opacity="0.5"
                                d="M17 4V2.5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                            <path
                                opacity="0.5"
                                d="M2 9H22"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>
                        {{ dadosUsuario.nascimento }}
                    </li>
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 shrink-0">
                            <path
                                opacity="0.5"
                                d="M4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C6.55332 19.8124 4 14.6055 4 10.1433Z"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <circle
                                cx="12"
                                cy="10"
                                r="3"
                                stroke="currentColor"
                                stroke-width="1.5" />
                        </svg>
                        {{ dadosUsuario.nacionalidade_id }}
                    </li>
                    <li>
                        <a href="javascript:;" class="flex items-center gap-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5 shrink-0">
                                <path
                                    opacity="0.5"
                                    d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                    stroke="currentColor"
                                    stroke-width="1.5" />
                                <path
                                    d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                            <span class="text-primary truncate">{{
                                dadosUsuario.email
                            }}</span></a
                        >
                    </li>
                    <li class="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5">
                            <path
                                d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561"
                                stroke="currentColor"
                                stroke-width="1.5" />
                            <path
                                opacity="0.5"
                                d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>
                        <span class="whitespace-nowrap" dir="ltr">{{
                            dadosUsuario.telefone_medico.length == 0
                                ? "vazio"
                                : dadosUsuario.telefone_medico
                        }}</span>
                    </li>
                </ul>
                <ul class="mt-7 flex items-center justify-center gap-2">
                    <li>
                        <a
                            class="btn btn-info flex items-center justify-center rounded-full w-10 h-10 p-0"
                            href="javascript:;">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="w-5 h-5">
                                <path
                                    d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            class="btn btn-danger flex items-center justify-center rounded-full w-10 h-10 p-0"
                            href="javascript:;">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5">
                                <path
                                    d="M3.33946 16.9997C6.10089 21.7826 12.2168 23.4214 16.9997 20.66C18.9493 19.5344 20.3765 17.8514 21.1962 15.9286C22.3875 13.1341 22.2958 9.83304 20.66 6.99972C19.0242 4.1664 16.2112 2.43642 13.1955 2.07088C11.1204 1.81935 8.94932 2.21386 6.99972 3.33946C2.21679 6.10089 0.578039 12.2168 3.33946 16.9997Z"
                                    stroke="currentColor"
                                    stroke-width="1.5" />
                                <path
                                    opacity="0.5"
                                    d="M16.9497 20.5732C16.9497 20.5732 16.0107 13.9821 14.0004 10.5001C11.99 7.01803 7.05018 3.42681 7.05018 3.42681M7.57711 20.8175C9.05874 16.3477 16.4525 11.3931 21.8635 12.5801M16.4139 3.20898C14.926 7.63004 7.67424 12.5123 2.28857 11.4516"
                                    stroke="currentColor"
                                    stroke-width="1.5"
                                    stroke-linecap="round" />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            class="btn btn-dark flex items-center justify-center rounded-full w-10 h-10 p-0"
                            href="javascript:;">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="w-5 h-5">
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- SEGUNDO PAINEL -->
        <div class="panel col-span-4 xl:col-span-4">
            <form
                class="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-[#0e1726]">
                <h6 class="text-lg font-bold mb-5">{{ $t("settings") }}</h6>
                <div class="flex flex-col sm:flex-row">
                    <div class="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                        <img
                            :src="
                                dadosUsuario.foto_perfil ??
                                '/assets//images/profile-34.jpeg'
                            "
                            alt=""
                            class="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                    </div>
                    <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="name">{{ $t("full-name") }}</label>
                            <input
                                id="name"
                                type="text"
                                :placeholder="dadosUsuario.nome"
                                class="form-input" />
                        </div>
                        <div>
                            <label for="profession">{{
                                $t("profession")
                            }}</label>
                            <input
                                id="profession"
                                type="text"
                                placeholder="Médico"
                                class="form-input" />
                        </div>
                        <div>
                            <label for="country">{{ $t("citizenship") }}</label>
                            <select
                                id="country"
                                class="form-select text-white-dark">
                                <option selected>{{ $t("brazilian") }}</option>
                                <option>{{ $t("foreign") }}</option>
                            </select>
                        </div>
                        <div>
                            <label for="address">{{ $t("address") }}</label>
                            <input
                                id="address"
                                type="text"
                                :placeholder="dadosUsuario.endereco_medico"
                                class="form-input" />
                        </div>
                        <div>
                            <label for="phone">{{ $t("phone") }}</label>
                            <input
                                id="phone"
                                type="text"
                                :placeholder="dadosUsuario.telefone_medico"
                                class="form-input" />
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                :placeholder="dadosUsuario.email"
                                class="form-input" />
                        </div>
                        <div class="sm:col-span-2 mt-3">
                            <button
                                type="button"
                                class="btn btn-primary capitalize"
                                @click="atualizarDadosUsuario()">
                                {{ $t("update") }}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
