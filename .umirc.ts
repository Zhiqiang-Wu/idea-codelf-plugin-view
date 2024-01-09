import { defineConfig } from '@umijs/max';

export default defineConfig({
    antd: {},
    dva: {},
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
