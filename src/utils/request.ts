import axios from 'axios';

axios.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        }
        return {
            code: 'B0001',
            success: false,
            message: '系统执行错误',
        };
    },
    () => {
        return {
            code: 'B0001',
            success: false,
            message: '系统执行错误',
        };
    },
);

export default axios;
