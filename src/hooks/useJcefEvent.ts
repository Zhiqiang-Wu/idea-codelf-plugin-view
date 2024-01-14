import { useMemoizedFn, useMount, useUnmount } from 'ahooks';

const useJcefEvent = (event: string, callback: (arg: CustomEvent) => void) => {
    const listener = useMemoizedFn((event) => {
        callback(event);
    });

    useMount(() => {
        document.addEventListener('jcef:' + event, listener);
    });

    useUnmount(() => {
        document.removeEventListener('jcef:' + event, listener);
    });
};

export default useJcefEvent;
