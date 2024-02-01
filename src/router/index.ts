import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAppStore } from "@/stores/index";
import appSetting from "@/app-setting";

const routes: RouteRecordRaw[] = [
    /** LOGIN */
    {
        path: "/auth/login",
        name: "login",
        component: () => import("@views/auth/login.vue"),
        meta: { layout: "auth" },
    },
    /** LOGIN */

    /** DASHBOARD */
    {
        path: "/",
        name: "home",
        component: () => import("@views/index.vue"),
        meta: {
            search: "home;dashboard;casa,painel",
        },
    },
    /** DASHBOARD */

    /** SERVICOS */
    {
        path: "/service/new",
        name: "new-service",
        component: () => import("@views/service/ServiceNew.vue"),
        meta: {
            search: "new,new-service,service,novo,servico-novo,servico",
        },
    },
    {
        path: "/service/list",
        name: "list-service",
        component: () => import("@views/service/ServiceList.vue"),
        meta: {
            search: "list,list-service,service,listar,listar-servico,servico",
        },
    },
    {
        path: "/service/:id",
        name: "service-profile",
        component: () => null,
        meta: {
            search: "service,profile,servico,perfil",
        },
    },
    /** SERVICOS */

    /** APARELHO */
    {
        path: "/equipment/new",
        name: "new-equipment",
        component: () => import("@/views/equipment/EquipmentNew.vue"),
        meta: {
            search: "new,new-equipment,equipment,novo,novo-aparelho,aparelho",
        },
    },
    {
        path: "/equipment/list",
        name: "list-equipment",
        component: () => import("@/views/equipment/EquipmentList.vue"),
        meta: {
            search: "list,list-equipment,equipment,listar,listar-aparelho,aparelho",
        },
    },
    {
        path: "/equipment/:id",
        name: "equipment-profile",
        component: () => import("@/views/equipment/EquipmentProfile.vue"),
        meta: {
            search: "equipment,profile,aparelho,perfil",
        },
    },
    /** APARELHO */

    /** TIPO SERVICO */
    {
        path: "/type/new",
        name: "new-type-service",
        component: () => import("@/views/serviceType/ServiceTypeNew.vue"),
        meta: {
            search: "new,new service type,new type service,novo,novo tipo servico,tipo servico",
        },
    },
    {
        path: "/type/list",
        name: "list-type-service",
        component: () => import("@/views/serviceType/ServiceTypeList.vue"),
        meta: {
            search: "list,list-type,list-type-service,list-service-type,type-service,listar,listar-tipo-servico,tipo-servico",
        },
    },
    // {
    //     path: "/type/:id",
    //     name: "service-type-profile",
    //     component: () => import("@/views/serviceType/serviceTypeProfile.vue"),
    //     meta: {
    //         search: "service type,profile,tipo servico,perfil",
    //     },
    // },
    /** TIPO SERVICO */

    /** CLIENTE */
    {
        path: "/client/new",
        name: "new-client",
        component: () => import("@/views/client/ClientNew.vue"),
        meta: {
            search: "new,new client,new client,novo,novo cliente,cliente",
        },
    },
    {
        path: "/client/list",
        name: "list-client",
        component: () => import("@/views/client/ClientList.vue"),
        meta: {
            search: "list,list client,client,listar,listar-cliente,cliente",
        },
    },
    {
        path: "/client/:id",
        name: "client-profile",
        component: () => import("@/views/client/ClientProfile.vue"),
        meta: {
            search: "service type,profile,tipo servico,perfil",
        },
    },
    /** CLIENTE */

    /** PAGINAS NAO ECONTRADAS */
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@views/error/error404.vue"),
        meta: { layout: "auth" },
    },
    /** PAGINAS NAO ECONTRADAS */
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: "active",
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { left: 0, top: 0 };
        }
    },
});

router.beforeEach((to, from, next) => {
    const store = useAppStore();

    if (to?.meta?.layout == "auth") {
        store.setMainLayout("auth");
    } else {
        store.setMainLayout("app");
    }

    next(true);
    if (!store.getUserToken) {
        if (to.path === "/auth/login" || to.path === "/auth/register") {
            next(true);
        }
        next({ path: "/auth/login" });
    } else {
        next(true);
    }
});

router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
