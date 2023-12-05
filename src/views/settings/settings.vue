<script lang="ts">
import TableBusinesRisk from "./table-busines-risk.vue";
import TableRules from "./table-rules.vue";

export default {
    components: {
        TableRules,
        TableBusinesRisk,
    },
};
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 p-5">
                <!-- TABELA REGRAS -->
                <TableRules />
                <!-- TABELA REGRAS -->

                <!-- TABELA RISCO EMPRESARIAL -->
                <TableBusinesRisk />
                <!-- TABELA RISCO EMPRESARIAL -->
            </div>
        </div>
    </div>
</template>
