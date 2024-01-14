import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    dva: {},
    history: {
        type: 'hash',
    },
    esbuildMinifyIIFE: true,
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: '首页',
            path: '/home',
            component: './home',
        },
    ],
    npmClient: 'pnpm',
});
