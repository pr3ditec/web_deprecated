import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// import vueI18n from '@intlify/vite-plugin-vue-i18n';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/messages'

export default defineConfig({
    plugins: [
        vue(),
        VueI18nPlugin({
            include: [path.resolve(__dirname, './src/locales/**')],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['quill'],
    },
});
