import { codeSearch } from '@/actions/actions';
import { useDispatch } from '@umijs/max';

const useDvaEffect = () => {
    const dispatch = useDispatch();

    return {
        codeSearch: (codeSearchQuery: CodeSearchQuery): Promise<Result> =>
            dispatch(codeSearch(codeSearchQuery)),
    };
};

export default useDvaEffect;
