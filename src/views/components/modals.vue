<script lang="ts" setup>
import { ref } from "vue";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogOverlay,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from "@headlessui/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import highlight from "@/components/plugins/highlight.vue";
import codePreview from "@/composables/codePreview";
import { useAppStore } from "@/stores/index";
import { useMeta } from "@/composables/use-meta";
useMeta({ title: "Modals" });
const { codeArr, toggleCode } = codePreview();
const store = useAppStore();
const modal1 = ref(false);
const modal2 = ref(false);
const modal3 = ref(false);
const modal4 = ref(false);
const modal5 = ref(false);
const modal6 = ref(false);
const modal7 = ref(false);
const modal8 = ref(false);
const modal9 = ref(false);
const modal10 = ref(false);
const modal11 = ref(false);
const modal12 = ref(false);
const modal13 = ref(false);
const modal14 = ref(false);
const modal15 = ref(false);
const modal16 = ref(false);
const modal17 = ref(false);
const modal18 = ref(false);
const modal19 = ref(false);
const modal20 = ref(false);
const modal21 = ref(false);
const modal22 = ref(false);
</script>
<template></template>
