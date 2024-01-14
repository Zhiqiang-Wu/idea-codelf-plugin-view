import { CODE_SEARCH } from '@/actions/actionTypes';
import useDvaEffect from '@/hooks/useDvaEffect';
import useJcefEvent from '@/hooks/useJcefEvent';
import useLoading from '@/hooks/useLoading';
import HomeView from '@/pages/home/view';
import { useSafeState } from 'ahooks';

const HomePage = () => {
    const { codeSearch } = useDvaEffect();

    const [tags, setTags] = useSafeState<Array<any>>([]);

    const loading = useLoading([CODE_SEARCH]);

    useJcefEvent('search', (event) => {
        const q = event.detail.q;
        const lan = event.detail.lan;

        codeSearch({ q, lan }).then((result) => {
            if (!result.success) {
                return;
            }

            const results: Array<any> = result.data.results;

            const tags: Array<any> = [];

            // 去重
            const nameSet: Set<string> = new Set();

            for (const item of results) {
                item.repo = item.repo.replace(
                    'git://github.com',
                    'https://github.com',
                );

                const line: Array<string> = Object.values(item.lines);

                const lineStr = line
                    .filter((value) => {
                        return !(
                            value.length > 256 && value.includes(';base64,')
                        );
                    })
                    .join('')
                    .replace(/[\r\n]+/g, ' ');

                const reg = RegExp(
                    '([\\-_\\w\\d\\/\\$]{0,}){0,1}' +
                        q +
                        '([\\-_\\w\\d\\$]{0,}){0,1}',
                    'gi',
                );

                const regExpMatchArray = lineStr.match(reg) || [];

                regExpMatchArray
                    .map((value: string) => {
                        return value
                            .replace(/^([-/])*/, '')
                            .replace(/([-/])*$/, '');
                    })
                    .filter((value) => {
                        return !(value.length > 63 || value.includes('/'));
                    })
                    .filter((value) => {
                        const lowerCase = value.toLowerCase();
                        if (nameSet.has(lowerCase)) {
                            return false;
                        }
                        nameSet.add(lowerCase);
                        return true;
                    })
                    .forEach((value) => {
                        tags.push({
                            value,
                            repo: item.repo,
                            language: item.language,
                        });
                    });
            }
            setTags(tags);
        });
    });

    return <HomeView tags={tags} spinning={loading} />;
};

export default HomePage;
