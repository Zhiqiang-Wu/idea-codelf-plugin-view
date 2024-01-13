import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    dva: {},
    history: {
        type: 'hash',
    },
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
