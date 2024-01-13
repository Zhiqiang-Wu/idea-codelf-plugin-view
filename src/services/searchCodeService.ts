import request from '@/utils/request';

export const codeSearch = (
    codeSearchQuery: CodeSearchQuery,
): Promise<Result> => {
    let url = 'https://searchcode.com/api/codesearch_I/?q=' + codeSearchQuery.q;
    if (codeSearchQuery.lan && codeSearchQuery.lan.length) {
        const lanString = codeSearchQuery.lan
            .map((value) => {
                return `lan=${value}`;
            })
            .join('&');
        url = `${url}&${lanString}`;
    }
    return request.get(url).then((response) => ({
        code: '00000',
        success: true,
        data: response,
    }));
};
