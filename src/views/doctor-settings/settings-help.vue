<template>
    <div class="flex flex-col gap-2 mt-4 p-3">
        <p class="text-lg capitalize font-bold">{{ $t("help") }}</p>
        <p class="text-sm">
            <b class="capitalize">especialidade: </b> O nome da especialidade
            que está vinculada com o médico
        </p>
        <p class="text-small">
            <b class="capitalize">status: </b> Status atual da regra vinculada
            com a especialidade
        </p>
        <p class="text-small">
            <b class="capitalize">tempo: </b> O tempo escolhido para que uma
            consulta seja considerada um retorno
        </p>
        <p class="text-small">
            <b class="capitalize">valor: </b> Valor cobrado para consultas
            marcadas como retorno
        </p>
    </div>
</template>
