<template>
    <div class="flex flex-col gap-2 mt-4 p-3">
        <p class="text-lg capitalize font-bold">{{ $t("help") }}</p>
        <p class="text-sm">
            <b class="capitalize">{{ $t('capabilities') }}: </b> {{ $t('capabilities-help-text') }}
        </p>
        <p class="text-small">
            <b class="capitalize">status: </b> {{ $t('status-help-text') }}
        </p>
        <p class="text-small">
            <b class="capitalize">{{ $t('time-help')}}: </b> {{ $t('time-help-text') }}
        </p>
        <p class="text-small">
            <b class="capitalize">{{ $t('value') }}: </b> {{ $t('value-help-text') }}
        </p>
    </div>
</template>
