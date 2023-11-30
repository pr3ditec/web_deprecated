<script lang="ts" setup>
import { useAppStore } from "@/stores/index";
const store = useAppStore();
</script>

<template>
    <li class="menu nav-item">
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>
