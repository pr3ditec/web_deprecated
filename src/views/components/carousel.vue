<script lang="ts" setup>
import { ref } from "vue";
import highlight from "@/components/plugins/highlight.vue";
import codePreview from "@/composables/codePreview";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useMeta } from "@/composables/use-meta";
import { useAppStore } from "@/stores/index";
const store = useAppStore();
useMeta({ title: "Carousel" });

const { codeArr, toggleCode } = codePreview();
const items = ref(["carousel1.jpeg", "carousel2.jpeg", "carousel3.jpeg"]);
</script>
<template></template>
