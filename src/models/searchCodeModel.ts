import { codeSearch } from '@/services/searchCodeService';
import { Map } from 'immutable';

export default {
    namespace: 'searchCodeModel',
    state: Map({}),
    effects: {
        *codeSearch({ payload }, { call }) {
            return yield call(codeSearch, payload);
        },
    },
};
