<script lang="ts">
export default {
    data() {
        return {};
    },
    methods: {},
    mounted() {},
};
</script>
<template>
    <div
        class="mb-4 flex items-center sm:flex-row flex-col sm:justify-between justify-center overflow-y-clip">
        <!-- LEGENDAS -->
        <div class="sm:mb-0 mb-4">
            <div
                class="flex items-center mt-2 flex-wrap sm:justify-start justify-center">
                <div class="flex items-center ltr:mr-4 rtl:ml-4">
                    <div
                        class="h-2.5 w-2.5 rounded-full ltr:mr-2 rtl:ml-2 bg-dark uppercase"></div>
                    <div class="uppercase">{{ $t('available') }}</div>
                </div>
                <div class="flex items-center ltr:mr-4 rtl:ml-4">
                    <div
                        class="h-2.5 w-2.5 rounded-full ltr:mr-2 rtl:ml-2 bg-success"></div>
                    <div class="uppercase">{{ $t('to_pacient') }}</div>
                </div>
                <div class="flex items-center ltr:mr-4 rtl:ml-4">
                    <div
                        class="h-2.5 w-4.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-gray-400"></div>
                    <div class="uppercase">{{ $t('treated')}}</div>
                </div>
                <div class="flex items-center">
                    <div
                        class="h-2.5 w-4.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-primary"></div>
                    <div class="uppercase">{{ $t('next_appointment')}}</div>
                </div>
                <div class="flex items-center ml-2">
                    <div
                        class="h-2.5 w-4.5 rounded-sm ltr:mr-2 rtl:ml-2 bg-warning"></div>
                    <div class="uppercase">{{ $t('return')}}</div>
                </div>
            </div>
        </div>
        <!-- LEGENDAS -->
    </div>
</template>
