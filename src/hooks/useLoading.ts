import { useSelector } from '@umijs/max';
import { useCreation } from 'ahooks';
import { createSelector } from 'reselect';

const useLoading = (actions: Array<string>) => {
    const selectors = useCreation(() => {
        return actions.map((value) => {
            return (state) => state.loading.effects[value];
        });
    }, [actions]);

    const { loading } = useSelector((state) => ({
        loading: createSelector(selectors, (...parameter) => {
            const index = parameter.findIndex((value) => !!value);
            return index >= 0;
        })(state),
    }));

    return loading;
};

export default useLoading;
