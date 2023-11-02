import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';

import HomeView from '../views/index.vue';

import TestView from '../views/test.vue';
import TablesView from '../views/tables.vue';
import AnalyticsView from '../views/analytics.vue';
import FinanceView from '../views/finance.vue';
import CryptoView from '../views/crypto.vue';

const routes: RouteRecordRaw[] = [
    // dashboard
    { path: '/', name: 'home', component: HomeView },
    { path: '/test', name: 'test', component: TestView },
    { path: '/analytics', name: 'analytics', component: AnalyticsView },
    { path: '/tables', name: 'tables', component: TablesView },
    { path: '/finance', name: 'finance', component: FinanceView },
    { path: '/crypto', name: 'crypto', component: CryptoView },

    // auth
    {
        path: '/auth/cover-login',
        name: 'cover-login',
        component: () => import(/* webpackChunkName: "auth-cover-login" */ '../views/auth/cover-login.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-register',
        name: 'cover-register',
        component: () => import(/* webpackChunkName: "auth-cover-register" */ '../views/auth/cover-register.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-lockscreen',
        name: 'cover-lockscreen',
        component: () => import(/* webpackChunkName: "auth-cover-lockscreen" */ '../views/auth/cover-lockscreen.vue'),
        meta: { layout: 'auth' },
    },
    {
        path: '/auth/cover-password-reset',
        name: 'cover-password-reset',
        component: () => import(/* webpackChunkName: "auth-cover-password-reset" */ '../views/auth/cover-password-reset.vue'),
        meta: { layout: 'auth' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
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

    if (to?.meta?.layout == 'auth') {
        store.setMainLayout('auth');
    } else {
        store.setMainLayout('app');
    }
    next(true);
});

router.afterEach((to, from, next) => {
    appSetting.changeAnimation();
});

export default router;
