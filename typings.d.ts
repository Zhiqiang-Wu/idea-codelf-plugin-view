import '@umijs/max/typings';

declare global {
    type Result = {
        readonly code: string;
        readonly success: boolean;
        readonly message?: string;
        readonly data?: any;
    };

    type CodeSearchQuery = {
        readonly q: string;
        readonly lan?: Array<number>;
    };
}
